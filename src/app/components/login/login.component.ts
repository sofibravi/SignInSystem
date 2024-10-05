import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  error: string | null = null;
  isSubmitted: boolean = false;
  showPassword = false;
  typePassword: string = 'password';
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    this.loginForm.statusChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => {
          this.isSubmitted = false;
        })
      )
      .subscribe();
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;
    this.authService
      .login(username, password)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((isLogged: boolean) => {
          isLogged
            ? this.router.navigate(['/album'])
            : (this.error = 'Invalid credentials');
        })
      )
      .subscribe();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.showPassword
      ? (this.typePassword = 'text')
      : (this.typePassword = 'password');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
    this.unsubscribe$.next();
  }
}
