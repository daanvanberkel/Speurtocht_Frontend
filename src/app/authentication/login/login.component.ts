import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.authService.getJwt()) {
      this.router.navigate(['/login']);
      return;
    }
  }

  getFacebookLogin(): string {
    return `${environment.api_base}/auth/facebook`;
  }

  getGoogleLogin(): string {
    return `${environment.api_base}/auth/google`;
  }

  onSumbit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(token => {
      this.authService.setJwt(token);
      this.authService.loadPlayer().subscribe(player => {
        if (localStorage.getItem('redirect_to')) {
          this.router.navigate([localStorage.getItem('redirect_to')]);
          localStorage.removeItem('redirect_to');
        } else {
          this.router.navigate(['/']);
        }
      });
    }, error => {
      if (error.error.message) {
        this.snackBar.open(error.error.message, null, {
          duration: 5000
        });
      } else {
        this.snackBar.open('Er is een fout opgetreden tijdens het inloggen', null, {
          duration: 5000
        });
      }
    });
  }
}
