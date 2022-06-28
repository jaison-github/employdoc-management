import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { UserInfoStoreService } from '@shared/stores/master-data/user-data.state';
import { tap, finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  isSubmitClicked = false;
  isRemerberChecked = false;
  user: any;
  isuserAuthenticated: boolean = false;
  authenticatedRedirectUrl: string = '';
  redirectUrl = null;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private userstore: UserInfoStoreService
  ) {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.redirectUrl = this.route.snapshot.queryParams.returnUrl
      ? this.route.snapshot.queryParams.returnUrl
      : this.authService.defaultUrl;
  }

  async ngOnInit(): Promise<void> {}

  public onSubmit() {
    this.isSubmitClicked = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .login(this.loginForm.value)
      .pipe(
        tap((_) => (this.error = '')),
        finalize(() => {
        })
      )
      .subscribe(
        (data) => {
          this.userstore.updateuserInfo(data);
          this.router.navigateByUrl(this.redirectUrl);
        },
        (err) => (this.error = err)
      );
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.loginForm?.controls[control]?.invalid &&
      (this.loginForm?.controls[control]?.dirty ||
        this.loginForm?.controls[control]?.touched) &&
      this.loginForm?.controls[control]?.hasError(error)
    );
  };
}
