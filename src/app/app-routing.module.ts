import { NgModule                 } from '@angular/core';
import { RouterModule, Routes     } from '@angular/router';

import { AboutComponent           } from './components/about/about.component';
import { BlogDetailEmptyComponent } from './components/blog-detail-empty/blog-detail-empty.component';
import { BlogDetailLongComponent  } from './components/blog-detail-long/blog-detail-long.component';
import { BlogEditFormComponent    } from './components/blog-edit-form/blog-edit-form.component';
import { BlogComponent            } from './components/blog/blog.component';
import { LogInComponent           } from './components/log-in/log-in.component';
import { LogOutComponent          } from './components/log-out/log-out.component';

import { authGuard                } from './guards/auth/auth.guard';
import { confirmationGuard        } from './guards/confirmation/confirmation.guard';


const appRoutes: Routes = [

  {
    path: 'blog',  component: BlogComponent,

    children:
    [
      { path: ':blog_entry_id',  component: BlogDetailLongComponent  },
      { path: '',                component: BlogDetailEmptyComponent }
    ]
  },


  {
    path: 'edit/:blog_entry_id',  component: BlogEditFormComponent,

    canActivate   : [ authGuard         ],
    canDeactivate : [ confirmationGuard ]
  },


  {
    path: 'addnew',  component: BlogEditFormComponent,

    canActivate   : [ authGuard         ],
    canDeactivate : [ confirmationGuard ]
  },


  { path: 'showblog/:blog_entry_id', component: BlogDetailLongComponent },
  { path: 'about',                  component: AboutComponent          },
  { path: 'login',                  component: LogInComponent          },
  { path: 'logout',                 component: LogOutComponent         },
  { path: '**', redirectTo: '/blog', pathMatch: 'full'                 },
  { path: '',                       component: BlogComponent           }
];

@NgModule({
  imports: [RouterModule.forRoot( appRoutes ) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// http://localhost:4200/showblog/1299792625892
