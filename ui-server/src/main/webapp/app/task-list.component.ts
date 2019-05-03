import {Observable} from "rxjs";
import {Component, OnInit} from "@angular/core";
import {Task} from './task';
import {TaskService} from "./services/task.service";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: []
})
export class TaskListComponent implements OnInit {
  tasks: Observable<Task[]>;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.tasks = this.taskService.getTasks();
  }
}
