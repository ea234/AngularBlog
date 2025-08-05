import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogEntryService } from '../../services/blog-entry.service';

@Component({
  selector: 'app-blog',
  standalone: false,
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

  constructor( private m_blog_entry_service : BlogEntryService ) {

  }

}
