import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskService} from "../services/task.service";

@Component({
  selector: 'delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {
  @Input()
  taskId: string;
  @Input()
  open: boolean = false;
  @Output()
  onCancel = new EventEmitter();
  @Output()
  onDelete = new EventEmitter();

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
  }

  delete() {
    console.log("deleting : " + this.taskId);
    this.taskService.delete(this.taskId)
      .subscribe(data => {
        this.onDelete.emit();
      });
  }

  cancel() {
    this.onCancel.emit();
  }

}
