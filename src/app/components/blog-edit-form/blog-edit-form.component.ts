import { Component, Input, OnInit } from '@angular/core';
import { ClsBlogEntry } from '../../ClsBlogEntry';
import { NgForm } from '@angular/forms';
import { getDateString, getDateNumber } from '../../FkDate';
import { ActivatedRoute } from '@angular/router';
import { BlogEntryService } from '../../services/blog-entry.service';
import { BlogUserService } from '../../services/blog-user.service';

@Component({
  selector: 'app-blog-edit-form',
  standalone: false,
  templateUrl: './blog-edit-form.component.html',
  styleUrl: './blog-edit-form.component.css'
})
export class BlogEditFormComponent implements OnInit
{

  @Input() new_blog_entry : ClsBlogEntry = new ClsBlogEntry;

  constructor( private m_blog_entry_service : BlogEntryService,
               private m_user_service       : BlogUserService,
               private m_activated_route    : ActivatedRoute )
  {
    // this.new_blog_entry.m_entry_date_string = getDateString();
    // this.new_blog_entry.m_entry_date_number = getDateNumber();

    this.new_blog_entry.m_entry_header = "New Blog Entry";
    this.new_blog_entry.m_entry_text = "New Blog Text";
  }

ngOnInit()
{
  console.log( "ngOnInit4 " )

  const blog_entry_id_string = this.m_activated_route.snapshot.paramMap.get('blog_entry_id');

  const blog_entry_id_number = blog_entry_id_string !== null ? Number(blog_entry_id_string) : -1;

  console.log( "ngOnInit4 " + blog_entry_id_number )

  if ( blog_entry_id_number >= 0 )
  {
    this.new_blog_entry = <ClsBlogEntry> this.m_blog_entry_service.getBlogEntry( blog_entry_id_number );
  }
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
