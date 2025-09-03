import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute    } from '@angular/router';
import { BlogJsonserverService } from '../../services/blog-jsonserver.service';
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
               private m_blog_jsonserver_service : BlogJsonserverService )
  {
    this.blog_entry = undefined;
  }

  ngOnInit() {

    this.activated_route.params.subscribe( ( params ) => {

      console.log( "detail-long Route Subscribe");
      console.log( params );

      let param_blog_entry_id = params[ 'blog_entry_id' ];

      console.log( `param_blog_entry_id  ${ param_blog_entry_id }`);

      this.m_blog_jsonserver_service.getBlogEntry( param_blog_entry_id ).subscribe( (blog_entry_from_service) => {

        this.blog_entry = blog_entry_from_service;

        if ( this.blog_entry !== null )
        {
          console.log( "detail-lon Eintrag gefunden");
        }
        else
        {
          console.log( "detail-lon Eintrag wurde nicht gefunden");
        }
    } );
    })
  }

  ngOnDestroy(): void
  {
    // Unsubscribe
  }
}
