import { Component } from '@angular/core';
import { AddBlogTemplateComponent } from '../add-blog-template/add-blog-template.component';
import { CanComponentDeactivate } from '../../guards/confirmation/confirmation.guard';

@Component({
  selector: 'app-blog-add-new',
  standalone: false,
  templateUrl: './blog-add-new.component.html',
  styleUrl: './blog-add-new.component.css'
})
export class BlogAddNewComponent implements CanComponentDeactivate {

  public confirm(): boolean
  {
    return confirm( "Seite verlassen?" );
  }

}
