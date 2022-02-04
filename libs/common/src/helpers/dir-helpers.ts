import { join } from 'path';
import * as path from 'path';

export const storageDir = () => {
  return join(process.cwd(), 'storage');
};

export const walletsDir = () => {
  return path.resolve(storageDir(), 'wallets');
};

export const contractsDir = () => {
  return path.resolve(storageDir(), 'contracts');
};
