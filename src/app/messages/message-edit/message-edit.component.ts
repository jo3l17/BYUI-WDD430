import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.scss']
})
export class MessageEditComponent implements OnInit {

  @ViewChild('subject') subject!: ElementRef
  @ViewChild('msgText') msgText!: ElementRef
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: string = '1'

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const message: Message = new Message(Date.now().toString(), this.subject.nativeElement.value, this.msgText.nativeElement.value, this.currentSender);
    this.messageService.addMessage(message);
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
