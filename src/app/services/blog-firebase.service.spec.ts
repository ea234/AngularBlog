import { TestBed } from '@angular/core/testing';

import { BlogFirebaseService } from './blog-firebase.service';

describe('BlogFirebaseService', () => {
  let service: BlogFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
