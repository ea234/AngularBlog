import { ComponentFixture, TestBed    } from '@angular/core/testing';
import { RouterTestingModule          } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA             } from '@angular/core';
import { By                           } from '@angular/platform-browser';
import { Location                     } from '@angular/common';
import { BlogEntryService             } from '../../services/blog-entry.service';
import { BlogUserService              } from '../../services/blog-user.service';
import { BlogJsonserverService        } from '../../services/blog-jsonserver.service';
import { BlogDetailShortComponent     } from './blog-detail-short.component';
import { BlogEntry                    } from '../../ClsBlogEntry';


describe( 'BlogDetailShortComponent', () =>
{
  let component: BlogDetailShortComponent;

  let fixture: ComponentFixture<BlogDetailShortComponent>;

  let mock_blog_service : BlogEntryService = new BlogEntryService();

  let mock_user_service : BlogUserService  = new BlogUserService();

  let mock_blog_entry   : BlogEntry = mock_blog_service.getBlogEntryIndex( 9 );

  let location          : Location;

  beforeEach( async () =>
  {
    await TestBed.configureTestingModule({

      declarations: [BlogDetailShortComponent],

      imports: [ RouterTestingModule.withRoutes(
        [
          { path: ':blog_entry_id', children: [] },
          { path: 'edit/:blog_entry_id', children: []  }
        ]
      ) ],

      schemas : [ NO_ERRORS_SCHEMA ],

      providers: [
                   { provide: BlogJsonserverService, useClass: BlogEntryService, useValue: mock_blog_service },
                   { provide: BlogUserService,       useClass: BlogUserService,  useValue: mock_user_service }
                 ]
    })
    .compileComponents();

    fixture = TestBed.createComponent( BlogDetailShortComponent );

    location = TestBed.inject( Location );

    mock_user_service.userLogOut();

    component = fixture.componentInstance;

    component.blog_entry = mock_blog_entry;

    fixture.detectChanges();
  });


  it( 'should create', () =>
  {
    expect( component ).toBeTruthy();
  });


  it( 'should have view-link to blog-entry id', () =>
  {
    const element_view_link = fixture.debugElement.query( By.css( '.view-link' ) );

    expect( element_view_link ).toBeTruthy();

    const element_router_link = element_view_link.properties[ 'routerLink'             ] ||
                                element_view_link.properties[ 'ng-reflect-router-link' ] ||
                                element_view_link.attributes[ 'ng-reflect-router-link' ];

    const native_element: HTMLElement = element_view_link.nativeElement;

    expect( element_router_link ).toContain( './' + mock_blog_entry.m_entry_id );

    const element_text = native_element.textContent;

    expect( element_text ).toBe( mock_blog_entry.m_entry_header );
   });


   it( 'view link should have been clicked', async () =>
   {
    const element_view_link = fixture.debugElement.query( By.css( '.view-link' ) );

    const native_element: HTMLElement = element_view_link.nativeElement;

    const element_text = native_element.textContent;

    expect( element_text ).toBe( mock_blog_entry.m_entry_header );

    //console.log( "Test BlogDetailShortComponent native_element.click ", native_element );

    native_element.click();

    await fixture.whenStable();

    //console.log( "Test BlogDetailShortComponent location ", location );

    expect( location.path() ).toEqual( '/' + mock_blog_entry.m_entry_id );
  });


  it( 'should have no edit links when user is logged out', () =>
  {
    expect( component.isUserLoggedIn() ).toBeFalse();

    expect( component.canUserEditBlogEntry() ).toBeFalse();

    const element_edit_link = fixture.debugElement.queryAll( By.css( '[routerLink="/edit/'+ mock_blog_entry.m_entry_id + '"]' ) );

    expect( element_edit_link.length ).toBe( 0 );

    const element_container_edit_link = fixture.debugElement.query( By.css( '#id_div_container_edit_link' ) );

    expect( element_container_edit_link ).toBeFalsy();
  });


  it( 'should have no edit links when user is not the author', async () =>
  {
    mock_user_service.userLogIn();  // User-ID changed in LogIn-Function

    mock_user_service.m_blog_user.m_user_id = mock_blog_entry.m_user_id + 1;

    fixture.detectChanges();

    await fixture.whenStable();

    expect( component.isUserLoggedIn() ).toBeTrue();

    expect( component.canUserEditBlogEntry() ).toBeFalse();

    const element_container_edit_link = fixture.debugElement.query( By.css( '#id_div_container_edit_link' ) );

    expect( element_container_edit_link ).toBeTruthy();

    const element_edit_link = element_container_edit_link.query( By.css( 'a.edit-link' ) );

    expect( element_edit_link ).toBeFalsy()
  });


  it( 'should have edit link when user is logged in', async () =>
  {
    mock_user_service.userLogIn();

    mock_user_service.m_blog_user.m_user_id = mock_blog_entry.m_user_id; // User-ID changed in LogIn-Function

    fixture.detectChanges();

    await fixture.whenStable();

    expect( component.isUserLoggedIn() ).toBeTrue();

    expect( component.canUserEditBlogEntry() ).toBeTrue();

    const element_container_edit_link = fixture.debugElement.query( By.css( '#id_div_container_edit_link' ) );

    expect( element_container_edit_link ).toBeTruthy();

    const element_edit_link = element_container_edit_link.query( By.css( 'a.edit-link' ) );

    expect( element_edit_link ).toBeTruthy()
  });

/*
  it('edit link should have clicked', () =>
  {
    mock_user_service.userLogIn();  // User-ID changed in LogIn-Function

    mock_user_service.m_blog_user.m_user_id = mock_blog_entry.m_user_id;

    fixture.detectChanges();

    expect( component.isUserLoggedIn() ).toBeTrue();

    expect( component.canUserEditBlogEntry() ).toBeTrue();

    const element_edit_link = fixture.debugElement.queryAll( By.css( '[routerLink="/edit/'+ mock_blog_entry.m_entry_id + '"]' ) );

    expect( element_edit_link.length ).toBe( 0 );

    const native_element: HTMLElement = element_edit_link.nativeElement;


    native_element.click();

    await fixture.whenStable();

    console.log( "Test BlogDetailShortComponent location ", location );

    expect( location.path() ).toEqual( '/' + mock_blog_entry.m_entry_id );

  });*/

});
