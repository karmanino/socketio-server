import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { connectedUsers } from '../sockets/sockets';

const router = Router();

router.get('/users', (req: Request, res: Response) => {
	const server = Server.instance;

	connectedUsers.getUserList();

	server.io.allSockets().then(val => {
		res.json(connectedUsers.getUserList());
	})
});

router.post('/message/:id', (req: Request, res: Response) => {

    const message = req.body.message;
    const from = req.body.from;
    const id = req.params.id;

	const server = Server.instance;
	server.io.in(id).emit('new-private-message', {from, message});

	res.json({
		ok: true,
        message,
        from,
        id
	});
});

router.post('/message', (req: Request, res: Response) => {

    const message = req.body.message;
    const from = req.body.from;

	const server = Server.instance;
	server.io.emit('new-message', {from, message});

	res.json({
		ok: true,
        message,
        from
	});
});

export default router;