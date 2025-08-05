import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogEntryService } from '../../services/blog-entry.service';
import { BlogEntry } from '../../ClsBlogEntry';
import { BlogUserService } from '../../services/blog-user.service';

@Component({
  selector: 'app-blog-entry-list',
  standalone: false,
  templateUrl: './blog-entry-list.component.html',
  styleUrl: './blog-entry-list.component.css'
})
export class BlogEntryListComponent implements OnInit, OnDestroy {

    blog_vektor : BlogEntry[] = [];

    entry_count : number = 0;

    observable_entry_count ? : Observable<number>;

    constructor( private m_blog_entry_service : BlogEntryService, private m_user_service : BlogUserService ) {

      this.observable_entry_count = this.m_blog_entry_service.getEntryCount();

      this.observable_entry_count.subscribe( value => { this.entry_count = value } )
    }

    ngOnInit()
    {
      this.m_blog_entry_service.getArrayBlogEntry().subscribe( ( entries ) => this.blog_vektor = entries );
    }

    ngOnDestroy(): void {

      //this.observable_entry_count?.unsubscribe();
    }

    addBlogEntry() {

    }


    public isUserLoggedIn() : boolean
    {
      return this.m_user_service.isUserLoggedIn();
    }


}
