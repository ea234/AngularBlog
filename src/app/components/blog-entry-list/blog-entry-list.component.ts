import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router                       } from '@angular/router';
import { Observable                   } from 'rxjs';
import { BlogEntryService             } from '../../services/blog-entry.service';
import { BlogEntry                    } from '../../ClsBlogEntry';
import { BlogUserService              } from '../../services/blog-user.service';
import { BlogJsonserverService } from '../../services/blog-jsonserver.service';

@Component({
  selector: 'app-blog-entry-list',
  standalone: false,
  templateUrl: './blog-entry-list.component.html',
  styleUrl: './blog-entry-list.component.css'
})
export class BlogEntryListComponent implements OnInit, OnDestroy
{
    blog_vektor : BlogEntry[] = [];

    entry_count : number = 0;

    private my_route_start : string = "/blog";

    private observable_entry_count ? : Observable<number>;

   /*
    * private m_blog_jsonserver_service : BlogJsonserverService,
    * private m_blog_jsonserver_service : BlogEntryService,
    */

    constructor( private m_blog_jsonserver_service : BlogJsonserverService,
                 private m_user_service       : BlogUserService,
                 private m_router             : Router )
    {
    }


    ngOnInit()
    {
      this.m_blog_jsonserver_service.getBlogList().subscribe( ( vector_blog_entries ) => this.blog_vektor = vector_blog_entries );

      this.my_route_start = this.m_router.url;

      this.observable_entry_count = this.m_blog_jsonserver_service.getEntryCount();

      this.observable_entry_count.subscribe( value => { this.entry_count = value } )
    }


    ngOnDestroy(): void
    {
      //this.observable_entry_count?.unsubscribe();
    }


    showViewAddBlogEntry1()
    {
      //console.log( `Click showViewAddBlogEntry ${ this.m_router.url }` );
      //console.log( `this.my_route_start        ${ this.my_route_start }` );

      //let url_new_route_1 = this.m_router.url + "/add";
      let url_new_route_2 = this.my_route_start + "/add";

      this.m_router.navigate( [ url_new_route_2 ] );

      /*
       * Not working, when showing a blog detail.
       *
       * Click showViewAddBlogEntry /blog/0
       * this.my_route_start        /blog
       */
      //this.m_router.navigate( [ 'add' ] ); // somehow not working
    }


    showViewAddBlogEntry2()
    {
      let url_new_route = "/addnew";

      this.m_router.navigate( [ url_new_route ] );
    }


    public isUserLoggedIn() : boolean
    {
      return this.m_user_service.isUserLoggedIn();
    }


    hasRoute( route_to_check: string ) : boolean
    {
      return this.m_router.url === route_to_check;
    }
}
