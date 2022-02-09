const baseUrl = process.cwd() + '/dist/libs/proto-schema/';

export const SERVICE_LIST = {
  wallet: {
    package: 'io.trackterra.srv.wallet',
    consulName: 'io.trackterra.srv.wallet',
    service: 'WalletService',
    protoPath: baseUrl + 'proto/wallet.proto',
  },
  contract: {
    package: 'io.trackterra.srv.contract',
    consulName: 'io.trackterra.srv.contract',
    service: 'ContractService',
    protoPath: baseUrl + 'proto/contract.proto',
  },
  parser: {
    package: 'io.trackterra.srv.parser',
    consulName: 'io.trackterra.srv.parser',
    service: 'ParserService',
    protoPath: baseUrl + 'proto/parser.proto',
  },
  gateway: {
    consulName: 'io.trackterra.api.gateway',
  },
};
