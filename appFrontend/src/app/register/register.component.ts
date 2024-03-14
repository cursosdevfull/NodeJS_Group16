import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  fg: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient
  ) {
    this.fg = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      roles: new FormControl([{ roleId: 1 }, { roleId: 2 }]),
    });
  }

  signOut() {
    const values = this.fg.value;
    this.http
      .post('http://localhost:4000/auth/register', values)
      .subscribe((data: any) => {
        this.router.navigate(['/enable-fa'], {
          queryParams: {
            accessToken: data.accessToken,
            secret: data.secret,
            qrCode: data.qrCode,
          },
        });
      });
  }
}
