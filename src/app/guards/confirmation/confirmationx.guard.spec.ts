import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { confirmationxGuard } from './confirmationx.guard';

describe('confirmationxGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => confirmationxGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
