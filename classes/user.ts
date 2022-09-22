export class User {
    public id: string;
    public username: string;
    public chatroom: string;

    constructor(id: string){
        this.id = id;
        this.username = 'not-logged-in';
        this.chatroom = 'none';
    }
}