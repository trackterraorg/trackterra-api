import { Injectable, Logger, Module } from '@nestjs/common';
import { InjectConfig } from '@nestcloud/config';
import * as fs from 'fs';
import { ConsulConfig } from '@nestcloud/config/consul-config';
import { Boot, InjectBoot } from '@nestcloud/boot';
import { join } from 'path';

@Injectable()
export class SeedService {
  logger = new Logger(this.constructor.name);

  constructor(
    @InjectConfig() private readonly config: ConsulConfig,
    @InjectBoot() private readonly boot: Boot,
  ) {
    this.seedConsulConfig();
  }

  public async seedConsulConfig() {
    try {
      await this.consulConfig();
    } catch (e) {
      this.logger.error(e);
    }
  }

  /**
   * WIP auto populate consul
   */
  private async consulConfig() {
    // Read consul key from bootstrap-<env>.yaml file
    const consulKey: string = this.boot.get('config.key');
    const hasConfig = await this.config.get();

    if (hasConfig === {}) {
      const filePath = '/config.app.yaml';
      const value = await fs.readFileSync(join(__dirname, filePath), 'utf-8');
      await this.config.init();
    }
  }
}

@Module({
  providers: [SeedService],
})
export class SeedModule {}
