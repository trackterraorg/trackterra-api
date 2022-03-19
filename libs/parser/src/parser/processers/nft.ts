import _ = require('lodash');
import { IAmount, IParsedTx, IParser, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { TransferEngine } from './transfer';
import { Base64 } from 'js-base64';
import { parseNftAmount } from '@trackterra/parser/utils';

export class PurchaseNFT implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const { walletAddress, contractActions, txType } = args;

    return contractActions?.execute_orders.map((order): IParsedTx => {
      const parsedOrder = JSON.parse(
        Base64.decode(order.order as unknown as string),
      )?.order;

      const makerAsset = parsedOrder.maker_asset;
      const takerAsset = parsedOrder.taker_asset;

      const receivedValue = parseNftAmount(makerAsset);
      const sentValue = parseNftAmount(takerAsset);

      return {
        walletAddress,
        contract: order.contract as unknown as string,
        label: TxLabel.Swap,
        tag: txType.tag,
        sender: walletAddress,
        sentAmount: sentValue.amount,
        sentToken: sentValue.token,
        receivedAmount: receivedValue.amount,
        receivedToken: receivedValue.token,
        friendlyDescription: txType.description,
      };
    });
  }
}

export class TransferNFT implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const { walletAddress, txType, contractActions } = args;

    const key = _(['transfer_nft', 'send_nft'])
      .intersection(Object.keys(contractActions))
      .first();

    const transferActions = contractActions[key].map((cA: any) => {
      const amount: IAmount = {
        amount: '1',
        token: cA.contract,
      };

      cA.amount = amount;
      return cA;
    });

    return new TransferEngine().process({
      ...args,
      contractActions: undefined,
      transferActions,
    });
  }
}

export class RandomEarthDeposit implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const { walletAddress, contractActions, transferActions, allEvents } = args;

    const depositTx = new TransferEngine().process({
      ...args,
      contractActions: undefined,
      transferActions: transferActions,
    });

    const purchaseContractActions = allEvents.find((cA: any) => {
      return Object.keys(cA.contractActions).includes('execute_orders');
    })?.contractActions;

    let purchaseTx = [];
    if (purchaseContractActions) {
      purchaseTx = new PurchaseNFT().process({
        ...args,
        contractActions: purchaseContractActions,
        transferActions: undefined,
        txType: {
          ...args.txType,
          description: 'Random earth purchase',
          tag: TxTag.Swap,
        },
      });

      const depositAmount: number = _.first(depositTx)
        .sentAmount as unknown as number;
      _.first(depositTx).sentAmount = `${
        depositAmount - _.first(purchaseTx).sentAmount
      }`;
    }

    return depositTx.concat(purchaseTx);
    // console.dir({
    //   'hererr': 'herrrrrrrrrrrrrrrr'
    // }, {depth: 'null'});
    // const { walletAddress, txType, contractActions } = args;

    // const key = _(['transfer_nft', 'send_nft']).intersection(Object.keys(contractActions)).first();

    // const transferActions = contractActions[key].map((cA: any) => {
    //   const amount: IAmount = {
    //     amount: '1',
    //     token: cA.contract,
    //   }

    //   cA.amount = amount;
    //   return cA;
    // });

    // return (new TransferEngine()).process({
    //   ...args,
    //   contractActions: undefined,
    //   transferActions,
    // });
  }
}

export const NFTParsers = {
  PurchaseNFT,
  TransferNFT,
  RandomEarthDeposit,
};
