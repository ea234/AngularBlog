import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAddNewComponent } from './blog-add-new.component';

describe('BlogAddNewComponent', () => {
  let component: BlogAddNewComponent;
  let fixture: ComponentFixture<BlogAddNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogAddNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
