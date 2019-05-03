import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/internal/operators/first";
import {AuthenticationService} from "../services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../services/alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  private subscription: Subscription;
  message: any;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  get isUsernameInvalid() {
    return (this.f.username.dirty || this.f.username.touched) && this.f.username.invalid && this.f.username.errors;
  }

  get isPasswordInvalid() {
    return (this.f.password.dirty || this.f.password.touched) && this.f.password.invalid && this.f.password.errors;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    //this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error('Please check your usename and password', 'loginError');
          /*this.alertService.error(error);
          this.loading = false;*/
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
