import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string): any {
    let filteredContacts: Contact[] = [];
    filteredContacts = contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(term.toLowerCase());
    });
    if (filteredContacts.length === 0) {
      return contacts;
    }
    return filteredContacts;
  }
}
