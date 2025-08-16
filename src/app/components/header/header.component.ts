import { Component       } from '@angular/core';
import { BlogUserService } from '../../services/blog-user.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent
{
  constructor( private m_user_service : BlogUserService )
  {
  }

  public isUserLoggedIn() : boolean
  {
    return this.m_user_service.isUserLoggedIn();
  }

  public isUserNotLoggedIn() : boolean
  {
    return this.m_user_service.isUserNotLoggedIn();
  }
}
