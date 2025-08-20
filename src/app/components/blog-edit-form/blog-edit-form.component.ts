import { Component, Input, OnInit     } from '@angular/core';
import { NgForm                       } from '@angular/forms';
import { ActivatedRoute, Router       } from '@angular/router';

import { ClsBlogEntry                 } from '../../ClsBlogEntry';
import { BlogEntryService             } from '../../services/blog-entry.service';
import { BlogUserService              } from '../../services/blog-user.service';
import { CanComponentDeactivate       } from '../../guards/confirmation/confirmation.guard';
import { getDateString, getDateNumber } from '../../FkDate';
import { BlogJsonserverService        } from '../../services/blog-jsonserver.service';

@Component({
  selector    : 'app-blog-edit-form',
  standalone  : false,
  templateUrl : './blog-edit-form.component.html',
  styleUrl    : './blog-edit-form.component.css'
})
export class BlogEditFormComponent implements OnInit, CanComponentDeactivate
{
  private m_show_confirm_dialog : boolean = true;

  private m_blog_is_add_new     : boolean = false;

  @Input() blog_entry_copy      : ClsBlogEntry = new ClsBlogEntry;

  constructor( private m_blog_entry_service    : BlogEntryService,
               private m_blog_jsonserver_service : BlogJsonserverService,
               private m_user_service          : BlogUserService,
               private m_activated_route       : ActivatedRoute,
               private m_router                : Router )
  {
    this.blog_entry_copy.m_user_id           = this.m_user_service.getUserID();
    this.blog_entry_copy.m_user_name         = this.m_user_service.getUserName();

    this.blog_entry_copy.m_entry_id          = "-1";
    this.blog_entry_copy.m_entry_date_string = getDateString();
    this.blog_entry_copy.m_entry_date_number = getDateNumber();

    this.blog_entry_copy.m_entry_header      = "";
    this.blog_entry_copy.m_entry_text        = "";

    this.m_blog_is_add_new = true;
  }


  ngOnInit()
  {
    let blog_id_not_valid : boolean = true;

    const url = this.m_router.url;

    const url_contains_add_new_blog = url.includes('addnew');

    let blog_entry_id_string = this.m_activated_route.snapshot.paramMap.get( 'blog_entry_id' );

    if ( url_contains_add_new_blog )
    {
      blog_entry_id_string = "-1";
    }
    else
    {
      blog_entry_id_string = this.m_activated_route.snapshot.paramMap.get( 'blog_entry_id' );
    }

    if (blog_entry_id_string !== null)
    {
      const blog_entry_id_number = Number( blog_entry_id_string );

      if ( Number.isInteger( blog_entry_id_number )  && ( blog_entry_id_number === -1 ) )
      {
        blog_id_not_valid = false; // new Blog Entry with ID -1
      }

      if ( blog_entry_id_number >= 0 )
      {
        if ( this.m_blog_entry_service.hasBlogEntryId( blog_entry_id_string ) )
        {
          blog_id_not_valid = false; // Existing Blog Entry

          let existing_blog_entry : ClsBlogEntry;

          existing_blog_entry = <ClsBlogEntry> this.m_blog_entry_service.getBlogEntry( blog_entry_id_string );

          if ( existing_blog_entry !== undefined )
          {
            this.blog_entry_copy.id                  =      existing_blog_entry.m_entry_id; /* Only for Json-Server */

            this.blog_entry_copy.m_user_id           =      existing_blog_entry.m_user_id;
            this.blog_entry_copy.m_user_name         = "" + existing_blog_entry.m_user_name;

            this.blog_entry_copy.m_entry_id          =      existing_blog_entry.m_entry_id;
            this.blog_entry_copy.m_entry_date_string =      existing_blog_entry.m_entry_date_string;
            this.blog_entry_copy.m_entry_date_number =      existing_blog_entry.m_entry_date_number;

            this.blog_entry_copy.m_entry_header      = "" + existing_blog_entry.m_entry_header;
            this.blog_entry_copy.m_entry_text        = "" + existing_blog_entry.m_entry_text;

            this.m_blog_is_add_new = false;
          }
        }
      }
    }

    if ( blog_id_not_valid )
    {
      this.m_show_confirm_dialog = false;

      this.m_router.navigate( ['/blog'], { replaceUrl: true, skipLocationChange: false })
    }
  }


  ngSubmitMyForm( userForm : NgForm ) : boolean
  {
    let my_form = userForm.form.value;
/*
    if ( userForm.form.dirty == false )
    {
      return true; // no changes -> leave Form
    }

    if ( userForm.form.errors !== undefined )
    {
      return true; // no changes -> leave Form
    }


*/
    //console.log( 'ngSubmitMyForm my_form ' , my_form );

    //console.log( 'ngSubmitMyForm blog_date   =>', my_form.blog_date   );
    //console.log( 'ngSubmitMyForm blog_header =>', my_form.blog_header );
    //console.log( 'ngSubmitMyForm blog_id     =>', my_form.blog_id     );
    //console.log( 'ngSubmitMyForm blog_user   =>', my_form.blog_user   );

    this.m_blog_entry_service.saveBlogEntry( this.blog_entry_copy );

    this.m_show_confirm_dialog = false;

    this.m_router.navigate( ['/blog'], { replaceUrl: true, skipLocationChange: false } )

    return true;
  }


  public deleteBlogEntry() : boolean
  {
    let fkt_return_value : boolean = false;

    if ( confirm( `Delete Blog Entry '${ this.blog_entry_copy.m_entry_header }'` ) )
    {
      console.log( "Confirm yes" );

      this.m_blog_entry_service.deleteBlogEntry( this.blog_entry_copy.m_entry_id );

      fkt_return_value = true;
    }
    else
    {
      console.log( "Confirm no" );
    }

    return fkt_return_value;
  }


  public doCancelEdit() : boolean
  {
    let fkt_return_value : boolean = false;

    if ( confirm( `Cancel Edit Blog Entry '${ this.blog_entry_copy.m_entry_header }'` ) )
    {
      console.log( "Confirm yes" );

      fkt_return_value = true;
    }
    else
    {
      console.log( "Confirm no" );
    }

    return fkt_return_value;
  }


  public confirm(): boolean
  {
    if ( this.m_show_confirm_dialog )
    {
      return confirm( "Leave Page?" );
    }

    return true;
  }


  public isEditExistingBlogEntry() : boolean
  {
    return !this.m_blog_is_add_new;
  }

  //public submitToFirebase( userForm : NgForm ) : boolean
  public submitToFirebase() : boolean
  {
    console.log( 'submitToFirebase my_form ' );

    //let my_form = userForm.form.value;

    //console.log( 'ngSubmitMyForm my_form ' , my_form );

    //console.log( 'ngSubmitMyForm blog_date   =>', my_form.blog_date   );
    //console.log( 'ngSubmitMyForm blog_header =>', my_form.blog_header );
    //console.log( 'ngSubmitMyForm blog_id     =>', my_form.blog_id     );
    //console.log( 'ngSubmitMyForm blog_user   =>', my_form.blog_user   );

    //this.m_blog_firebase_service.createNewData( this.blog_entry_copy );

    this.m_show_confirm_dialog = false;

    return false;
  }


  jsonServerAdd()
  {
    console.log( 'jsonServerAdd' );

    this.m_blog_jsonserver_service.addBlogEntry( this.blog_entry_copy )
    .subscribe( {
                  next:  (res) => { console.log('Eintrag gespeichert ' );                             },
                  error: (err) => { console.error('Fehler beim Hinzufügen des Blog-Eintrags:', err ); }
                }
              );

    return false;
  }


  jsonServerUpdate()
  {
    console.log( 'jsonServerUpdate' );

    this.m_blog_jsonserver_service.updateBlogEntry( this.blog_entry_copy )
    .subscribe( {
                  next:  (res) => { console.log('Eintrag geaendert ' );                               },
                  error: (err) => { console.error('Fehler beim Hinzufügen des Blog-Eintrags:', err ); }
                }
              );

    return false;
  }


  jsonServerDelete()
  {
    console.log( 'jsonServerDelete' );

    this.m_blog_jsonserver_service.deleteBlogEntry( this.blog_entry_copy )
    .subscribe( {
                  next:  (res) => { console.log('Eintrag geloescht' );                                },
                  error: (err) => { console.error('Fehler beim Hinzufügen des Blog-Eintrags:', err ); }
                }
              );


    return false;
  }
}
