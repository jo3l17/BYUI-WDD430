import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents = [
    new Document(1, 'doc 1', 'desc 1', 'http://doc1.com'),
    new Document(2, 'doc 2', 'desc 2', 'http://doc2.com'),
    new Document(3, 'doc 3', 'desc 3', 'http://doc3.com'),
    new Document(4, 'doc 4', 'desc 4', 'http://doc4.com')
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
