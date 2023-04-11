import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { CKEditorModule } from 'ng2-ckeditor';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule, NgxUiLoaderConfig,SPINNER, POSITION, PB_DIRECTION, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'; // pagination import 

import { AppComponent } from './app.component';
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

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  // bgsOpacity: 0.5,
  // bgsPosition: POSITION.bottomLeft,
  // bgsSize: 60,
  // bgsType: SPINNER.chasingDots,
  // blur: 5,
  // delay: 0,
  fastFadeOut: true,
  fgsColor: 'red',
  // fgsPosition: POSITION.centerCenter,
  // fgsSize: 60,
  // fgsType: SPINNER.chasingDots,
  // gap: 24,
  // logoPosition: POSITION.centerCenter,
  // logoSize: 120,
  // logoUrl: 'assets/angular.png',
  // overlayBorderRadius: '0',
  // overlayColor: 'rgba(40, 40, 40, 0.8)',
  pbColor: 'red'
  // pbDirection: PB_DIRECTION.leftToRight,
  // pbThickness: 5,
  // hasProgressBar: false,
  // text: 'Welcome to ngx-ui-loader',
  // textColor: '#FFFFFF',
  // textPosition: POSITION.centerCenter,
  // maxTime: -1,
  // minTime: 500
};
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
    UsersComponent,
    TemplateListComponent,
    TemplateCreateComponent,
    ContactListComponent,
    ContactCreateComponent,
    ContactImportComponent,
    CompaignListComponent,
    CompaignCreateComponent,
    ListIndexComponent,
    ListCreateComponent,
    ListImportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatButtonModule,
    CKEditorModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgxPaginationModule, // pagination ---
 
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule, // import this module for showing loader automatically when navigating between app routes
    NgxUiLoaderHttpModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
