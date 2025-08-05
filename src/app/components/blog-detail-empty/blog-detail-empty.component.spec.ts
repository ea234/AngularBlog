import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailEmptyComponent } from './blog-detail-empty.component';

describe('BlogDetailEmptyComponent', () => {
  let component: BlogDetailEmptyComponent;
  let fixture: ComponentFixture<BlogDetailEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogDetailEmptyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogDetailEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
