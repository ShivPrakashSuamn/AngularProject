import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignComponent } from './sign/sign.component';
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
import { PaginationComponent } from './pagination/pagination.component';
import { NoPageComponent } from './no-page/no-page.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { AuthGuard } from './_services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'category', component: CategoryListComponent, canActivate: [AuthGuard] },
  { path: 'category/create', component: CategoryCreateComponent, canActivate: [AuthGuard] },
  { path: 'template', component: TemplateListComponent, canActivate: [AuthGuard] },
  { path: 'template/create', component: TemplateCreateComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactListComponent, canActivate: [AuthGuard] },
  { path: 'contact/update/:id', component: ContactCreateComponent, canActivate: [AuthGuard]},
  { path: 'contact/create', component: ContactCreateComponent , canActivate: [AuthGuard]},
  { path: 'contact/import', component: ContactImportComponent, canActivate: [AuthGuard] },
  { path: 'compaign', component: CompaignListComponent , canActivate: [AuthGuard]},
  { path: 'compaign/update/:id', component: CompaignCreateComponent , canActivate: [AuthGuard]},
  { path: 'compaign/create', component: CompaignCreateComponent , canActivate: [AuthGuard]},
  { path: 'list', component: ListIndexComponent , canActivate: [AuthGuard]},
  { path: 'list/update/:id', component: ListCreateComponent , canActivate: [AuthGuard]},
  { path: 'list/create', component: ListCreateComponent, canActivate: [AuthGuard] },
  { path: 'list/import', component: ListImportComponent, canActivate: [AuthGuard]},
  { path: 'pagination', component: PaginationComponent, canActivate: [AuthGuard]},
  { path: 'subscription', component: SubscriptionComponent, canActivate: [AuthGuard]},
  { path: '**', component: NoPageComponent , canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
