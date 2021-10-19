import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {
  contact!: Contact;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.contact = this.contactService.getContact(params.id);
    });
  }

  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('/contacts')
  }
}
