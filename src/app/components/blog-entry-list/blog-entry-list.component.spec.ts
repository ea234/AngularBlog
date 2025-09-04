import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogEntryListComponent } from './blog-entry-list.component';
import { BlogEntryService             } from '../../services/blog-entry.service';
import { BlogUserService              } from '../../services/blog-user.service';
import { BlogJsonserverService } from '../../services/blog-jsonserver.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BlogEntryListComponent', () =>
{
  let component: BlogEntryListComponent;

  let fixture: ComponentFixture<BlogEntryListComponent>;

  let mock_blog_service : BlogEntryService = new BlogEntryService();

  beforeEach(async () =>
  {
    await TestBed.configureTestingModule({
      declarations: [BlogEntryListComponent],
      schemas : [ NO_ERRORS_SCHEMA ],

      providers: [ { provide: BlogUserService },
                   { provide: BlogJsonserverService, useClass: BlogEntryService, useValue: mock_blog_service }
                 ]
    })
    .compileComponents();

    mock_blog_service.resetMockUpBlogEntries();

    fixture = TestBed.createComponent(BlogEntryListComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });


  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });


  it('entry count should be the startup count', () =>
  {
    expect( component.entry_count ).toBe( mock_blog_service.getMockUpBlogEntryCount() );
  });


  it('should render app-blog-detail-short exactly the startup count times', () =>
  {
    fixture.detectChanges();

    const elements = fixture.nativeElement.querySelectorAll('app-blog-detail-short');

    expect( elements.length ).toBe( mock_blog_service.getMockUpBlogEntryCount() );
  });


  it('should render app-blog-detail-short one more time', () =>
  {
    let expected_count = mock_blog_service.getMockUpBlogEntryCount() + 1;

    mock_blog_service.addEntry();

    fixture.detectChanges();

    const elements = fixture.nativeElement.querySelectorAll('app-blog-detail-short');

    expect( elements.length ).toBe( expected_count );
  });


  it('should render less app-blog-detail-short-Tags ', () =>
  {
    let mock_up_entries : number = mock_blog_service.getMockUpBlogEntryCount();

    while ( mock_up_entries > 0)
    {
      mock_up_entries--;

      mock_blog_service.deleteFirstMockUpBlogEntry();

      fixture.detectChanges();

      const elements = fixture.nativeElement.querySelectorAll('app-blog-detail-short');

      //console.log( "Test BlogEntryListComponent reduzierung " + elements.length );

      expect( elements.length ).toBe( mock_up_entries );
    }
  });


  /*
  it('should render app-blog-detail-short exactly 0 times (NOT WORKING)', () =>
  {
    mock_blog_service.clearMockUpBlogEntries();

    fixture.detectChanges();

    const elements = fixture.nativeElement.querySelectorAll('NOT WORKING_app-blog-detail-short');

    console.log( "Test BlogEntryListComponent NOT WORKING " + elements.length );

    expect( elements.length ).toBe( 0 );
  });


  it('entry count should be 21', () =>
  {
    mock_blog_service.addEntry();

    fixture.detectChanges();

    expect( component.entry_count ).toBe( 21 );
  });
  */
});
