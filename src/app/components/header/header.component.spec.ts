import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By                        } from '@angular/platform-browser';
import { HeaderComponent           } from './header.component';
import { BlogUserService           } from '../../services/blog-user.service';

describe('HeaderComponent', () =>
{
  let mock_user_c : BlogUserService = new BlogUserService();

  let component: HeaderComponent;

  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      declarations: [HeaderComponent],

      providers: [ { provide: BlogUserService } ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });


  it( 'should create', () =>
  {
    expect( component ).toBeTruthy();
  });


  it( 'user name should be "Guest"', () =>
  {
    expect( component.getUserName() ).toBe( "Guest" );
  });


  it( 'user should not be logged in', () =>
  {
    expect( component.isUserLoggedIn()    ).toBeFalse();

    expect( component.isUserNotLoggedIn() ).toBeTrue();
  });


  it( 'should display Login link when user is not logged in', () =>
  {
    const log_in_link = fixture.debugElement.query( By.css( 'a[routerLink="/login"]' ) );

    expect( component.isUserNotLoggedIn() ).toBeTrue();

    expect( component.isUserLoggedIn()    ).toBeFalse();

    expect( log_in_link ).toBeTruthy();
  });


  it( 'should display about link', () =>
  {
    const log_in_link = fixture.debugElement.query( By.css( 'a[routerLink="/about"]' ) );

    expect( log_in_link ).toBeTruthy();
  });


  it( 'should display contact link', () =>
  {
    const log_in_link = fixture.debugElement.query( By.css( 'a[routerLink="/contact"]' ) );

    expect( log_in_link ).toBeTruthy();
  });


  it( 'should display blog link', () =>
  {
    const log_in_link = fixture.debugElement.query( By.css( 'a[routerLink="/blog"]' ) );

    expect( log_in_link ).toBeTruthy();
  });


  it( 'should display LogOut', () =>
  {
    component.getUserService().userLogIn();

    mock_user_c.userLogIn();

    fixture.detectChanges();

    expect( component.isUserLoggedIn()    ).toBeTrue();

    expect( component.isUserNotLoggedIn() ).toBeFalse();

    const log_out_link = fixture.debugElement.query( By.css( 'a[routerLink="/logout"]' ) );

    expect( log_out_link ).toBeTruthy();
  });

});
