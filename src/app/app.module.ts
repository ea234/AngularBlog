import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule                                       } from '@angular/common/http';
import { FormsModule                                            } from '@angular/forms';
import { NgbModule                                              } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule                                      } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule                                    } from '@angular/forms';
import { AppRoutingModule                                       } from './app-routing.module';
import { AppComponent                                           } from './app.component';
import { AboutComponent                                         } from './components/about/about.component';
import { BlogDetailEmptyComponent                               } from './components/blog-detail-empty/blog-detail-empty.component';
import { BlogDetailLongComponent                                } from './components/blog-detail-long/blog-detail-long.component';
import { BlogDetailShortComponent                               } from './components/blog-detail-short/blog-detail-short.component';
import { BlogEditFormComponent                                  } from './components/blog-edit-form/blog-edit-form.component';
import { BlogEntryListComponent                                 } from './components/blog-entry-list/blog-entry-list.component';
import { BlogComponent                                          } from './components/blog/blog.component';
import { ButtonComponent                                        } from './components/button/button.component';
import { HeaderComponent                                        } from './components/header/header.component';
import { LogInComponent                                         } from './components/log-in/log-in.component';
import { LogOutComponent                                        } from './components/log-out/log-out.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

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
    BlogEditFormComponent,
    ContactFormComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration( withEventReplay() ),
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
