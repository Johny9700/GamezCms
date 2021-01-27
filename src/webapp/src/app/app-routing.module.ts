import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyPageComponent } from './empty-page/empty-page.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ArticleComponent } from './article/article/article.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { ModifyArticleComponent } from './article/modify-article/modify-article.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ModifyGenreComponent } from './genre/modify-genre/modify-genre.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AuthGuardService } from './shared/auth-guard.service';

const routes: Routes = [
  { path: 'article/:article-id', component: ArticleComponent },
  { path: 'article-list', component: ArticleListComponent, canActivate: [AuthGuardService] },
  { path: 'modify-article/:article-id', component: ModifyArticleComponent, canActivate: [AuthGuardService]  },
  { path: 'add-article', component: AddArticleComponent, canActivate: [AuthGuardService]  },
  { path: 'beginning', component: EmptyPageComponent },
  { path: 'login', component: LoginComponent},
  { path: 'genre', component: ModifyGenreComponent, canActivate: [AuthGuardService]  },
  { path: 'users', component: ManageUsersComponent , canActivate: [AuthGuardService] },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]  },
  { path: 'register', component: RegisterComponent },
  { path: '', component: EmptyPageComponent },
  { path: '**', component: EmptyPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
