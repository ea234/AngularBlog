import { Component, OnInit } from '@angular/core';
import { BlogUserService   } from '../../services/blog-user.service';
import { Router            } from '@angular/router';

@Component({
  selector: 'app-log-out',
  standalone: false,
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.css'
})
export class LogOutComponent implements OnInit
{
    constructor( private m_user_service : BlogUserService,
                 private m_router       : Router           )
    {
    }


    ngOnInit(): void
    {
      this.m_user_service.userLogOut();

      this.m_router.navigate(['/blog']);
    }
}
