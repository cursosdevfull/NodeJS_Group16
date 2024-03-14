import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

const publicKey = '6LdimJIpAAAAAPy1NZxVtNyvb5ZOdH_n8h8yBrp2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RecaptchaModule,
    ReactiveFormsModule,
    RecaptchaFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: publicKey,
      },
    },
  ],
})
export class LoginComponent {
  fg: FormGroup;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.fg = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      recaptchaCode: new FormControl('', [Validators.required]),
    });
  }

  signIn() {
    const values = this.fg.value;
    this.http
      .post('http://localhost:4000/auth/login', values)
      .subscribe((data: any) => {
        this.router.navigate(['/verify-fa'], {
          queryParams: {
            accessToken: data.accessToken,
          },
        });
      });
  }
}
