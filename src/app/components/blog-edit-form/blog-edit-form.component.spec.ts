import { convertToParamMap            } from '@angular/router';
import { NO_ERRORS_SCHEMA             } from '@angular/core';
import { FormsModule                  } from '@angular/forms';
import { ComponentFixture, TestBed    } from '@angular/core/testing';
import { ActivatedRoute, Router       } from '@angular/router';
import { Subject                      } from 'rxjs';

import { BlogUserService              } from '../../services/blog-user.service';
import { BlogJsonserverService        } from '../../services/blog-jsonserver.service';
import { BlogEntryService             } from '../../services/blog-entry.service';
import { BlogEntry                    } from '../../ClsBlogEntry';
import { BlogEditFormComponent        } from './blog-edit-form.component';

class ActivatedRouteStub
{
  private subject = new Subject();

  params = this.subject.asObservable();

  snapshot = { paramMap: convertToParamMap({}) };

  pushParams( params: any ) { this.subject.next( params ); }
}


describe( 'BlogEditFormComponent', () =>
{
  const mock_route_stub = new ActivatedRouteStub();

  let component: BlogEditFormComponent;

  let fixture: ComponentFixture<BlogEditFormComponent>;

  let mock_blog_service : BlogEntryService = new BlogEntryService();

  let mock_user_service : BlogUserService  = new BlogUserService();

  let getNewTestbed = async ( param_wert : string ) => {

    await TestBed.configureTestingModule({

      declarations: [ BlogEditFormComponent ],

      schemas : [ NO_ERRORS_SCHEMA ],

      imports: [ FormsModule ],

      providers: [
                   { provide: BlogJsonserverService, useClass: BlogEntryService,    useValue: mock_blog_service },
                   { provide: BlogUserService,       useClass: BlogUserService,     useValue: mock_user_service },
                   { provide: ActivatedRoute,        useClass: ActivatedRouteStub,  useValue: mock_route_stub   },
                   { provide: BlogEntryService,      useClass: BlogEntryService,    useValue: mock_blog_service }
                 ]
    })
    .compileComponents();

    fixture = TestBed.createComponent( BlogEditFormComponent );

    mock_route_stub.snapshot =  { paramMap: convertToParamMap( { blog_entry_id: param_wert } ) }

    mock_blog_service.resetMockUpBlogEntries();

    mock_user_service.userLogIn();

    component = fixture.componentInstance;

    fixture.detectChanges();
  }


  it( 'should create with param 1111', async() =>
  {
    let expected_id : string = "1111";

    await getNewTestbed( expected_id );

    expect( component ).toBeTruthy();

    expect( component.getBlogEntryParamID() ).toBe( expected_id );
  });


  it( 'should create with param 9999', async() =>
  {
    let expected_id : string = "9999";

    await getNewTestbed( expected_id );

    expect( component ).toBeTruthy();

    expect( component.getBlogEntryParamID() ).toBe( expected_id );
  });


  it( 'schould load an EXISTING BlogEntry', async () =>
  {
    let test_mock_entry : BlogEntry = mock_blog_service.getMockUpTestBlogEntry();

    await getNewTestbed( test_mock_entry.m_entry_id );

    console.log( "Paramcheck for existing BlogEntry. expected_id = " + test_mock_entry.m_entry_id , component.getBlogEntryParamID() );

    await fixture.whenStable();

    expect( component.isEditNewBlogEntry() ).toBeFalse();

    expect( component.isEditExistingBlogEntry() ).toBeTrue();

    expect( component.blog_entry_copy.m_entry_id ).toBe( test_mock_entry.m_entry_id );

    expect( component.blog_entry_copy.m_entry_header ).toBe( test_mock_entry.m_entry_header );

    expect( component.blog_entry_copy.m_entry_text ).toBe( test_mock_entry.m_entry_text );

    expect( component.blog_entry_copy.m_user_name ).toBe( test_mock_entry.m_user_name );

    expect( component.blog_entry_copy.m_user_id ).toBe( test_mock_entry.m_user_id );
  });


  it( 'it schould have a new BlogEntry with param "-1"', async () =>
  {
    let expected_id : string =  "-1";

    await getNewTestbed( expected_id );

    await fixture.whenStable();

    expect( component.isEditNewBlogEntry()      ).toBeTrue();

    expect( component.isEditExistingBlogEntry() ).toBeFalse();

    expect( component.getBlogEntryParamID()     ).toBe( expected_id );
  });


  it( 'should save the string for the pressed button', async() =>
  {
    let expected_id : string =  "-1";

    await getNewTestbed( expected_id );

    await fixture.whenStable();

    component.setPressedButton( 'save' );

    expect( component.getPressedButton() ).toBe( 'save' );


    component.setPressedButton( 'delete' );

    expect( component.getPressedButton() ).toBe( 'delete' );


    component.setPressedButton( 'cancel' );

    expect( component.getPressedButton() ).toBe( 'cancel' );
  });

});
