import { Injectable } from '@angular/core';
import { BlogAppMain } from '../extern_app/ClsBlogAppMain';
import { Observable, of } from 'rxjs';
import { BlogEntry } from '../ClsBlogEntry';

@Injectable({
  providedIn: 'root'
})
export class BlogEntryService {


  private cls_blog_app : BlogAppMain = new BlogAppMain();

  constructor() {

    this.cls_blog_app.generateMockUpBlogEntries();
  }

  public getEntryCount() : Observable<number>
  {
    //const meineZahl$: Observable<number> = of( this.cls_blog_app.getArrayLength());

    return of( this.cls_blog_app.getArrayLength() );
  }

  public addEntry() : void
  {
    this.cls_blog_app.addMockUpBlogEntry();
  }

  public getArrayBlogEntry() : Observable<Array<BlogEntry>>
  {
    return of( this.cls_blog_app.getVektor() );
  }

  public getBlogEntry( blog_entry_id : number ) : BlogEntry | undefined
  {
    return this.cls_blog_app.getBlogEntry( blog_entry_id );
  }

  public hasBlogEntryId( blog_entry_id : number ) : boolean
  {
    return this.cls_blog_app.hasBlogEntryId( blog_entry_id );
  }


}
