import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEdit          } from '@fortawesome/free-solid-svg-icons';

import { BlogEntry       } from '../../ClsBlogEntry';
import { BlogUserService } from '../../services/blog-user.service';

@Component({
  selector: 'app-blog-detail-short',
  standalone: false,
  templateUrl: './blog-detail-short.component.html',
  styleUrl: './blog-detail-short.component.css'
})
export class BlogDetailShortComponent
{
  public fa_icon_edit = faEdit;

  @Input() blog_entry ! : BlogEntry;

  constructor(  private m_user_service : BlogUserService )
  {
    //this.blog_entry = undefined;
  }

  public isUserLoggedIn() : boolean
  {
    return this.m_user_service.isUserLoggedIn();
  }

  public canUserEditBlogEntry() : boolean
  {
    //return ( this.isUserLoggedIn() ) && ( this.blog_entry.m_user_id == this.m_user_service.getUserID() );

    if ( this.isUserLoggedIn() )
    {
      if ( this.blog_entry.m_user_id === this.m_user_service.getUserID() )
      {
        return true;
      }
    }

    return false;
  }
}
