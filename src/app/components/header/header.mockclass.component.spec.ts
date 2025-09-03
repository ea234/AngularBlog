import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';
import { BlogUserService } from '../../services/blog-user.service';


class MockBlogUserService {

  m_is_logged_in : boolean = false;
  m_user_name : string = "MockUser";

  isUserLoggedIn() : boolean { return this.m_is_logged_in; }

  isUserNotLoggedIn() : boolean { return this.m_is_logged_in; }

  getUserName() : string { return this.m_user_name; }

  setUserName( p_user_name : string ) { this.m_user_name = p_user_name; }

  userLogOut() : boolean
  {
    this.m_is_logged_in = false;

    return true;
  }


  public userLogIn() : boolean
  {
    this.m_is_logged_in = true;

    return true;
  }
}


describe('HeaderComponent', () =>
{
  let mock_user_c : MockBlogUserService = new MockBlogUserService();

  let component: HeaderComponent;

  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      declarations: [HeaderComponent],

      providers: [ { provide: BlogUserService, useClass: MockBlogUserService, useValue: mock_user_c } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);

    component = fixture.componentInstance;

    mock_user_c.setUserName( "MockUser" );

    fixture.detectChanges();
  });


  it('should create', () =>
  {
    expect( component ).toBeTruthy();
  });


  it('should be "MockUser"', () =>
  {
    expect( component.getUserName() ).toBe( "MockUser" );
  });



  it('should display LogOut link when user is logged in', () =>
  {
    mock_user_c.userLogIn();

    fixture.detectChanges();

    expect( component.isUserLoggedIn() ).toBeTrue();

    const log_out_link = fixture.debugElement.query( By.css( 'a[routerLink="/logout"]' ) );

    expect( log_out_link ).toBeTruthy();

    mock_user_c.userLogOut();

    fixture.detectChanges();

    mock_user_c.setUserName("TestName");

    expect( component.getUserName() ).toBe( "TestName" );


    //const log_in_link = fixture.debugElement.query( By.css( 'a[routerLink="/login"]' ) );

    //expect( log_in_link ).toBeTruthy();
  });

});
