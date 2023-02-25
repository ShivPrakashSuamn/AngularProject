import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignComponent } from './sign/sign.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignComponent,
    ProfileComponent,
    DashboardComponent,
    CategoryListComponent,
    CategoryCreateComponent,
    SidebarComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
