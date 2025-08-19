import { Injectable  } from '@angular/core';
import { ClsBlogUser } from '../ClsBlogUser';

@Injectable({
  providedIn: 'root'
})
export class BlogUserService
{
  m_blog_user : ClsBlogUser = new ClsBlogUser();

  constructor()
  {
    this.m_blog_user.m_is_logged_in = false;
    this.m_blog_user.m_user_id = 0;
    this.m_blog_user.m_user_name = "Guest";
  }


  public getBlogUser() : ClsBlogUser
  {
    return this.m_blog_user;
  }


  public isUserLoggedIn() : boolean
  {
    return this.m_blog_user.m_is_logged_in;
  }


  public isUserNotLoggedIn() : boolean
  {
    //return !this.m_blog_user.m_is_logged_in;

    return this.m_blog_user.m_is_logged_in === false; // preferred way
  }


  public getUserID() : number
  {
    return this.m_blog_user.m_user_id;
  }


  public getUserName() : string
  {
    return this.m_blog_user.m_user_name;
  }


  userLogOut() : boolean {

    this.m_blog_user.m_is_logged_in = false;
    this.m_blog_user.m_user_id = 0;
    this.m_blog_user.m_user_name = "Guest";

    return true;
  }


  public userLogIn() : boolean {

    this.m_blog_user.m_is_logged_in = true;
    this.m_blog_user.m_user_id = 1;
    this.m_blog_user.m_user_name = "UserName";

    return true;
  }

}
