import { ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { ApprovalService } from '../../../proxy/services';
import { ChangePass } from '../../../proxy/dto-models';
import { Common } from '../../../shared/common/common';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { PreparationService } from '../../../shared/services/preparation.service';
import { UserModel } from '../../models/user.model';
import { AppAuthService } from '../../services/app-auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordFG: FormGroup;
  hasError: boolean;
  errorMessage: string;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  user$: Observable<UserModel>;
  subs = new SubSink();

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AppAuthService,
    private approval: ApprovalService,
    private prep: PreparationService,
    private toast: ToasterService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.loadForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/dashboard';
    this.user$ = this.authService.currentUserSubject.asObservable();
  }

  loadData(){}

  loadForm(){
		this.changePasswordFG = this.fb.group({
			currentPassword: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ]),
      ],
			newPassword: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ]),
      ],
      confirmPassword: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ]),
      ]
    });
  }

  // test(){
  //   const uppercaseExpression = /[A-Z]/;
  //   const password = this.changePasswordFG.controls.password.value;
  //   let test = uppercaseExpression.test(password);
  //   alert(test);
  // }

  submit(): void {
    this.errorMessage = '';
    this.hasError = false;

    const currentPassword = this.changePasswordFG.controls.currentPassword.value;
    const newPassword = this.changePasswordFG.controls.newPassword.value;
    const confirmPassword = this.changePasswordFG.controls.confirmPassword.value;

    if (this.passwordValidation(currentPassword, newPassword, confirmPassword)) {
      let input = {} as ChangePass;
      input.userName = this.prep.token.name;
      input.oldPassword= currentPassword;
      input.newPassword= newPassword;
      this.approval.updatePasswordByInput(input).subscribe(r => {
        if (r) {
          this.toast.success("Password change successful");
          this.logout();
        }
        else {
          this.toast.warn("Password change fail");
        }
      })
    }


  }

  logout() {
    this.authService.logout();
    this.localStorageService.remove(Common.PermissionCacheKey);
    document.location.reload();
    window.location.reload();
    this.router.navigate(['/auth/login']);
  }

   

  passwordValidation(currentPassword, newPassword, confirmPassword): boolean{
    let valid: boolean = true;
    const uppercaseExpression = /[A-Z]/;
    const lowercaseExpression = /[a-z]/;
    const numberExpression = /[1-9]/;
    const specialCharacterExpression = /[!@#\$%\^&\*]/;

    if(newPassword === currentPassword){
      this.hasError = true;
      this.errorMessage = 'Cannot be same passoword.';
      return valid = false;
    }

    if(newPassword !== confirmPassword){
      this.hasError = true;
      this.errorMessage = 'Passwords do not match.';
      return valid = false;
    }

    if(!uppercaseExpression.test(newPassword)){
      this.hasError = true;
      this.errorMessage = 'Must contain atleast 1 uppercase letter.';
      return valid = false;
    }

    if(!lowercaseExpression.test(newPassword)){
      this.hasError = true;
      this.errorMessage = 'Must contain atleast 1 lowercase letter.';
      return valid = false;
    }

    let specialCharacterCheck: boolean = specialCharacterExpression.test(newPassword);
    let numberCheck: boolean = numberExpression.test(newPassword);

    if(!specialCharacterCheck && !numberCheck){
      this.hasError = true;
      this.errorMessage = 'Must contain atleast 1 special character or number.';
      return valid = false;
    }

    return valid;
  }

  toDashboard(){
    this.router.navigate(['/dashboard']);
  }

}
