import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contact: Contact | undefined;

  constructor(private contactService: ContactService) { }

  selectContact(contact: Contact) {
    this.contact = contact;
  }

  ngOnInit(): void {
    this.contactService.contactSelectedEvent.subscribe(contact => {
      this.contact = contact
    })
  }

}
