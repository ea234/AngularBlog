import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By                        } from '@angular/platform-browser';
import { AboutComponent            } from './about.component';

describe( 'AboutComponent', () =>
{
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () =>
  {
    await TestBed.configureTestingModule({
      declarations: [ AboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it( 'should create', () =>
  {
    expect( component ).toBeTruthy();
  });


  it( 'should have one h1-Element', () =>
  {
    const h1_debug_element = fixture.debugElement.query( By.css( 'h1' ) );

    expect( h1_debug_element ).toBeTruthy();
  });


  it( 'should have Text "About: Angular Blog" ', () =>
  {
    const h1_debug_element = fixture.debugElement.query( By.css( 'h1' ) );

    expect( h1_debug_element ).toBeTruthy();

    const h1_native_element = h1_debug_element.nativeElement as HTMLElement;

    expect( h1_native_element.textContent?.trim() ).toBe( 'About: Angular Blog' );
  });

});
