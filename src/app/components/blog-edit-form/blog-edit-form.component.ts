import { Component, Input } from '@angular/core';
import { ClsBlogEntry } from '../../ClsBlogEntry';
import { NgForm } from '@angular/forms';
import { getDateString, getDateNumber } from '../../FkDate';


@Component({
  selector: 'app-blog-edit-form',
  standalone: false,
  templateUrl: './blog-edit-form.component.html',
  styleUrl: './blog-edit-form.component.css'
})
export class BlogEditFormComponent {

  @Input() new_blog_entry : ClsBlogEntry = new ClsBlogEntry;

  constructor()
  {
    // this.new_blog_entry.m_entry_date_string = getDateString();
    // this.new_blog_entry.m_entry_date_number = getDateNumber();

    this.new_blog_entry.m_entry_header = "New Blog Entry";
    this.new_blog_entry.m_entry_text = "New Blog Text";
  }

  ngSubmitMyForm( userForm : NgForm ) {

    let my_form = userForm.form.value;

    console.log( 'ngSubmitMyForm' , userForm );

    console.log( 'ngSubmitMyForm ' , my_form );

    console.log( 'ngSubmitMyForm blog_date   =>', my_form.blog_date );
    console.log( 'ngSubmitMyForm blog_header =>', my_form.blog_header );
    console.log( 'ngSubmitMyForm blog_id     =>', my_form.blog_id );
    console.log( 'ngSubmitMyForm blog_text   =>', my_form.blog_text );
    console.log( 'ngSubmitMyForm blog_user   =>', my_form.blog_user );

  }

  cancelAdd() {

    console.log( 'cancelAdd' );



  }

}
