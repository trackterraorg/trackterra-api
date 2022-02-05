import {
  Protocol,
  ProtocolType,
  TxClassifier,
  TxType,
} from '../loader/protocol.interface';
import { ProtocolLoader } from '../loader/protocol.loader';
import * as _ from 'lodash';
import { TransferAction, TransformedData } from '../transformers';

export class Classifier {
  static async classify(
    transformedData: TransformedData,
  ): Promise<TxType | undefined> {
    const protocolLoader = await ProtocolLoader.getInstance();

    const protocols: Protocol[] | undefined = protocolLoader?.protocols.filter(
      (p) => p.type == transformedData.type,
    );

    const transformedDataTxType = transformedData.type;

    if (transformedDataTxType === ProtocolType.Contract) {
      const actions: any = transformedData.contractActions;
      const actionKeys = Object.keys(actions);
      const contracts = _(actions)
        .values()
        .flatten()
        .map((item) => item.contract)
        .uniq()
        .value();

      for (const protocol of protocols) {
        const txType: TxType | undefined = protocol.transactions.find(
          (txType: TxType) => {
            return this.classifyUsingContractActions(
              txType.classifier,
              txType.contract,
              actions,
              actionKeys,
              contracts,
            );
          },
        );

        if (txType) {
          console.log(actions);
          console.log(txType);
          return txType;
        }
      }
    }

    if (transformedDataTxType === ProtocolType.Native) {
      return this.nativeTxType(protocols, transformedData.transferActions);
    }

    if (transformedDataTxType === ProtocolType.Fail) {
      return protocols[0].transactions[0];
    }

    return;
  }

  private static classifyUsingContractActions(
    classifier: TxClassifier,
    contractAddress: string | string[],
    actions: any,
    actionKeys: string[],
    contracts: string[],
  ): boolean {
    for (const k of classifier.shouldExistAttributes) {
      if (!actionKeys.includes(k)) {
        return false;
      }
    }

    for (const k of classifier.shouldNotExistAttributes) {
      if (actionKeys.includes(k)) {
        return false;
      }
    }

    if (classifier.skipForContracts) {
      const overlap = _.intersection(
        contracts,
        classifier.skipForContracts,
      ).length;
      if (overlap) {
        return false;
      }
    }

    if (classifier.ignoreContract) {
      return true;
    }

    const { mainKey, contractKey } = classifier.contractAddressExtractKeys;
    const mainKeyActions = actions[mainKey];

    if (mainKeyActions === undefined) {
      return false;
    }

    // support for single contract address or multiple
    const allowedContracts = _.isArray(contractAddress)
      ? contractAddress
      : [contractAddress];

    const contractMatch = mainKeyActions.find((action: any) => {
      return allowedContracts.includes(action[contractKey]);
    });

    return contractMatch !== undefined;
  }

  private static nativeTxType(
    protocols: Protocol[],
    transferActions: TransferAction[],
  ): TxType {
    const nativeProtocol = _.first(protocols);
    const transferAction = _.first(transferActions);

    // default native tx type
    let txTypeName = 'NativeSendReceive';

    // the info is retrieved from extraParsingInfo when transforming the event
    const otherNativeTxsName = _.first(transferActions)?.extraParsingInfo;

    if (otherNativeTxsName) {
      txTypeName = otherNativeTxsName;
    }

    return nativeProtocol.transactions.find((tx: TxType) => {
      return tx.name === txTypeName;
    });
  }
}
