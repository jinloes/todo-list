import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../services/task.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  @Input()
  taskSelect: EventEmitter<string>;
  @Output()
  tasksModified = new EventEmitter();
  cloneOpen = false;
  deleteOpen = false;
  editOpen = false;
  task: Task;


  constructor(private taskService: TaskService, private route: ActivatedRoute, private location: Location) {
    this.route.paramMap.subscribe(params => {
      let taskId = params.get('id');
      if (!taskId) {
        console.log("Task id is null not fetching task");
        return;
      }
      this.loadTask(taskId);
    });
  }

  ngOnInit() {
    this.taskSelect.subscribe(taskId => {
      this.loadTask(taskId);
    });
  }

  private loadTask(taskId: string) {
    this.taskService.getTask(taskId)
      .subscribe(task => {
        console.log(task);
        this.task = task;
      }, error => {
        console.log(error);
        if (error.httpStatus === 404) {
          this.location.go("/tasks")
        }
      });
  }

  ngOnDestroy() {
    this.taskSelect.unsubscribe()
  }

  openClone() {
    this.cloneOpen = !this.cloneOpen;
  }

  openDelete() {
    this.deleteOpen = !this.deleteOpen;
  }

  openEdit() {
    this.editOpen = !this.editOpen;
  }

  handleDialogClosed(event) {
    this.cloneOpen = false;
  }

  handleCreated(task: Task) {
    this.location.replaceState("/tasks/" + task.getId());
    this.tasksModified.emit();
    this.loadTask(task.getId());
  }

  handleDelete(event: any) {
    this.task = null;
    this.tasksModified.emit();
    this.location.go("/tasks");
    this.deleteOpen = false;
  }

  handleDeleteCancel(event: any) {
    this.deleteOpen = false;
  }

  handleEditCancel(event: any) {
    this.editOpen = false;
  }

  handleEdit(task: Task) {
    this.handleCreated(task);
  }
}
