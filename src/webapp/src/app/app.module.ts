import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmptyPageComponent } from './empty-page/empty-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import {MatMenuModule} from '@angular/material/menu';
import { ArticleComponent } from './article/article/article.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AddGenreComponent } from './genre/add-genre/add-genre.component';
import { ModifyGenreComponent } from './genre/modify-genre/modify-genre.component';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { ModifyArticleComponent } from './article/modify-article/modify-article.component';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AngularMarkdownEditorModule } from 'angular-markdown-editor';

@NgModule({
  declarations: [
    AppComponent,
    EmptyPageComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    ArticleComponent,
    AdminPanelComponent,
    AddGenreComponent,
    ModifyGenreComponent,
    AddArticleComponent,
    ModifyArticleComponent,
    ArticleListComponent,
    ManageUsersComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatInputModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularMarkdownEditorModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class AppModule { }
