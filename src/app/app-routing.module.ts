import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { MsalGuard } from '@azure/msal-angular';

import { LoginComponent } from './components/login/login.component';
import { RhorarioComponent } from './rhorario/rhorario.component';
import { RentradaComponent } from './rentrada/rentrada.component';
import { RsalidaComponent } from './rsalida/rsalida.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
   canActivate: [
      MsalGuard
    ]
  },
  {
    // Needed for hash routing
    path: 'code',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    // Needed for Error routing
    path: 'error',
    component: HomeComponent
  },
  {
    // Needed for Error routing
    path: 'registrar-horario',
    component: RhorarioComponent
  },
  {
    // Needed for Error routing
    path: 'registrar-entrada',
    component: RentradaComponent
  },
  {
    // Needed for Error routing
    path: 'registrar-salida',
    component: RsalidaComponent
  }


];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    // Don't perform initial navigation in iframes
    initialNavigation: !isIframe ? 'enabled' : 'disabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
