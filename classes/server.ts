import express from 'express';
import { SERVER_PORT } from '../global/enviroment';

export default class Server {
    public app: express.Application;
    public port: number;

    constructor(){
        this.app = express();
        this.port = SERVER_PORT;
    }

    start(callbackfn: (() => void)){
        this.app.listen(this.port, callbackfn);
    }

}