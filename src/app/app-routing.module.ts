import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogDetailEmptyComponent } from './components/blog-detail-empty/blog-detail-empty.component';
import { BlogDetailLongComponent } from './components/blog-detail-long/blog-detail-long.component';
import { authGuard } from './guards/auth/auth.guard';
import { LogInComponent } from './components/log-in/log-in.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { BlogAddNewComponent } from './components/blog-add-new/blog-add-new.component';
import { confirmationGuard } from './guards/confirmation/confirmation.guard';

const appRoutes: Routes = [

  { path: 'blog',  component: BlogComponent,
    children: [

    { path: 'add',  component: BlogAddNewComponent },

    { path: ':blog_entry_id',  component: BlogDetailLongComponent  },
    { path: '',                component: BlogDetailEmptyComponent }

  ] },

  { path: 'showblog:blog_entry_id',  component: BlogDetailLongComponent },
  { path: 'about', component: AboutComponent ,

    canActivate : [ authGuard ],
    canDeactivate : [ confirmationGuard ]
  },
  { path: 'login',  component: LogInComponent },
  { path: 'logout',  component: LogOutComponent },
  { path: '**', redirectTo: '/blog', pathMatch: 'full' },
  { path: '',      component: BlogComponent }
];

@NgModule({

  imports: [RouterModule.forRoot( appRoutes )],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
