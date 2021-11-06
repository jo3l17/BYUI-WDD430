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
    if (this.groupContacts.length > 1) {
      this.groupContacts.splice(index, 1);
    }
  }
  addToGroup(item: any) {
    // this.groupContacts.push(item);
  }
}
