import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailShortComponent } from './blog-detail-short.component';

describe('BlogDetailShortComponent', () => {
  let component: BlogDetailShortComponent;
  let fixture: ComponentFixture<BlogDetailShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogDetailShortComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogDetailShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

//it('should create', () => { expect(component).toBeTruthy();  });
});
