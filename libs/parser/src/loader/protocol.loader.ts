import { ValidationError } from 'joi';
import { Protocol, ProtocolType } from './protocol.interface';
import { protocolSchema } from './protocol.scheme';
import * as _ from 'lodash';
import { ProtocolsNotLoadedException } from '../exceptions';
export class ProtocolLoader {
  private static instance: ProtocolLoader;
  private _protocols: Protocol[] = [];
  private _errors: any = [];

  public static async getInstance(): Promise<ProtocolLoader> {
    if (!ProtocolLoader.instance) {
      const instance = new ProtocolLoader();
      await instance.loadProtocols();
      await instance.validateProtocols();
      return instance;
    }

    return ProtocolLoader.instance;
  }

  private async loadProtocols() {
    const yaml = await import('js-yaml');
    const fs = await import('fs');
    try {
      const allProtocolYamlFiles = await this.getAllProtocolFiles();
      allProtocolYamlFiles?.forEach((file) => {
        const lProtocol = yaml.load(fs.readFileSync(file, 'utf8'));
        const protocol: Protocol = lProtocol as Protocol;
        this._protocols.push(protocol);
      });
    } catch (e) {
      console.log(e);
    }

    // Protocol priority
    this._protocols = _.sortBy(this._protocols, 'priority');
  }

  private async validateProtocols(): Promise<ProtocolLoader> {
    this._errors = [];

    if (this._protocols.length === 0) {
      throw new ProtocolsNotLoadedException();
    }

    this._protocols.forEach(async (protocol: Protocol) => {
      try {
        await protocolSchema.validateAsync(protocol, {
          abortEarly: false,
        });
      } catch (error: unknown) {
        const { details, _original } = error as ValidationError;
        const message = details.map((i: any) => i.message);
        this._errors.push(message);
        console.error({
          Protocol: _original.name,
          message,
        });
      }
    });
    return this;
  }

  get protocols() {
    return this._protocols;
  }

  protocolsAreValid(): boolean {
    return this._protocols.length > 0 && this._errors.length === 0;
  }

  private async getAllProtocolFiles(): Promise<string[] | undefined> {
    try {
      const files = await this.getYamlFilesFromDirectory();

      return files;
    } catch (error) {
      console.log(error);
    }
  }

  private async getYamlFilesFromDirectory(): Promise<string[] | undefined> {
    const path = await import('path');
    const fs = await import('fs');

    const directoryPath = path.resolve('./libs/parser/src/yml/protocols');

    try {
      const files = await fs.readdirSync(directoryPath);

      const protocolFiles = files
        .map((fileName: string) => {
          return path.join(directoryPath, fileName);
        })
        .filter((fileName: string) => {
          return path.extname(fileName).toLowerCase() === '.yaml';
        });

      return protocolFiles;
    } catch (error: any) {
      console.log(error);
    }
  }
}
