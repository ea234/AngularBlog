import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have one h1-Element', () => {

    const h1DebugElement = fixture.debugElement.query( By.css('h1') );

    expect(h1DebugElement).toBeTruthy();

  });


  it('should have Text "About: Angular Blog" ', () => {

    const h1DebugElement = fixture.debugElement.query( By.css('h1') );

    expect(h1DebugElement).toBeTruthy();

    const h1NativeElement = h1DebugElement.nativeElement as HTMLElement;

    expect( h1NativeElement.textContent?.trim()).toBe('About: Angular Blog');

  });

  //  (By.css('h1')); expect(h1DebugElement).toBeTruthy();  }); });

});
