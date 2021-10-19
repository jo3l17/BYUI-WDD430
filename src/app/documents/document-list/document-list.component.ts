import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
})
export class DocumentListComponent implements OnInit {
  documents: Array<Document> = [];
  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documentService.documentChangedEvent.subscribe((documents) => {
      this.documents = documents;
    });
    this.documents = this.documentService.getDocuments();
  }
}
