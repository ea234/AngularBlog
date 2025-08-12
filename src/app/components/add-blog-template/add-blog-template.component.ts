import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-blog-template',
  standalone: false,
  templateUrl: './add-blog-template.component.html',
  styleUrl: './add-blog-template.component.css'
})
export class AddBlogTemplateComponent {


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

  /*
  [disabled]="myUserForm.invalid"
  */
}
