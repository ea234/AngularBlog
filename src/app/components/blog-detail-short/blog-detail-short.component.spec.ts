import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA             } from '@angular/core';
import { By                           } from '@angular/platform-browser';

import { BlogEntryService             } from '../../services/blog-entry.service';
import { BlogUserService              } from '../../services/blog-user.service';
import { BlogJsonserverService        } from '../../services/blog-jsonserver.service';
import { BlogDetailShortComponent } from './blog-detail-short.component';
import { BlogEntry } from '../../ClsBlogEntry';

describe('BlogDetailShortComponent', () =>
{
  let component: BlogDetailShortComponent;

  let fixture: ComponentFixture<BlogDetailShortComponent>;

  let mock_blog_service : BlogEntryService = new BlogEntryService();

  let mock_user_service : BlogUserService  = new BlogUserService();

  let mock_blog_entry : BlogEntry = mock_blog_service.getBlogEntryIndex( 9 );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogDetailShortComponent],
      schemas : [ NO_ERRORS_SCHEMA ],

      providers: [
                   { provide: BlogJsonserverService, useClass: BlogEntryService, useValue: mock_blog_service },
                   { provide: BlogUserService,       useClass: BlogUserService,  useValue: mock_user_service }
                 ]

    })
    .compileComponents();


    fixture = TestBed.createComponent( BlogDetailShortComponent );

    mock_user_service.userLogOut();

    component = fixture.componentInstance;

    component.blog_entry = mock_blog_entry;

    fixture.detectChanges();
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });


  it('should have view-link to entry id', () =>
  {
    const element_view_link = fixture.debugElement.query( By.css( '.view-link' ) );

    expect( element_view_link ).toBeTruthy();

    const element_router_link = element_view_link.properties['routerLink'] || element_view_link.properties['ng-reflect-router-link'];

    const native_element: HTMLElement = element_view_link.nativeElement;

    //console.log( "Test BlogDetailShortComponent native_element ", native_element );

    expect( element_router_link ).toContain( './' + mock_blog_entry.m_entry_id );

    const element_text = native_element.textContent;

    expect( element_text ).toBe( mock_blog_entry.m_entry_header );
   });

  it('should have no edit links', () =>
  {
    expect( component.isUserLoggedIn() ).toBeFalse();

    const editLinkDE = fixture.debugElement.queryAll( By.css( '[routerLink="/edit/'+ mock_blog_entry.m_entry_id + '"]' ) );

    expect(editLinkDE.length).toBe(0);

   });


  it('should have edit link to blog-entry', () =>
  {
    mock_user_service.userLogIn();  // User-ID changed in LogIn-Function

    mock_user_service.m_blog_user.m_user_id = mock_blog_entry.m_user_id;

    fixture.detectChanges();

    expect( component.isUserLoggedIn() ).toBeTrue();

    expect( component.canUserEditBlogEntry() ).toBeTrue();

    const editLinkDE = fixture.debugElement.queryAll( By.css( '[routerLink="/edit/'+ mock_blog_entry.m_entry_id + '"]' ) );

    expect(editLinkDE.length).toBe(0);
   });

  });
