import { Injectable } from '@angular/core';
import { BlogAppMain } from '../extern_app/ClsBlogAppMain';
import { Observable, of } from 'rxjs';
import { BlogEntry, ClsBlogEntry } from '../ClsBlogEntry';
import { ClsBlogBackend          } from './ClsBlogBackend';

@Injectable({
  providedIn: 'root'
})
export class BlogEntryService implements ClsBlogBackend
{
  private cls_blog_app : BlogAppMain = new BlogAppMain();

  constructor()
  {
    this.cls_blog_app.generateMockUpBlogEntries();
  }


  public getEntryCount() : Observable<number>
  {
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


  public getBlogEntry( blog_entry_id : string ) : Observable<BlogEntry>
  {
    let ergebnis_obj : any = this.cls_blog_app.getBlogEntry( blog_entry_id ) ;

    if ( ergebnis_obj == undefined )
    {
      ergebnis_obj = this.cls_blog_app.getEmptyBlockEntry();
    }

    return  of( ergebnis_obj );
  }


  public hasBlogEntryId( blog_entry_id : string ) : boolean
  {
    return this.cls_blog_app.hasBlogEntryId( blog_entry_id );
  }

  private getUniqueID() : number
  {
    return Math.floor( Math.random() * Date.now() )
  }

  private getNewBlogId () : string
  {
    let unique_id = this.getUniqueID();

    // TODO: Check unique id

    return "" + unique_id;
  }

  public saveBlogEntry( blog_entry : BlogEntry ) : Observable<BlogEntry>
  {
    if ( blog_entry.m_entry_id === "-2" )
    {
      return of( blog_entry );
    }

    if ( blog_entry.m_entry_id === "-1" )
    {
      blog_entry.m_entry_id = this.getNewBlogId();

      blog_entry.id = blog_entry.m_entry_id;

      this.cls_blog_app.addBlogEntry( blog_entry );
    }
    else
    {
      blog_entry.id = blog_entry.m_entry_id;

      this.cls_blog_app.updateBlogEntry( blog_entry );
    }

    return of( blog_entry );
  }

  deleteBlogEntry( blog_entry : BlogEntry ) : Observable<BlogEntry>
  {
    this.cls_blog_app.deleteBlogEntry( blog_entry.m_entry_id );

    return of( blog_entry );
  }

  addBlogEntry( blog_entry: BlogEntry ): Observable<BlogEntry>
  {
    if ( blog_entry.m_entry_id === "-2" )
    {
      return of( blog_entry );
    }

    if ( blog_entry.m_entry_id === "-1" )
    {
      blog_entry.m_entry_id = this.getNewBlogId();

      blog_entry.id = blog_entry.m_entry_id;

      this.cls_blog_app.addBlogEntry( blog_entry );
    }
    else
    {
      blog_entry.id = blog_entry.m_entry_id;

      this.cls_blog_app.updateBlogEntry( blog_entry );
    }

    return of( blog_entry );
  }


  getBlogList(): Observable<BlogEntry[]>
  {
    return of( this.cls_blog_app.getVektor() );
  }


  updateBlogEntry( blog_entry: BlogEntry ): Observable<BlogEntry>
  {
    if ( blog_entry.m_entry_id === "-2" )
    {
      return of( blog_entry );
    }

    blog_entry.id = blog_entry.m_entry_id;

    this.cls_blog_app.updateBlogEntry( blog_entry );

    return of( blog_entry );
  }


}
