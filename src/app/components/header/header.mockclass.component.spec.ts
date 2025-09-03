import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { BlogUserService } from '../../services/blog-user.service';


class MockBlogUserService {

  isUserLoggedIn() : boolean { return false; }

  isUserNotLoggedIn() : boolean { return true; }

  getUserName() : string { return "MockUser"; }
}

describe('HeaderComponent', () => {

  let component: HeaderComponent;

  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      declarations: [HeaderComponent],
      providers: [ { provide: BlogUserService, useClass: MockBlogUserService } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect( component ).toBeTruthy();
  });


  it('should be "MockUser"', () =>
  {
    expect( component.getUserName() ).toBe( "MockUser" );
  });
});
