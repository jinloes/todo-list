import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TaskListComponent} from "./task-list/task-list.component";
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HomeComponent} from './home/home.component';
import {AlertComponent} from './alert/alert.component';
import {TaskDialogComponent} from './task-dialog/task-dialog.component';
import {MatDialogModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TaskHttpInterceptor} from "./task-http-interceptor.service";
import {TimeAgoPipe} from "time-ago-pipe";
import {NglModule} from "ng-lightning";
import {TaskDetailComponent} from './task-detail/task-detail.component';
import { MountainImgComponent } from './mountain-img/mountain-img.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CloneTaskComponent } from './clone-task/clone-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent,
    TaskDialogComponent,
    TimeAgoPipe,
    TaskDetailComponent,
    MountainImgComponent,
    CreateTaskComponent,
    CloneTaskComponent,
    DeleteTaskComponent,
    EditTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NglModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TaskHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    TaskDialogComponent
  ]
})
export class AppModule {
}
