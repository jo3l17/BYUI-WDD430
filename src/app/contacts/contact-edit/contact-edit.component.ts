import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit {
  originalContact!: Contact;
  contact!: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  invalidGroupContact: boolean = false;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id === null || id === undefined) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(id);
      if (this.originalContact === null || this.originalContact === undefined) {
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if (this.contact.group) {
        this.groupContacts = this.contact.group.slice();
      }
    });
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    const newContact = new Contact(
      '',
      values.name,
      values.email,
      values.phone,
      values.imageUrl,
      this.groupContacts
    );
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }
}
