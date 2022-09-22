import socketIO from 'socket.io';
import { User } from '../classes/user';
import { UserList } from '../classes/user-list';

export const newConnection = (client: socketIO.Socket, io: socketIO.Server) => {
	const user = new User(client.id);
	connectedUsers.addUser(user);
};

export const disconnect = (client: socketIO.Socket, io: socketIO.Server) => {
	client.on('disconnect', () => {
		connectedUsers.deleteUser(client.id);
		io.emit('active-users', connectedUsers.getUserList());
	});
};

export const message = (client: socketIO.Socket, io: socketIO.Server) => {
	client.on('message', (payload: any) => {
		console.log(payload);
		io.emit('new-message', payload);
	});
};

export const configUser = (client: socketIO.Socket, io: socketIO.Server) => {
	client.on('configure-user', (payload: { user: string }, callbackfn: Function) => {
		connectedUsers.updateUsername(client.id, payload.user);
		io.emit('active-users', connectedUsers.getUserList());
		callbackfn({
			loggedIn: true,
			username: payload.user,
		});
	});
};

export const getUserList = (client: socketIO.Socket, io: socketIO.Server) => {
	client.on('get-user-list', () => {
		io.to(client.id).emit('active-users', connectedUsers.getUserList());
	});
};

export const connectedUsers = new UserList();
