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
import { TemplateListComponent } from './template/template-list/template-list.component';
import { TemplateCreateComponent } from './template/template-create/template-create.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactCreateComponent } from './contact/contact-create/contact-create.component';
import { ContactImportComponent } from './contact/contact-import/contact-import.component';
import { CompaignListComponent } from './compaign/compaign-list/compaign-list.component';
import { CompaignCreateComponent } from './compaign/compaign-create/compaign-create.component';
import { ListIndexComponent } from './list/list-index/list-index.component';
import { ListCreateComponent } from './list/list-create/list-create.component';
import { ListImportComponent } from './list/list-import/list-import.component';

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
  {path: 'template', component: TemplateListComponent},
      {path: 'template/create', component: TemplateCreateComponent},
  {path: 'contact', component: ContactListComponent},
    {path: 'contact/update/:id', component: ContactCreateComponent},
    {path: 'contact/create', component: ContactCreateComponent},    
    {path: 'contact/import', component: ContactImportComponent},
  {path: 'compaign', component:CompaignListComponent},
    {path: 'compaign/update/:id', component:CompaignCreateComponent},
    {path: 'compaign/create', component:CompaignCreateComponent},
  {path: 'list', component:ListIndexComponent},
    {path: 'list/update/:id', component:ListCreateComponent},
    {path: 'list/create', component:ListCreateComponent},
    {path: 'list/import', component:ListImportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
