import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignComponent } from './sign/sign.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { TemplateCompComponent } from './compaign/template-comp/template-comp.component';
import { CompaignPublishComponent } from './compaign/compaign-publish/compaign-publish.component';
import { EditorComponent } from './editor/editor.component';
import { SettingsListComponent } from './settings/settings-list/settings-list.component';
import { SettingsCreateComponent } from './settings/settings-create/settings-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'template', component: TemplateListComponent, canActivate: [AuthGuard] },
  { path: 'template/create', component: TemplateCreateComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactListComponent, canActivate: [AuthGuard] },
  { path: 'contact/update/:id', component: ContactCreateComponent, canActivate: [AuthGuard]},
  { path: 'contact/create', component: ContactCreateComponent , canActivate: [AuthGuard]},
  { path: 'contact/import', component: ContactImportComponent, canActivate: [AuthGuard] },
  { path: 'compaign', component: CompaignListComponent , canActivate: [AuthGuard]},
  { path: 'compaign/update/:id', component: CompaignCreateComponent , canActivate: [AuthGuard]},
  { path: 'compaign/create', component: CompaignCreateComponent , canActivate: [AuthGuard]},
  { path: 'compaign/template/:id', component: TemplateCompComponent , canActivate: [AuthGuard]},
  { path: 'compaign/publish/:id', component: CompaignPublishComponent , canActivate: [AuthGuard]},
  { path: 'compaign/editor/:id', component: EditorComponent , canActivate: [AuthGuard]},
  { path: 'list', component: ListIndexComponent , canActivate: [AuthGuard]},
  { path: 'list/update/:id', component: ListCreateComponent , canActivate: [AuthGuard]},
  { path: 'list/create', component: ListCreateComponent, canActivate: [AuthGuard] },
  { path: 'list/import', component: ListImportComponent, canActivate: [AuthGuard]},
  { path: 'pagination', component: PaginationComponent, canActivate: [AuthGuard]},
  { path: 'subscription', component: SubscriptionComponent, canActivate: [AuthGuard]},
  { path: 'setting', component: SettingsListComponent, canActivate: [AuthGuard] },
  { path: 'setting/create', component: SettingsCreateComponent, canActivate: [AuthGuard] },
  { path: 'setting/update/:id', component: SettingsCreateComponent, canActivate: [AuthGuard] },
  { path: '**', component: NoPageComponent , canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
