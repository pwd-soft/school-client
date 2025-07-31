import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import Swal from "sweetalert2";

export interface IDeactivateComponent {
  canNavigate: (value: boolean) => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UrlRouteGuard implements CanDeactivate<IDeactivateComponent>{

  constructor(private router: Router){

  }

  canDeactivate(component: IDeactivateComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (component.canNavigate(true)) {
      var response = false;
      Swal.fire({
        title: 'Are you sure?',
        text: "You have unsaved changes. Are you sure you want to leave the page?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if(result.isConfirmed){
          component.canNavigate(false);
          this.router.navigateByUrl(nextState.url);
          return;
        }
        else {
          return true;
        }
      });
      return false;
    }
    return true;
  }
}
