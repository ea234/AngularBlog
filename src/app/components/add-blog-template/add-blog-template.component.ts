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

    console.log( 'ngSubmitMyForm' , userForm );

  }

}
