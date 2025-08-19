import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';


import { FormsModule                                            } from '@angular/forms';

import { NgbModule         } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


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
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

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
    BlogEditFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [
    provideClientHydration( withEventReplay() ),
    provideFirebaseApp(() => initializeApp({ projectId: "angular2-9fbc0", appId: "1:664394979912:web:3929bfd16e99e42ba1567d", storageBucket: "angular2-9fbc0.firebasestorage.app", apiKey: "AIzaSyCfV-CxZTzrVPmftXrrRfHEwt0NWCq6mjA", authDomain: "angular2-9fbc0.firebaseapp.com", messagingSenderId: "664394979912" })),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase())
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
