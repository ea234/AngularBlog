import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

interface CanComponentDeactivate {
  confirm(): boolean;
}

//@Injectable()
//export class ConfirmationGuardX implements CanDeactivateFn<CanComponentDeactivate> {
export class ConfirmationGuardX{

  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Hier kannst du deine Logik einfügen, z.B.:
    return component.confirm();
  }
}
