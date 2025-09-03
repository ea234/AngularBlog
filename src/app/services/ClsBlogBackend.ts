import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable              } from 'rxjs';
import { ClsBlogEntry, BlogEntry } from '../ClsBlogEntry';


export interface ClsBlogBackend
{
  addBlogEntry( blog_entry : BlogEntry) : Observable<BlogEntry>
  deleteBlogEntry( blog_entry : BlogEntry ) : Observable<BlogEntry>
  getBlogEntry( entry_id : string ) : Observable<BlogEntry>
  getBlogList() : Observable<BlogEntry[]>
  saveBlogEntry( blog_entry : BlogEntry) : Observable<BlogEntry>
  updateBlogEntry( blog_entry : BlogEntry) : Observable<BlogEntry>
}
