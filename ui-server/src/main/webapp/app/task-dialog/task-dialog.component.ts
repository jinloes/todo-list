import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../services/task.service";
import {Task} from '../task';

@Component({
  selector: 'task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TaskDialogComponent implements OnInit {
  @Input()
  open: boolean = false;
  @Input()
  id: string;
  @Input()
  name: string;
  @Input()
  deadline: Date;
  @Input()
  notes: string;
  @Input()
  action: string;
  @Input()
  dialogHeader = 'Title';
  @Output()
  onTaskEvent = new EventEmitter();
  @Output()
  onDialogClosed = new EventEmitter();
  createTask: FormGroup;
  showToday = true;
  format = 'middle-endian';

  constructor(private formBuilder: FormBuilder, private taskService: TaskService) {
  }

  ngOnInit() {
    this.createTask = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(32)])],
      deadline: [''],
      notes: ['', Validators.maxLength(4000)]
    });
  }

  closeDialog() {
    this.onDialogClosed.emit();
    this.onTaskEvent.emit({"type": "dialog-closed"});
    this.open = false;
  }

  get f() {
    return this.createTask.controls;
  }

  get isNameInvalid() {
    return (this.f.name.dirty || this.f.name.touched) && this.f.name.invalid && this.f.name.errors;
  }

  onSubmit() {
    if (!this.createTask.valid) {
      Object.keys(this.f).forEach(field => {
        const control = this.createTask.get(field);
        control.markAsTouched({onlySelf: true});
      });
      return;
    }
    let task: Task = Task.fromJson(this.createTask.value);
    switch (this.action) {
      case 'edit':
        this.taskService.update(this.id, task)
          .subscribe(data => {
            //this.templateTask.copy(task);
            console.log("Updated task: " + data);
            this.onSuccessChange();
            this.closeDialog();
          }, err => {
            console.log("Http error", err);
            this.closeDialog();
          });
        break;
      case 'clone':
        Object.keys(this.f).forEach(field => {
          const control = this.createTask.get(field);
          control.markAsTouched({onlySelf: true});
        });
        let clone = Task.of(this.name, this.deadline, this.notes);
        this.create(clone);
        break;
      default:
        this.create(task);
        this.createTask.reset();
    }
  }

  cancel() {
    this.closeDialog();
  }

  private create(task: Task) {
    this.taskService.create(task)
      .subscribe(data => {
        console.log("Created task: " + data);
        this.onSuccessChange();
        this.closeDialog();
      }, err => {
        console.log("Http error", err);
        this.closeDialog();
      });
  }

  private onSuccessChange() {
    this.createTask.reset();
    this.onTaskEvent.emit({"type": "create", "status": "success"});
  }

  handleOpenChange(event) {
    this.cancel();
  }
}
