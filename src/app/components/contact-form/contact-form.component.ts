import { Component } from '@angular/core';
import { NgForm                       } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: false,
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent
{
  contact_text : string = "";

  contact_subject : string = "";


  ngSubmitMyForm( userForm : NgForm ) : boolean
  {
    let my_form = userForm.form.value;

    console.log( 'ContactFormComponent - ngSubmitMyForm' );

    return true;
  }
}
