import { ComponentFixture, TestBed    } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA             } from '@angular/core';
import { By                           } from '@angular/platform-browser';

import { BlogEntryListComponent       } from './blog-entry-list.component';
import { BlogEntryService             } from '../../services/blog-entry.service';
import { BlogUserService              } from '../../services/blog-user.service';
import { BlogJsonserverService        } from '../../services/blog-jsonserver.service';

describe('BlogEntryListComponent', () =>
{
  let component: BlogEntryListComponent;

  let fixture: ComponentFixture<BlogEntryListComponent>;

  let mock_blog_service : BlogEntryService = new BlogEntryService();
  let mock_user_service : BlogUserService  = new BlogUserService();

  beforeEach(async () =>
  {
    await TestBed.configureTestingModule({
      declarations: [ BlogEntryListComponent ],

      schemas : [ NO_ERRORS_SCHEMA ],

      providers: [
                   { provide: BlogJsonserverService, useClass: BlogEntryService, useValue: mock_blog_service },
                   { provide: BlogUserService,       useClass: BlogUserService,  useValue: mock_user_service }
                 ]
    })
    .compileComponents();

    mock_blog_service.resetMockUpBlogEntries();

    mock_user_service.userLogOut();

    fixture = TestBed.createComponent( BlogEntryListComponent );

    component = fixture.componentInstance;

    fixture.detectChanges();
  });


  it( 'should create', () =>
  {
    expect( component ).toBeTruthy();
  });


  it( 'entry count should be the startup count', () =>
  {
    expect( component.entry_count ).toBe( mock_blog_service.getMockUpBlogEntryCount() );
  });


  it( 'should render app-blog-detail-short exactly the startup count times', () =>
  {
    fixture.detectChanges();

    const elements = fixture.nativeElement.querySelectorAll( 'app-blog-detail-short' );

    expect( elements.length ).toBe( mock_blog_service.getMockUpBlogEntryCount() );
  });


  it( 'should render app-blog-detail-short one more time', () =>
  {
    let expected_count = mock_blog_service.getMockUpBlogEntryCount() + 1;

    mock_blog_service.addEntry();

    fixture.detectChanges();

    const elements = fixture.nativeElement.querySelectorAll( 'app-blog-detail-short' );

    expect( elements.length ).toBe( expected_count );
  });


  it( 'should render less app-blog-detail-short-Tags ', () =>
  {
    let mock_up_entries : number = mock_blog_service.getMockUpBlogEntryCount();

    while ( mock_up_entries > 0 )
    {
      mock_up_entries--;

      mock_blog_service.deleteFirstMockUpBlogEntry();

      fixture.detectChanges();

      const elements = fixture.nativeElement.querySelectorAll( 'app-blog-detail-short' );

      expect( elements.length ).toBe( mock_up_entries );
    }
  });


  it( 'should display no "add blog entry" button', () =>
  {
    const button_y =  fixture.debugElement.query( By.css( '#add_blog_entry_button' ) );

    expect( button_y ).toBeFalsy();
  });


  it( 'should display the "add blog entry" button', () =>
  {
    mock_user_service.userLogIn();

    fixture.detectChanges();

    const button_y =  fixture.debugElement.query( By.css( '#add_blog_entry_button' ) );

    expect( button_y ).toBeTruthy();
  });


  it( 'user should not be logged in', () =>
  {
    expect( component.isUserLoggedIn() ).toBeFalse();
  });


  it( 'user should be logged in', () =>
  {
    mock_user_service.userLogIn();

    expect( component.isUserLoggedIn() ).toBeTrue();
  });
});
