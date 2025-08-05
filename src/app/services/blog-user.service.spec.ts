import { TestBed } from '@angular/core/testing';

import { BlogUserService } from './blog-user.service';

describe('BlogUserService', () => {
  let service: BlogUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
