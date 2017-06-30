import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { GuardService } from './guard.service';
import { AuthService } from './auth.service';
import { TerritoryService } from './territory.service';
import { UserService } from './user.service';
import { HouseholdService } from './household.service';
import { TakeSearchComponent } from './take-search/take-search.component';
import { LogoutComponent } from './logout/logout.component';
import { TakeVisitsComponent } from './take-visits/take-visits.component';
import { MySearchComponent } from './my-search/my-search.component';
import { MyVisitsComponent } from './my-visits/my-visits.component';
import { MonitorUsersComponent } from './monitor-users/monitor-users.component';
import { NewUserComponent } from './new-user/new-user.component';
import { NewHouseholdComponent } from './new-household/new-household.component';
import { NewCardComponent } from './new-card/new-card.component';
import { UpdateVisitsComponent } from './update-visits/update-visits.component';
import { UpdateSearchComponent } from './update-search/update-search.component';
import { MaterializeModule } from "angular2-materialize";
import { NavbarComponent } from './navbar/navbar.component';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { DisplayHouseholdsInCardsComponent } from './display-households-in-cards/display-households-in-cards.component';
import { DisplayHouseholdsComponent } from './display-households/display-households.component';
import { KeysPipe } from './keys.pipe';
import { FooterComponent } from './footer/footer.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AdminSearchComponent } from './admin-search/admin-search.component';
import { MonitorSearchComponent } from './monitor-search/monitor-search.component';
import { EditSearchComponent } from './edit-search/edit-search.component';
import { NewSearchComponent } from './new-search/new-search.component';

@NgModule({
  declarations: [
    AppComponent,
    KeysPipe,
    LoginComponent,
    HomeComponent,
    TakeSearchComponent,
    LogoutComponent,
    TakeVisitsComponent,
    MySearchComponent,
    MyVisitsComponent,
    MonitorUsersComponent,
    NewUserComponent,
    NewHouseholdComponent,
    NewCardComponent,
    UpdateVisitsComponent,
    UpdateSearchComponent,
    NavbarComponent,
    DisplayHouseholdsInCardsComponent,
    DisplayHouseholdsComponent,
    FooterComponent,
    AdminUsersComponent,
    SpinnerComponent,
    AdminSearchComponent,
    MonitorSearchComponent,
    EditSearchComponent,
    NewSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    Ng2PageScrollModule.forRoot(),
    RouterModule.forRoot([
        {
          path: 'login',
          component:LoginComponent
        },
        {
          path: 'home',
          component:HomeComponent,
          canActivate:[GuardService]
        },
        {
          path: '',
          component:HomeComponent,
          canActivate:[GuardService]
        },
        {
          path: 'take-search',
          component:TakeSearchComponent,
          canActivate:[GuardService]
        },
        {
          path: 'my-search',
          component:MySearchComponent,
          canActivate:[GuardService]
        },
        {
          path:'display-households-in-cards',
          component:DisplayHouseholdsInCardsComponent,
          canActivate:[GuardService]
        },
        {
          path:'take-visits',
          component:TakeVisitsComponent,
          canActivate:[GuardService]
        },
        {
          path:'display-households',
          component:DisplayHouseholdsComponent,
          canActivate:[GuardService]
        },
        {
          path:'update-search',
          component:UpdateSearchComponent,
          canActivate:[GuardService]
        },
        {
          path:'update-visits',
          component:UpdateVisitsComponent,
          canActivate:[GuardService]
        },
        {
          path:'my-visits',
          component:MyVisitsComponent,
          canActivate:[GuardService]
        },
        {
          path:'admin-users',
          component:AdminUsersComponent,
          canActivate:[GuardService]
        },
        {
          path:'admin-search',
          component:AdminSearchComponent,
          canActivate:[GuardService],
          children:[
            {
              path:'',redirectTo:'monitor-search',pathMatch:'full'
            },
            {
              path:'monitor-search',
              component:MonitorSearchComponent,
              canActivate:[GuardService]
            },
            {
              path:'edit-search',
              component:EditSearchComponent,
              canActivate:[GuardService]
            },
            {
              path:'new-search',
              component:NewSearchComponent,
              canActivate:[GuardService]
            }
          ]
        }
      ])
  ],
  providers: [GuardService,AuthService,TerritoryService,UserService,HouseholdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
