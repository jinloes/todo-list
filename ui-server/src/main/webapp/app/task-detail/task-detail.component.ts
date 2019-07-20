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
  task: Task;


  constructor(private taskService: TaskService, private route: ActivatedRoute, private location: Location) {
    this.route.paramMap.subscribe(params => {
      let taskId = params.get('id');
      if (!taskId) {
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
      })
  }

  ngOnDestroy() {
    this.taskSelect.unsubscribe()
  }

  openClone() {
    this.cloneOpen = !this.cloneOpen;
  }

  handleDialogClosed(event) {
    this.cloneOpen = false;
  }

  handleCreated(task: Task) {
    this.location.replaceState("/tasks/" + task.getId());
    this.tasksModified.emit();
    this.loadTask(task.getId());
  }
}
