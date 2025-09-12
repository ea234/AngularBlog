import { TestBed         } from '@angular/core/testing';
import { BlogUserService } from './blog-user.service';

describe('BlogUserService', () =>
{
  let service: BlogUserService;

  beforeEach(() => {

    TestBed.configureTestingModule({});

    service = TestBed.inject( BlogUserService );
  });


  it( 'should be created', () =>
  {
    expect( service ).toBeTruthy();
  });


  it( 'User should not be logged in', () =>
  {
    expect( service ).toBeTruthy();

    expect( service.isUserLoggedIn() ).toBeFalse();

    expect( service.isUserNotLoggedIn() ).toBeTrue();
  });


  it( 'User Name should "Guest" ', () =>
  {
    expect( service ).toBeTruthy();

    expect( service.getUserName() ).toBe( "Guest" );
  });


  it( 'User should be logged in', () =>
  {
    expect( service ).toBeTruthy();

    expect( service.isUserLoggedIn() ).toBeFalse();

    service.userLogIn();

    expect( service.isUserLoggedIn() ).toBeTrue();
  });


  it( 'User should be logged in with user admin and id 1', () =>
  {
    expect( service ).toBeTruthy();

    expect( service.isUserLoggedIn() ).toBeFalse();

    service.userLogInNamed( "admin" );

    expect( service.isUserLoggedIn() ).toBeTrue();

    expect( service.getUserName() ).toBe( "admin" );

    expect( service.getUserID() ).toBe( 1 );
  });


  it( 'User should be logged in with user stpdom and id 2', () =>
  {
    expect( service ).toBeTruthy();

    expect( service.isUserLoggedIn() ).toBeFalse();

    service.userLogInNamed( "stpdom" );

    expect( service.isUserLoggedIn() ).toBeTrue();

    expect( service.getUserName() ).toBe( "stpdom" );

    expect( service.getUserID() ).toBe( 2 );
  });


  it( 'User should be logged in and than logged out', () =>
  {
    expect( service ).toBeTruthy();

    expect( service.isUserLoggedIn() ).toBeFalse();

    service.userLogIn();

    expect( service.isUserLoggedIn() ).toBeTrue();

    service.userLogOut();

    expect( service.isUserLoggedIn() ).toBeFalse();
  });
});
