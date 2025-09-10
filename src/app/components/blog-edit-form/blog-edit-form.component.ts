import { Component, Input, OnInit     } from '@angular/core';
import { NgForm                       } from '@angular/forms';
import { ActivatedRoute, Router       } from '@angular/router';

import { BlogEntry, ClsBlogEntry                 } from '../../ClsBlogEntry';
import { BlogEntryService             } from '../../services/blog-entry.service';
import { BlogUserService              } from '../../services/blog-user.service';
import { CanComponentDeactivate       } from '../../guards/confirmation/confirmation.guard';
import { getDateString, getDateNumber } from '../../FkDate';
import { BlogJsonserverService        } from '../../services/blog-jsonserver.service';
import { BlogAppMain } from '../../extern_app/ClsBlogAppMain';

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

  private m_blog_flag : boolean = false;

  private m_blog_entry_id_string : string = 'not valid';

  private m_pressed_button : string = 'cancel';

  @Input() blog_entry_copy      : ClsBlogEntry = new ClsBlogEntry;

  constructor( private m_blog_jsonserver_service : BlogJsonserverService,
               private m_user_service            : BlogUserService,
               private m_activated_route         : ActivatedRoute,
               private m_router                  : Router )
  {
    this.blog_entry_copy.m_user_id           = this.m_user_service.getUserID();
    this.blog_entry_copy.m_user_name         = this.m_user_service.getUserName();

    this.blog_entry_copy.m_entry_id          = '-1';
    this.blog_entry_copy.m_entry_date_string = getDateString();
    this.blog_entry_copy.m_entry_date_number = getDateNumber();

    this.blog_entry_copy.m_entry_header      = '';
    this.blog_entry_copy.m_entry_text        = '';

    this.m_blog_is_add_new = true;
  }


  ngOnInit()
  {
    if ( this.m_user_service.isUserNotLoggedIn() )
    {
      console.log('User is not logged in' );

      this.m_show_confirm_dialog = false;

      this.m_router.navigate( ['/blog'], { replaceUrl: true, skipLocationChange: false })

      return;
    }


    const url_string : string = this.m_router.url;

    const url_contains_add_new_blog : boolean = url_string.includes( 'addnew' );

    let blog_entry_id_string = this.m_activated_route.snapshot.paramMap.get( 'blog_entry_id' );

    if ( url_contains_add_new_blog )
    {
      blog_entry_id_string = "-1";
    }
    else
    {
      blog_entry_id_string = this.m_activated_route.snapshot.paramMap.get( 'blog_entry_id' );
    }

    this.m_blog_entry_id_string = "" + blog_entry_id_string;

    if ( blog_entry_id_string !== null )
    {
      if ( ( blog_entry_id_string !== "" ) && ( blog_entry_id_string !== '-1' ))
      {
        console.log( 'Existing BlogEntry' + blog_entry_id_string + '. Get from Server' );

        this.m_blog_jsonserver_service.getBlogEntry( blog_entry_id_string )
        .subscribe( {
                  next:  ( existing_blog_entry ) =>
                    {
                      console.log('Found BlogEntry to edit' );

                      this.blog_entry_copy.id                  =      existing_blog_entry.m_entry_id; /* Only for Json-Server */

                      this.blog_entry_copy.m_user_id           =      existing_blog_entry.m_user_id;
                      this.blog_entry_copy.m_user_name         = "" + existing_blog_entry.m_user_name;

                      this.blog_entry_copy.m_entry_id          =      existing_blog_entry.m_entry_id;
                      this.blog_entry_copy.m_entry_date_string =      existing_blog_entry.m_entry_date_string;
                      this.blog_entry_copy.m_entry_date_number =      existing_blog_entry.m_entry_date_number;

                      this.blog_entry_copy.m_entry_header      = "" + existing_blog_entry.m_entry_header;
                      this.blog_entry_copy.m_entry_text        = "" + existing_blog_entry.m_entry_text;

                      //console.log('ACTUAL existing_blog_entry ', existing_blog_entry );
                      //console.log('COPY   this.blog_entry_copy', this.blog_entry_copy );

                      this.m_blog_is_add_new = false;

                      if ( existing_blog_entry.m_user_id !== this.m_user_service.getUserID() )
                      {
                        console.log('BlogEntry not from current User-ID' );

                        this.m_show_confirm_dialog = false;

                        this.m_router.navigate( ['/blog'], { replaceUrl: true, skipLocationChange: false })
                      }
                    },

                  error: (err) => { console.error( 'Fehler beim holen des Blog-Eintrags:', err );

                      console.log('BlogEntry not found' );

                      this.m_show_confirm_dialog = false;

                      this.m_router.navigate( ['/blog'], { replaceUrl: true, skipLocationChange: false })
                  }
                }
              );
      }
    }

  }


  public setPressedButton( param_pressed_button : string ) : void
  {
    this.m_pressed_button = param_pressed_button;
  }


  public getPressedButton() : string
  {
    return this.m_pressed_button;
  }


  ngSubmitMyForm( userForm : NgForm ) : boolean
  {
    let my_form = userForm.form.value;

    if ( this.m_pressed_button === 'save' )
    {
      console.log( 'editform save' );

      if (  ( userForm.form.errors !== null ) )
      {
        console.log( 'editform save - Blog Entry has errors' , userForm.form.errors );

        return false;
      }
      else
      {
        this.m_blog_jsonserver_service.saveBlogEntry( this.blog_entry_copy )

        .subscribe( {
                next:  ( result ) =>
                {
                  console.log( 'EditForm Blog Entry Saved' );

                  this.m_show_confirm_dialog = false;

                  this.m_router.navigate( ['/blog'], { replaceUrl: true, skipLocationChange: false } )
                },

                error: ( err ) =>
                {
                  console.error( 'EditForm Blog Entry Save Error ', err );
                }
              }
            );
      }
    }
    else if ( this.m_pressed_button === 'delete' )
    {
      console.log( "editform delete" );

      if ( confirm( `Delete Blog Entry '${ this.blog_entry_copy.m_entry_header }'` ) )
      {
        console.log( "Confirm yes" );

        this.m_blog_jsonserver_service.deleteBlogEntry( this.blog_entry_copy )
        .subscribe( {
                    next:  ( result ) =>
                    {
                      console.log( 'EditForm Blog Entry Deleted' );

                      this.m_show_confirm_dialog = false;

                      this.m_router.navigate( ['/blog'], { replaceUrl: true, skipLocationChange: false } )
                    },

                    error: (err) =>
                    {
                      console.error( 'EditForm Blog Entry Delete Error ', err );
                    }
                  }
                );
      }
      else
      {
        console.log( 'EditForm Confirm No' );
      }
    }
    else if ( this.m_pressed_button === 'cancel' )
    {
      console.log( 'EditForm Cancel' );

      if ( userForm.form.dirty == false )
      {
        console.log( 'EditForm Blog Entry Cancel No Changes' );

        this.m_show_confirm_dialog = false;

        this.m_router.navigate( ['/blog'], { replaceUrl: true, skipLocationChange: false } )

        return true; // no changes -> leave Form
      }
      else if ( confirm( `Cancel Edit Blog Entry '${ this.blog_entry_copy.m_entry_header }'` ) )
      {
        console.log( 'EditForm Blog Entry Cancel Yes' );

        this.m_show_confirm_dialog = false;

        this.m_router.navigate( ['/blog'], { replaceUrl: true, skipLocationChange: false } )
      }
      else
      {
        console.log( 'EditForm Blog Entry Cancel No' );
      }
    }

    return true;
  }


  public confirm() : boolean
  {
    if ( this.m_show_confirm_dialog )
    {
      return confirm( 'Leave Page?' );
    }

    return true;
  }


  public isEditExistingBlogEntry() : boolean
  {
    return !this.m_blog_is_add_new;
  }


  public isEditNewBlogEntry() : boolean
  {
    return this.m_blog_is_add_new;
  }


  public getBlogEntryParamID() : string
  {
    return this.m_blog_entry_id_string;
  }

  /*
   * Unused Old Test Functions
   */

  jsonServerAdd()
  {
    console.log( 'jsonServerAdd' );

    this.m_blog_jsonserver_service.addBlogEntry( this.blog_entry_copy )

    .subscribe( {
                  next:  (res) => { console.log( 'Eintrag gespeichert ' );                             },
                  error: (err) => { console.error( 'Fehler beim Hinzufügen des Blog-Eintrags:', err ); }
                }
              );

    return false;
  }


  jsonServerUpdate()
  {
    console.log( 'jsonServerUpdate' );

    this.m_blog_jsonserver_service.updateBlogEntry( this.blog_entry_copy )
    .subscribe( {
                  next:  (res) => { console.log( 'Eintrag geaendert ' );                               },
                  error: (err) => { console.error( 'Fehler beim Hinzufügen des Blog-Eintrags:', err ); }
                }
              );

    return false;
  }


  jsonServerDelete()
  {
    console.log( 'jsonServerDelete' );

    this.m_blog_jsonserver_service.deleteBlogEntry( this.blog_entry_copy )
    .subscribe( {
                  next:  (res) => { console.log( 'Eintrag geloescht' );                                },
                  error: (err) => { console.error( 'Fehler beim Hinzufügen des Blog-Eintrags:', err ); }
                }
              );


    return false;
  }


  jsonServerInit()
  {
    let mock_blog_service : BlogAppMain = new BlogAppMain();

    mock_blog_service.generateMockUpBlogEntries();

    let mock_up_entriy_count : number = mock_blog_service.getArrayLength();
    let mock_up_entriy_index : number = 0;

    while ( mock_up_entriy_index < mock_up_entriy_count )
    {
      let mock_up_blog_entry  = mock_blog_service.getBlogEntryIndex( mock_up_entriy_index );

      if ( mock_up_blog_entry )
      {
        console.log( "json_init " + mock_up_entriy_index );

      this.m_blog_jsonserver_service.addBlogEntry( mock_up_blog_entry )
      .subscribe( {
                    next:  (res) => { console.log( 'Eintrag gespeichert ' );                             },
                    error: (err) => { console.error( 'Fehler beim Hinzufügen des Blog-Eintrags:', err ); }
                  }
                );
      }

      mock_up_entriy_index++;
    }

    return false;
  }
}
