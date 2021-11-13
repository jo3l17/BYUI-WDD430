import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();

  contacts: Array<Contact> = [];
  maxDocumentId: number = 0;

  constructor(private http: HttpClient) {
    this.http
      .get<Contact[]>(
        'https://wdd430-97498-default-rtdb.firebaseio.com/contacts.json'
      )
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxDocumentId = this.getMaxId();
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  async getContacts(): Promise<Contact[]> {
    return await this.http
      .get<Contact[]>(
        'https://wdd430-97498-default-rtdb.firebaseio.com/contacts.json'
      )
      .toPromise();
  }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return new Contact();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
  }

  addContact(newContact: Contact) {
    if (!newContact) return;
    this.maxDocumentId++;
    newContact.id = '' + this.maxDocumentId;
    this.contacts.push(newContact);
    // const contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    // const contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach((contact) => {
      const currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  storeContacts() {
    const contactsJson = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .put(
        'https://wdd430-97498-default-rtdb.firebaseio.com/contacts.json',
        contactsJson,
        { headers: headers }
      )
      .subscribe(
        () => {
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
