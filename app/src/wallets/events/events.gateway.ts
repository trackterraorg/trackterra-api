import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Chain } from '@trackterra/chains/enums/chain.enum';
import { ParsingStatus } from '@trackterra/repository/enums/parsing-status.enum';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @OnEvent('parsing')
  parsingStatus(payload: {
    address: string;
    chain: Chain;
    msg: string;
    status: ParsingStatus;
    numberOfNewParsedTxs: number;
  }) {
    this.server.sockets.emit('events', payload);
  }
}
