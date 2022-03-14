import { BlacklistLoader } from './blacklist.loader';

describe('The blacklist loader should ', () => {
  let blacklistLoader: BlacklistLoader;

  beforeAll(async () => {
    blacklistLoader = await BlacklistLoader.getInstance();
  });

  it('load and validate protocols from yaml', () => {
    const blacklist = blacklistLoader.blackList;
    expect(blacklist.length).toBeGreaterThan(0);
  });

  it('determine blacklisted address', () => {
    const existInblacklist = blacklistLoader.isInBlackList('terra100yeqvww74h4yaejj6h733thgcafdaukjtw397');
    expect(existInblacklist).toBeTruthy();
  });
});
