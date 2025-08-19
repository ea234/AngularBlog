import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute    } from '@angular/router';
import { BlogEntryService  } from '../../services/blog-entry.service';
import { BlogEntry         } from '../../ClsBlogEntry';

@Component({
  selector: 'app-blog-detail-long',
  standalone: false,
  templateUrl: './blog-detail-long.component.html',
  styleUrl: './blog-detail-long.component.css'
})
export class BlogDetailLongComponent implements OnInit, OnDestroy
{
  blog_entry : BlogEntry | undefined;

  constructor( private activated_route    : ActivatedRoute,
               private blog_entry_service : BlogEntryService )
  {
    this.blog_entry = undefined;
  }

  ngOnInit() {

    this.activated_route.params.subscribe( ( params ) => {

      console.log( params );

      let param_blog_entry_id = params[ 'blog_entry_id' ];

      console.log( `param_blog_entry_id  ${ param_blog_entry_id }`);

      this.blog_entry = this.blog_entry_service.getBlogEntry( +param_blog_entry_id );

      if ( this.blog_entry !== null )
      {
        console.log( "detail-lon Eintrag gefunden");
      }
      else
      {
        console.log( "detail-lon Eintrag wurde nicht gefunden");
      }
    })
  }

  ngOnDestroy(): void
  {
    // Unsubscribe
  }
}
