import { ProtocolLoader } from './protocol.loader';

describe('The loader should ', () => {
  let protocolLoader: ProtocolLoader;

  beforeAll(async () => {
    protocolLoader = await ProtocolLoader.getInstance();
  });

  it('load and validate protocols from yaml', () => {
    const protocols = protocolLoader.protocols;

    expect(protocols.length).toBeGreaterThan(0);
  });
});
