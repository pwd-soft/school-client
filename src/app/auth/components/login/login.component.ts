import { Component, enableProdMode, isDevMode, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

import { Common } from 'src/app/shared/common/common';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { UserProfile } from '../../models/user.model';
import { AppAuthService } from '../../services/app-auth.service';
import { PostingDto } from '../../../proxy/dto-models';
import { ApprovalService } from '../../../proxy/services';
import { IdToken, OfficeUser } from '../../../shared/model/project-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  defaultAuth: any = {
    email: '', password: '',
  };

  errorMessage: string;
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  subs = new SubSink();

  constructor(
    private appAuthService: AppAuthService,
    private approvalService: ApprovalService,
    private oAuthService: OAuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.isLoading$ = this.appAuthService.isLoading$;
    if (this.appAuthService.currentUserValue) {
      this.router.navigate(['/log/activity']);
    }

  }

  ngOnInit(): void {
    //console.log(version);
    //console.log(categories_data);
    if (isDevMode()) {
      //this.defaultAuth = { email: 'admin@abp.io', password: '1q2w3E*' };
    }

    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/log/activity';
  }

  // convenience getter for easy access to form fields
  get formControl() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.defaultAuth.email,
        Validators.compose([
          Validators.required,
          //Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit(): void {

    this.errorMessage = '';
    this.hasError = false;
    const username = this.formControl.email.value;
    const password = this.formControl.password.value;
    this.oAuthService.oidc = false;
    try {
      this.appAuthService.isLoadingSubject.next(true);
      this.oAuthService
        .fetchTokenUsingPasswordFlowAndLoadUserProfile(username, password)
        .then((userInfo: UserProfile) => {
          if (userInfo) {
            const userModel = this.appAuthService.createUserModel(userInfo);
            console.log(userModel.roles);
            var un = username.split('@')[0];
            this.approvalService.getPostingByUserName(un).subscribe((r: PostingDto) => {
              localStorage.setItem("posting", JSON.stringify(r));
              //this.approvalService.updatePostingByUserName(un).subscribe((r: PostingDto) => {
              //  localStorage.setItem("posting", JSON.stringify(r));
              //});
            });

            this.approvalService.getUserByRoleByRoleName("AuditOfficeAdmin").subscribe(x=>{
              localStorage.setItem("Auditee",JSON.stringify(x));
            })

            this.approvalService.latestOffice().subscribe(r => {
              if (localStorage.getItem("officeLatest") != r) {
                this.approvalService.getOffices()
                  .subscribe(o => {
                    localStorage.setItem("officeLatest", r)
                    localStorage.setItem("offices", JSON.stringify(o));
                  });
              }
            })

            var token = JSON.parse(localStorage.getItem("id_token_claims_obj")) as IdToken;
            var dto = new OfficeUser(); dto.userId = token.sub;
            localStorage.removeItem("valid");

            // if(token.role.includes(Common.AuditAdmin)){
            //   localStorage.setItem("valid", 'true');
            //   this.router.navigate(['/audit/monitor']);
            // }

            // if(token.role.includes(Common.AuditOfficeAdmin) || token.role.includes(Common.AuditUser)) {
            //   localStorage.setItem("valid", 'true');
            //   this.router.navigate(['/dashboard']);
            // }
            this.router.navigate(['/dashboard']);

          } else {
            this.hasError = true;
          }
        })
        .catch((errorResponse) => {
          this.hasError = true;
          this.appAuthService.isLoadingSubject.next(false);
          this.errorMessage = errorResponse.error.error_description;
        });
    } catch (error) {
      this.hasError = true;
      if (error.message === '\'tokenEndpoint\' should not be null') {
        this.errorMessage = 'Identity server is not running';
      }
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
