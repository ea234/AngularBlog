import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlogDetailEmptyComponent } from './components/blog-detail-empty/blog-detail-empty.component';
import { BlogEntryListComponent } from './components/blog-entry-list/blog-entry-list.component';
import { BlogDetailShortComponent } from './components/blog-detail-short/blog-detail-short.component';
import { BlogDetailLongComponent } from './components/blog-detail-long/blog-detail-long.component';
import { ButtonComponent } from './components/button/button.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { BlogAddNewComponent } from './components/blog-add-new/blog-add-new.component';
import { AddBlogTemplateComponent } from './components/add-blog-template/add-blog-template.component';
import { BlogEditFormComponent } from './components/blog-edit-form/blog-edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BlogComponent,
    HeaderComponent,
    BlogDetailEmptyComponent,
    BlogEntryListComponent,
    BlogDetailShortComponent,
    BlogDetailLongComponent,
    ButtonComponent,
    LogInComponent,
    LogOutComponent,
    BlogAddNewComponent,
    AddBlogTemplateComponent,
    BlogEditFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
