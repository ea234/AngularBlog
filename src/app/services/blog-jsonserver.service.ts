import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of          } from 'rxjs';
import { ClsBlogEntry, BlogEntry } from '../ClsBlogEntry';
import { ClsBlogBackend          } from './ClsBlogBackend';

const http_options = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  ),
};

@Injectable({
  providedIn: 'root'
})
export class BlogJsonserverService implements ClsBlogBackend
{
  private api_url : string = 'http://localhost:5000/blog';

  constructor( private m_http_client: HttpClient )
  {
  }


  getBlogList() : Observable<BlogEntry[]>
  {
    return this.m_http_client.get<BlogEntry[]>( this.api_url );
  }


  public getEntryCount(): Observable<number>
  {
    return this.m_http_client.get<BlogEntry[]>( this.api_url ).pipe( map( list => list.length ) );
  }


  getBlogEntry( entry_id : string ) : Observable<BlogEntry>
  {
    const url = `${ this.api_url }/${ entry_id }`;

    return this.m_http_client.get<BlogEntry>( url );
  }


  deleteBlogEntry( blog_entry : BlogEntry ) : Observable<BlogEntry>
  {
    blog_entry.id = blog_entry.m_entry_id;

    //this.m_http_client.get<BlogEntry[]>( this.api_url );

    const url = `${ this.api_url }/${ blog_entry.m_entry_id }`;

    return this.m_http_client.delete<BlogEntry>(url);
  }


  updateBlogEntry( blog_entry : BlogEntry) : Observable<BlogEntry>
  {
    blog_entry.id = blog_entry.m_entry_id;

    const url = `${ this.api_url }/${ blog_entry.m_entry_id }`;

    return this.m_http_client.put<BlogEntry>( url, blog_entry, http_options );
  }


  addBlogEntry( blog_entry : BlogEntry) : Observable<BlogEntry>
  {
    blog_entry.id = blog_entry.m_entry_id;

    return this.m_http_client.post<BlogEntry>( this.api_url, blog_entry, http_options );
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

  saveBlogEntry( blog_entry : BlogEntry ) : Observable<BlogEntry>
  {
    if ( blog_entry.m_entry_id === "-2" )
    {
      return of( blog_entry );
    }

    if ( blog_entry.m_entry_id === "-1" )
    {
      blog_entry.m_entry_id = this.getNewBlogId();

      blog_entry.id = blog_entry.m_entry_id;

      return this.m_http_client.post<BlogEntry>( this.api_url, blog_entry, http_options );
    }
    else
    {
      blog_entry.id = blog_entry.m_entry_id;

      const url = `${ this.api_url }/${ blog_entry.m_entry_id }`;

      return this.m_http_client.put<BlogEntry>( url, blog_entry, http_options );
    }
  }
}
