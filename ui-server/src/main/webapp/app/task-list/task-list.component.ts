import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {TaskService} from "../services/task.service";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";
import {MatDialog} from "@angular/material";
import {Task} from '../task';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  checkAll = false;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService, private dialog: MatDialog) {
    this.createTask = this.formBuilder.group({
      name: ['', Validators.required],
      deadline: [''],
      notes: ['', Validators.maxLength(4000)]
    });
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.taskService.getTasks()
      .subscribe(resp => {
        console.log(resp);
        this.extractData(resp);
      });
  }

  openNew() {
    let dialogRef = this.dialog.open(TaskDialogComponent);
    const sub = dialogRef.componentInstance.onAdd.subscribe(() => {
      this.reloadData();
    });
  }

  extractData(data) {
    this.taskList = data['_embedded']['todos'];
    this.pageNum = data['page']['number'] + 1;
    this.totalPages = data['page']['totalPages'];
    this.totalTasks = data['page']['totalElements'];
    this.timestamp = new Date().toISOString();
  }

  check(row) {
    row.checked = !row.checked;
  }

  toggleCheckAll() {
    this.checkAll = !this.checkAll;
    this.taskList.forEach(task => task.checked = this.checkAll);
  }
}
