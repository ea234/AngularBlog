import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailLongComponent } from './blog-detail-long.component';

describe('BlogDetailLongComponent', () => {
  let component: BlogDetailLongComponent;
  let fixture: ComponentFixture<BlogDetailLongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogDetailLongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogDetailLongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //it('should create', () => { expect(component).toBeTruthy();  });
});
