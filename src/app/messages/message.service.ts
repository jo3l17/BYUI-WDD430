import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
// import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  maxMessageId: number = 0;
  messages: Array<Message> = [];
  messageChangedEvent: EventEmitter<Message[]> = new EventEmitter<Message[]>();

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
    this.http
      .get<Message[]>(
        // 'https://wdd430-97498-default-rtdb.firebaseio.com/messages.json'
        'http://localhost:3000/messages'
      )
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.emit(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message | null {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach((message) => {
      const currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  addMessage(message: Message) {
    // this.messages.push(message);
    // this.messageChangedEvent.emit(this.messages.slice());
    // this.storeMessages();
    if (!message) return;
    message.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{ message: string; msg: Message }>(
        'http://localhost:3000/messages',
        message,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.messages.push(responseData.msg);
        this.messageChangedEvent.emit(this.messages.slice());
      });
  }

  storeMessages() {
    const messagesJson = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(
        'https://wdd430-97498-default-rtdb.firebaseio.com/messages.json',
        messagesJson,
        { headers }
      )
      .subscribe(
        () => {
          this.messageChangedEvent.emit(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
