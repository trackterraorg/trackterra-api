import { ICommand } from '@nestjs/cqrs';

export class GetSupportedProtocolsCommand implements ICommand {
  constructor() {}
}
