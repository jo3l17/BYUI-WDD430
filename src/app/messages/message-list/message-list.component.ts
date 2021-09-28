import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [
    new Message(1, 'Hello World', 'Hello from angular CMS App', 'Peter Parker'),
    new Message(2, 'A new Message', 'This is a new message that you received', 'Juan'),
    new Message(3, 'This is an important message', 'Hello Peter', 'Doctor Octopus')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
