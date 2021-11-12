import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.messageChangedEvent.subscribe(messages => {
      this.messages = messages
    })
    this.messages = this.messageService.getMessages()
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
