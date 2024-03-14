import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-enable-fa',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './enable-fa.component.html',
  styleUrl: './enable-fa.component.css',
})
export class EnableFaComponent {
  fg: FormGroup;
  accessToken: string = '';
  secret: string = '';
  qrCode: string = '';

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.fg = new FormGroup({
      token: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.accessToken = params.accessToken;
      this.secret = params.secret;
      this.qrCode = params.qrCode;
    });
  }

  enable2FA() {
    const { token } = this.fg.value;
    const secret = this.secret;

    this.http
      .post(
        'http://localhost:4000/auth/enable-2fa',
        {
          secret,
          token,
        },
        { headers: { Authorization: `Bearer ${this.accessToken}` } }
      )
      .subscribe((data: any) => {
        this.router.navigate(['/']);
      });
  }
}
