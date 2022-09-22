import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';
import * as socketFunctions from '../sockets/sockets';

export default class Server {
	private static _instance: Server;
	public app: express.Application;
	public port: number;
	public io: socketIO.Server;
	private httpServer: http.Server;

	private constructor() {
		this.app = express();
		this.port = SERVER_PORT;
		this.httpServer = new http.Server(this.app);
		this.io = new socketIO.Server(this.httpServer, { cors: { origin: true, credentials: true } });
		this.listenSockets();
	}

	start(callbackfn: () => void) {
		this.httpServer.listen(this.port, callbackfn);
	}

	public static get instance() {
		return this._instance || (this._instance = new this());
	}

	private listenSockets() {
		console.log('Listening connections');

		this.io.on('connection', (client: socketIO.Socket) => {
			socketFunctions.newConnection(client, this.io);
			socketFunctions.getUserList(client, this.io);
			socketFunctions.configUser(client, this.io);
			socketFunctions.message(client, this.io);
			socketFunctions.disconnect(client, this.io);
		});
	}

	emitEvent(event: string, payload?: any, callbackFn?: () => void) {
		this.io.emit(event, payload, callbackFn);
	}
}
