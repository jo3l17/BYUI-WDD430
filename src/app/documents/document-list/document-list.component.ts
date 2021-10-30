import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
})
export class DocumentListComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  documents: Array<Document> = [];
  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documents) => {
        this.documents = documents;
      }
    );
    this.documents = this.documentService.getDocuments();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
