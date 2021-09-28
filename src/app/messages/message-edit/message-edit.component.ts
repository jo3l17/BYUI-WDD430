import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.scss']
})
export class MessageEditComponent implements OnInit {

  @ViewChild('subject') subject!: ElementRef
  @ViewChild('msgText') msgText!: ElementRef
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: string = 'Joel Valdez'

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const message: Message = new Message(Date.now(), this.subject.nativeElement.value, this.msgText.nativeElement.value, this.currentSender);
    this.addMessageEvent.emit(message);
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
