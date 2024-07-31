import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OperadorComponent } from './components/operador/operador.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth.guard';
import { InfoComponent } from './components/info/info.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UpdateInfoComponent } from './components/update-info/update-info.component';
import { FirebaseDataComponent } from './components/firebase-data/firebase-data.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'aboutUs', component: AboutUsComponent, canActivate: [AuthGuard] },
  { path: 'info', component: InfoComponent, canActivate: [AuthGuard] },
  { path: 'firebase-data', component: FirebaseDataComponent },
  { path: 'registro', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'operador', component: OperadorComponent, canActivate: [AuthGuard] },
  { path: 'updateUser', component: UpdateUserComponent, canActivate: [AuthGuard] },
  { path: 'updateInfo', component: UpdateInfoComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
