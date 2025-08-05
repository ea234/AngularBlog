import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BlogEntry } from '../../ClsBlogEntry';

@Component({
  selector: 'app-blog-detail-short',
  standalone: false,
  templateUrl: './blog-detail-short.component.html',
  styleUrl: './blog-detail-short.component.css'
})
export class BlogDetailShortComponent {

  @Input() blog_entry ! : BlogEntry;

  constructor()
  {
    //this.blog_entry = undefined;
  }


}
