import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

import { BlogUserService   } from '../../services/blog-user.service';
import { BlogUser } from '../../ClsBlogUser';

@Component({
  selector: 'app-log-in',
  standalone: false,
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit
{
  login_failed_knz : boolean = false;
  login_failed_message : string = "";

  myUserForm! : FormGroup;

  constructor( private m_user_service : BlogUserService )
  {
  }

  ngOnInit(): void
  {
    this.myUserForm = new FormGroup(
      {
        user_name:     new FormControl( '', [ Validators.required, Validators.minLength(2),  Validators.maxLength(50) ] ),
        user_password: new FormControl( '', [ Validators.required, Validators.maxLength(255),Validators.maxLength(50) ] ),
      });
  }

  onSubmit(): void
  {
    if ( this.myUserForm )
    {
      if ( this.myUserForm.valid )
      {
        const formValue = this.myUserForm.value; 

        console.log( "login form ", formValue );

        if ( formValue.user_password === "login" )
        {
          this.m_user_service.userLogInNamed( formValue.user_name );

          this.login_failed_knz = false;

          this.login_failed_message = "";
        }
        else
        {
          this.login_failed_knz = true;

          this.login_failed_message = "Error Log-In for User " +  formValue.user_name;
        }
      }
    }
  }

  get user_name()             : AbstractControl | null { return this.myUserForm.get( 'user_name' ); }
  get user_password()         : AbstractControl | null { return this.myUserForm.get( 'user_password' ); }

  get user_login_failed()     : boolean                { return this.login_failed_knz; };
  getLogInFailedMessage()     : string                 { return this.login_failed_message; };

  get blogUser()              : BlogUser               { return this.m_user_service.getBlogUser(); }

  isUserLoggedOut()           : boolean                { return this.m_user_service.isUserNotLoggedIn(); }
  isUserLoggedIn()            : boolean                { return this.m_user_service.isUserLoggedIn(); }

}
