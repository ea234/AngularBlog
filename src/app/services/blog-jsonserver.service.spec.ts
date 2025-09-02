import { TestBed } from '@angular/core/testing';

import { BlogJsonserverService } from './blog-jsonserver.service';

describe('BlogJsonserverService', () => {
  let service: BlogJsonserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogJsonserverService);
  });

  //it('should be created', () => { expect(service).toBeTruthy();  });

});
