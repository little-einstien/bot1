export class Message {
  content: string;
  timestamp: Date;
  avatar: string;
  type: string
  constructor(content: string, avatar: string, type:string,timestamp?: Date) {
    debugger;
    this.content = content;
    this.timestamp = timestamp;
    this.avatar = avatar;
    this.type = type;
  }
}
