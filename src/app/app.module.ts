import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { OperadorComponent } from './components/operador/operador.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { InfoComponent } from './components/info/info.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UpdateInfoComponent } from './components/update-info/update-info.component';
import { FirebaseDataComponent } from './components/firebase-data/firebase-data.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    OperadorComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent,
    InfoComponent,
    UpdateUserComponent,
    UpdateInfoComponent,
    FirebaseDataComponent,
    ChangePasswordComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxChartsModule 
  ],
  providers: [
    AuthService,
    AuthGuard,
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
