import { ComponentFixture, TestBed    } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA             } from '@angular/core';
import { By                           } from '@angular/platform-browser';
import { convertToParamMap            } from '@angular/router';
import { BlogEntryService             } from '../../services/blog-entry.service';
import { BlogUserService              } from '../../services/blog-user.service';
import { BlogJsonserverService        } from '../../services/blog-jsonserver.service';

import { BlogEditFormComponent } from './blog-edit-form.component';

import { RouterTestingModule          } from '@angular/router/testing';
import { Location                     } from '@angular/common';
import { BlogEntry                    } from '../../ClsBlogEntry';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router       } from '@angular/router';
 import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


class ActivatedRouteStub
{
  private subject = new Subject();

  params = this.subject.asObservable();

  snapshot = { paramMap: convertToParamMap({}) };

  pushParams( params: any ) { this.subject.next( params ); }
}


describe('BlogEditFormComponent', () =>
{
  const mock_route_stub = new ActivatedRouteStub();

  let component: BlogEditFormComponent;

  let fixture: ComponentFixture<BlogEditFormComponent>;

  let mock_blog_service : BlogEntryService = new BlogEntryService();

  let mock_user_service : BlogUserService  = new BlogUserService();

  let newTestBed = async ( param_wert : string ) => {

    await TestBed.configureTestingModule({

      declarations: [BlogEditFormComponent],

      schemas : [ NO_ERRORS_SCHEMA ],

      imports: [ FormsModule ],

      providers: [
                   { provide: BlogJsonserverService, useClass: BlogEntryService,    useValue: mock_blog_service },
                   { provide: BlogUserService,       useClass: BlogUserService,     useValue: mock_user_service },
                   { provide: ActivatedRoute,        useClass: ActivatedRouteStub,  useValue: mock_route_stub  },
                   { provide: BlogEntryService,      useClass: BlogEntryService,    useValue: mock_blog_service }
                 ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogEditFormComponent);

    mock_route_stub.snapshot =  { paramMap: convertToParamMap( { blog_entry_id: param_wert } ) }

    mock_blog_service.resetMockUpBlogEntries();

    mock_user_service.userLogIn();

    component = fixture.componentInstance;

    fixture.detectChanges();
  }



  beforeEach(async () => {

  });


  it('should create with param 1111', async() =>
  {
    let expected_id : string = "1111";

    await newTestBed( expected_id );

    console.log ( "Paramcheck for new BlogEntry  1 ", component.getBlogEntryParamID() );

    expect(component).toBeTruthy();

    expect( component.getBlogEntryParamID()     ).toBe( expected_id );
  });


  it('should create with param 9999', async() =>
  {
    let expected_id : string = "9999";

    await newTestBed( expected_id );

    console.log ( "Paramcheck for new BlogEntry  1 ", component.getBlogEntryParamID() );

    expect(component).toBeTruthy();

    expect( component.getBlogEntryParamID()     ).toBe( expected_id );
  });









});
 /*





  it( 'NEW BlogEntry', async () =>
  {
    let expected_id : string =  "-1";

    mock_route_stub.snapshot =  { paramMap: convertToParamMap( { blog_entry_id: expected_id } ) }

    component = fixture.componentInstance;

    fixture.detectChanges();

    await fixture.whenStable();

    console.log ( "Paramcheck for new BlogEntry  1 ", component.getBlogEntryParamID() );

    expect( component.isEditNewBlogEntry()      ).toBeTrue();
    expect( component.isEditExistingBlogEntry() ).toBeFalse();

    expect( component.getBlogEntryParamID()     ).toBe( expected_id );
   });



  it( 'NEW BlogEntry', async () =>
  {
    let expected_id : string =  "123";

    mock_route_stub.snapshot =  { paramMap: convertToParamMap( { blog_entry_id: expected_id } ) }

	// Override the mock ActivatedRoute to return a different parameter instead of id, showcasing an instace where a different parameter is in the url
		TestBed.overrideProvider(

      ActivatedRoute, { useValue: mock_route_stub  },

    );

    TestBed.compileComponents();

    fixture = TestBed.createComponent(BlogEditFormComponent);

    mock_blog_service.resetMockUpBlogEntries();

    mock_user_service.userLogIn();

		component = fixture.componentInstance;

    fixture.detectChanges();

    await fixture.whenStable();

    console.log ( "Paramcheck for new BlogEntry  1 ", component.getBlogEntryParamID() );

    expect( component.isEditNewBlogEntry()      ).toBeTrue();
    expect( component.isEditExistingBlogEntry() ).toBeFalse();

    expect( component.getBlogEntryParamID()     ).toBe( expected_id );
   });







 it( 'EXISTING BlogEntry', async () =>
  {
    let test_mock_entry : BlogEntry = mock_blog_service.getMockUpTestBlogEntry();

    let expected_id : string =  mock_blog_service.getMockUpTestEntryID();

    mock_route_stub.snapshot.paramMap = convertToParamMap( { blog_entry_id: expected_id } );

    fixture.detectChanges();

    await fixture.whenStable();

    console.log ( "Paramcheck for existing BlogEntry  1 expected_id = " + expected_id , component.getBlogEntryParamID() );

    expect( component.isEditNewBlogEntry()      ).toBeFalse();
    expect( component.isEditExistingBlogEntry() ).toBeTrue();

    expect( component.getBlogEntryParamID()     ).toBe( expected_id );

    expect( component.getBlogEntryParamID()     ).toBe( test_mock_entry.m_entry_id );
   });


*/
