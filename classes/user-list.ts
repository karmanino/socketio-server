import { User } from './user';

export class UserList {
	private list: User[] = [];

	public addUser(user: User) {
		this.list.push(user);
		console.log(`[New connection] [${user.id}]`);
		return user;
	}

	public updateUsername(id: string, newName: string) {
		const user = this.list.find((user) => user.id === id);
		if (user) {
			console.log(`[User updated] [${user.id}] was [${user.username}] now [${newName}]`);
			user.username = newName;
		}
	}

	public getUserList() {
		return this.list.filter((val) => val.username !== 'not-logged-in');
	}

	public getUser(id: string) {
		return this.list.find((user) => user.id === id);
	}

	public getUsersInRoom(chatroom: string) {
		return this.list.filter((user) => user.chatroom === chatroom);
	}

	public deleteUser(id: string) {
		const user = this.getUser(id);
		if (user) {
			console.log(`[User removed] [${user.id}] user [${user.username}]`);
			this.list = this.list.filter((user) => user.id !== id);
		}
		return user;
	}
}
