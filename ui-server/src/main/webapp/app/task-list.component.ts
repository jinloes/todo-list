import {Observable} from "rxjs";
import {Component, OnInit} from "@angular/core";
import {Task} from './task';
import {TaskService} from "./services/task.service";
import {TaskDialogComponent} from "./task-dialog/task-dialog.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: []
})
export class TaskListComponent implements OnInit {
  tasks: Observable<any>;

  constructor(private taskService: TaskService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.tasks = this.taskService.getTasks();
  }

  openNew() {
    let dialogRef = this.dialog.open(TaskDialogComponent);
  }
}
