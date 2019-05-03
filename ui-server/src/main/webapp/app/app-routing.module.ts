import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaskListComponent} from "./task-list.component";
import {AuthGuard} from "./guards/auth.guard";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
