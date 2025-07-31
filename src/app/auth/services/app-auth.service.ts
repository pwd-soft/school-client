import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { UserModel, UserProfile } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AppAuthService implements OnDestroy {
  isLoading$: Observable<boolean>;
  currentUser$: Observable<UserModel>;
  currentUserSubject: BehaviorSubject<UserModel>;
  isLoadingSubject: BehaviorSubject<boolean>;
  subs = new SubSink();

  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private oAuthService: OAuthService,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getUserByToken(): Observable<UserModel> {
    if (!this.oAuthService.hasValidAccessToken()) {
      return of(undefined);
    }
    return of(this.createUserModel(this.oAuthService.getIdentityClaims()));
  }

  login(username: string, password: string): Observable<UserProfile> {
    if (
      !this.oAuthService.hasValidAccessToken() &&
      !this.oAuthService.hasValidIdToken()
    ) {
      this.isLoadingSubject.next(true);
      this.oAuthService.oidc = false;
      this.oAuthService
        .fetchTokenUsingPasswordFlowAndLoadUserProfile(username, password)
        .then((userProfile: UserProfile) => {
          if (userProfile) {
            this.createUserModel(userProfile);
          } else {
            this.logout();
          }
          return of(userProfile);
        })
        .catch((errorResponse) => {
          console.log(errorResponse);
          this.isLoadingSubject.next(false);
          // alert(errorResponse.error.error_description);
        }),
        finalize(() => this.isLoadingSubject.next(false));
    } else {
      return of(this.createUserModel(this.oAuthService.getIdentityClaims()));
    }
  }

  createUserModel(userProfile: any): UserModel {
    const userModel = new UserModel();
    userModel.setUser(userProfile);
    userModel.setAuth(this.getAuthData());
    this.currentUserSubject = new BehaviorSubject<UserModel>(userModel);
    this.currentUserSubject.next(userModel);
    return userModel;
  }

  getAuthData(): any {
    const authData = {
      authToken: this.oAuthService.getAccessToken(),
      refreshToken: this.oAuthService.getRefreshToken(),
      expiresIn: this.oAuthService.getAccessTokenExpiration(),
    };
    return authData;
  }

  logout() {
    this.oAuthService.logOut();
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
