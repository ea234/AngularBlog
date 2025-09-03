import { TestBed } from '@angular/core/testing';

import { BlogUserService } from './blog-user.service';

describe('BlogUserService', () => {
  let service: BlogUserService;

  beforeEach(() => {

    TestBed.configureTestingModule({});

    service = TestBed.inject(BlogUserService);
  });


  it('should be created', () =>
  {
    expect( service ).toBeTruthy();
  });


  it('User should not be logged in', () =>
  {
    expect( service ).toBeTruthy();

    expect( service.isUserLoggedIn() ).toBeFalse();

    expect( service.isUserNotLoggedIn() ).toBeTrue();
  });


  it('User Name should "Guest" ', () =>
  {
    expect( service ).toBeTruthy();

    expect( service.getUserName() ).toBe( "Guest" );
  });


  it('User should be logged in', () =>
  {
    expect( service ).toBeTruthy();

    expect( service.isUserLoggedIn() ).toBeFalse();

    service.userLogIn();

    expect( service.isUserLoggedIn() ).toBeTrue();
  });


  it('User should be logged in and than logged out', () =>
  {
    expect( service ).toBeTruthy();

    expect( service.isUserLoggedIn() ).toBeFalse();

    service.userLogIn();

    expect( service.isUserLoggedIn() ).toBeTrue();

    service.userLogOut();

    expect( service.isUserLoggedIn() ).toBeFalse();
  });
});
