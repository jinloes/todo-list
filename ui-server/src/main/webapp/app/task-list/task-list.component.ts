import {Component, EventEmitter, OnInit, ViewEncapsulation} from "@angular/core";
import {TaskService} from "../services/task.service";
import {Task} from '../task';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from '@angular/common';

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class TaskListComponent implements OnInit {
  createTask: FormGroup;
  taskList: Task[];
  pageNum: number;
  totalPages: number;
  totalTasks: number;
  timestamp: string;
  taskDialogOpened = false;
  onTaskSelect = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder, private taskService: TaskService, private location: Location) {
    this.createTask = this.formBuilder.group({
      name: ['', Validators.required],
      deadline: [''],
      notes: ['', Validators.maxLength(4000)]
    });

  }

  ngOnInit() {
    this.reloadData();
  }

  handleCreated(task: Task) {
    this.setSelected(task);
    this.reloadData();
  }

  reloadData() {
    this.taskService.getTasks()
      .subscribe(resp => {
        console.log(resp);
        this.extractData(resp);
      });
  }

  openTaskDialog() {
    this.taskDialogOpened = !this.taskDialogOpened;
  }

  extractData(data) {
    this.taskList = (<JSON[]>data['_embedded']['todos']).map(json => Task.fromJson(json));
    this.pageNum = data['page']['number'] + 1;
    this.totalPages = data['page']['totalPages'];
    this.totalTasks = data['page']['totalElements'];
    this.timestamp = new Date().toISOString();
  }

  setSelected(task: Task) {
    this.location.replaceState("/tasks/" + task.getId());
    this.onTaskSelect.emit(task.getId())
  }

  handleClosed() {
    this.taskDialogOpened = false;
  }

  handleTasksModified() {
    this.reloadData()
  }
}
