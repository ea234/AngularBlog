import { Component, OnInit } from '@angular/core';
import { BlogUserService   } from '../../services/blog-user.service';

@Component({
  selector: 'app-log-in',
  standalone: false,
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit
{
  constructor( private m_user_service : BlogUserService )
  {
  }

  ngOnInit(): void
  {
    this.m_user_service.userLogIn();
  }
}
