import { Component, Input, OnInit } from '@angular/core';
import { ClsBlogEntry } from '../../ClsBlogEntry';
import { NgForm } from '@angular/forms';
import { getDateString, getDateNumber } from '../../FkDate';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogEntryService } from '../../services/blog-entry.service';
import { BlogUserService } from '../../services/blog-user.service';
import { CanComponentDeactivate } from '../../guards/confirmation/confirmation.guard';

@Component({
  selector: 'app-blog-edit-form',
  standalone: false,
  templateUrl: './blog-edit-form.component.html',
  styleUrl: './blog-edit-form.component.css'
})
export class BlogEditFormComponent implements OnInit, CanComponentDeactivate
{
  private m_show_confirm_dialog : boolean = true;

  @Input() blog_entry_copy : ClsBlogEntry = new ClsBlogEntry;

  constructor( private m_blog_entry_service : BlogEntryService,
               private m_user_service       : BlogUserService,
               private m_activated_route    : ActivatedRoute,
               private m_router             : Router )
  {
    this.blog_entry_copy.m_user_id = this.m_user_service.getUserID();
    this.blog_entry_copy.m_user_name = this.m_user_service.getUserName();

    this.blog_entry_copy.m_entry_date_string = getDateString();
    this.blog_entry_copy.m_entry_date_number = getDateNumber();

    this.blog_entry_copy.m_entry_header = "";
    this.blog_entry_copy.m_entry_text = "";
  }


  ngOnInit()
  {
    let existing_blog_entry : ClsBlogEntry = new ClsBlogEntry;

    let m_blog_id_not_valid : boolean = true;

    const blog_entry_id_string = this.m_activated_route.snapshot.paramMap.get('blog_entry_id');

    const blog_entry_id_number = blog_entry_id_string !== null ? Number(blog_entry_id_string) : -1;

    if ( blog_entry_id_number >= 0 )
    {
      if ( this.m_blog_entry_service.hasBlogEntryId( blog_entry_id_number ) )
      {
        m_blog_id_not_valid = false;

        existing_blog_entry = <ClsBlogEntry> this.m_blog_entry_service.getBlogEntry( blog_entry_id_number );

        if ( existing_blog_entry !== undefined )
        {
          this.blog_entry_copy.m_user_id          = existing_blog_entry.m_user_id;
          this.blog_entry_copy.m_user_name        = "" + existing_blog_entry.m_user_name;
          this.blog_entry_copy.m_entry_date_string= existing_blog_entry.m_entry_date_string;
          this.blog_entry_copy.m_entry_date_number= existing_blog_entry.m_entry_date_number;

          this.blog_entry_copy.m_entry_header     = "" + existing_blog_entry.m_entry_header;
          this.blog_entry_copy.m_entry_text       = "" +  existing_blog_entry.m_entry_text;
        }
      }
    }

    if ( m_blog_id_not_valid )
    {
      this.m_show_confirm_dialog = false;

      this.m_router.navigate( ['/blog'], { replaceUrl: true, skipLocationChange: false })
      //this.m_router.navigate(['/blog'], { replaceUrl: true });
      //this.m_router.navigate( ['/blog'] );
    }
  }


  public confirm(): boolean
  {
    if ( this.m_show_confirm_dialog === false )
    {
      return true;
    }

    return confirm( "Seite verlassen?" );
  }



  ngSubmitMyForm( userForm : NgForm ) {

    let my_form = userForm.form.value;

    console.log( 'ngSubmitMyForm' , userForm );

    console.log( 'ngSubmitMyForm ' , my_form );

    console.log( 'ngSubmitMyForm blog_date   =>', my_form.blog_date );
    console.log( 'ngSubmitMyForm blog_header =>', my_form.blog_header );
    console.log( 'ngSubmitMyForm blog_id     =>', my_form.blog_id );
    //console.log( 'ngSubmitMyForm blog_text   =>', my_form.blog_text );
    console.log( 'ngSubmitMyForm blog_user   =>', my_form.blog_user );

    this.m_show_confirm_dialog = false;

    this.m_router.navigate( ['/blog'], { replaceUrl: true, skipLocationChange: false })
  }


  cancelAdd()
  {
    /* <button class="btn btn-primary" (click)="cancelAdd()" >Cancel</button> */

    console.log( 'cancelAdd' );
  }


}
