export class Message {
  content: object;
  timestamp: Date;
  avatar: string;
  type: string;
  rawresp:any;
  constructor(content: object, avatar: string, type:string,timestamp?: Date,rawresp?:any) {
    this.content = content;
    this.timestamp = timestamp;
    this.avatar = avatar;
    this.type = type;
    this.rawresp = rawresp;
  }
}
