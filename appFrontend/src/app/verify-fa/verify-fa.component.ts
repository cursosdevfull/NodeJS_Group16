import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-verify-fa',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './verify-fa.component.html',
  styleUrl: './verify-fa.component.css',
})
export class VerifyFaComponent {
  fg: FormGroup;
  accessToken: string = '';

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
    });
  }

  verify2FA() {
    const { token } = this.fg.value;

    this.http
      .post(
        'http://localhost:4000/auth/verify-2fa',
        {
          token,
        },
        { headers: { Authorization: `Bearer ${this.accessToken}` } }
      )
      .subscribe((data: any) => {
        this.router.navigate(['/authenticated']);
      });
  }
}
