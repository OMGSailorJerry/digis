import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { AuthorizationComponent } from './authorization/authorization.component';

import { AuthorizationGruard } from './authorization/authorization-guard.service';
import { AuthorizationService } from './authorization/authorization.service';
import { MapComponent } from './map/map.component';
import { MapService } from './shared/map.service';

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent, canActivate: [AuthorizationGruard] },
  { path: 'main', component: MainComponent},
  { path: 'auth', component: AuthorizationComponent },
  { path: '', pathMatch: 'full', redirectTo: 'main' }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutComponent,
    AuthorizationComponent,
    MapComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    FormsModule
  ],
  providers: [AuthorizationGruard, AuthorizationService, MapService],
  bootstrap: [AppComponent]
})

export class AppModule { }
