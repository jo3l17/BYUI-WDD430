import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  maxDocumentId: number = 0;
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();
  documents: Document[] = [];

  constructor(private http: HttpClient) {
    this.http
      .get<Document[]>(
        // 'https://wdd430-97498-default-rtdb.firebaseio.com/documents.json'
        'http://localhost:3000/documents'
      )
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return new Document();
  }

  deleteDocument(document: Document) {
    if (!document) return;
    const pos = this.documents.indexOf(document);
    if (pos < 0) return;
    /*this.documents.splice(pos, 1);
    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();*/
    // delete from database
    this.http
      .delete('http://localhost:3000/documents/' + document.id)
      .subscribe(() => {
        this.documents.splice(pos, 1);
        this.documentListChangedEvent.next(this.documents.slice());
        // this.sortAndSend();
        // this.storeDocuments();
      });
  }

  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach((document) => {
      const currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  addDocument(document: Document) {
    if (!document) return;
    /*this.maxDocumentId++;
    newDocument.id = '' + this.maxDocumentId;
    this.documents.push(newDocument);
    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();*/

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; document: Document }>(
        'http://localhost:3000/documents',
        document,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.documentListChangedEvent.next(this.documents.slice());
        // this.sortAndSend();
        // this.storeDocuments();
      });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) return;

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return;
    newDocument.id = originalDocument.id;
    // newDocument._id = originalDocument._id;


    /*this.documents[pos] = newDocument;
    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();*/
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put(
        'http://localhost:3000/documents/' + originalDocument.id,
        newDocument,
        { headers: headers }
      )
      .subscribe(() => {
        this.documents[pos] = newDocument;
        this.documentListChangedEvent.next(this.documents.slice());
        // this.sortAndSend();
        // this.storeDocuments();
      });
  }

  storeDocuments() {
    const documentsJson = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(
        'https://wdd430-97498-default-rtdb.firebaseio.com/documents.json',
        documentsJson,
        { headers: headers }
      )
      .subscribe(
        () => {
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
