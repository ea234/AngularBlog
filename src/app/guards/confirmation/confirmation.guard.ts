import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  confirm(): boolean;
}

export const confirmationGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component : CanComponentDeactivate,
  currentRoute : ActivatedRouteSnapshot,
  currentState : RouterStateSnapshot,
  nextState : RouterStateSnapshot ) : Observable<boolean> | Promise<boolean> | boolean => {
    console.log( "confirm guard" );
  return component.confirm();
};

