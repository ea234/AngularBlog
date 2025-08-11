import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlogTemplateComponent } from './add-blog-template.component';

describe('AddBlogTemplateComponent', () => {
  let component: AddBlogTemplateComponent;
  let fixture: ComponentFixture<AddBlogTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBlogTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBlogTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
