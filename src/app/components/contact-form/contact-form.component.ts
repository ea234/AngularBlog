import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: false,
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent
{
  contact_show_confirm_message : boolean = false;

  myUserForm! : FormGroup;

  ngOnInit(): void
  {
    this.myUserForm = new FormGroup(
      { contact_subject: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(150)  ] ),
        contact_text:    new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(2000) ] )
      });
  }


  onSubmit(): void
  {
    if ( this.myUserForm )
    {
      if ( this.myUserForm.valid )
      {
        const formValue = this.myUserForm.value; // Hier weiterverarbeiten, z.B. senden an API console.log('Form submitted', formValue);

        console.log( formValue );


        this.contact_show_confirm_message = true;
      }
    }
  }

  get contact_subject() { return this.myUserForm.get('contact_subject'); }

  get contact_text()    { return this.myUserForm.get('contact_text');     }

  showContactForm() : boolean
  {
    return !this.contact_show_confirm_message;
  }

  showConfirmMessage() : boolean
  {
    return this.contact_show_confirm_message;
  }
}
/*
        <p *ngIf="myUserForm.get('contact_subject')?.errors?.['required']">Blog Header is required</p>
        <p *ngIf="myUserForm.get('contact_subject')?.errors?.['minlength']">Blog Header is to short. Minlength is {{ myUserForm.get('contact_subject')?.errors?.['minlength']?.requiredLength }}</p>

*/
