import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignComponent } from './sign/sign.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignComponent},
  {path: 'sidebar', component: SidebarComponent},
  {path: 'users', component: UsersComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'category', component: CategoryListComponent},

     {path: 'category/create', component: CategoryCreateComponent},
  // {path: 'category/upate/:id', component: CategoryCreateOrUpdateComponent},
  // {path: 'category/show/:id', component: CategoryShowComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
