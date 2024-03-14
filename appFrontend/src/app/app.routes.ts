import { Routes } from '@angular/router';

import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { EnableFaComponent } from './enable-fa/enable-fa.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyFaComponent } from './verify-fa/verify-fa.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'enable-fa',
    component: EnableFaComponent,
  },
  {
    path: 'verify-fa',
    component: VerifyFaComponent,
  },
  {
    path: 'authenticated',
    component: AuthenticatedComponent,
  },
];
