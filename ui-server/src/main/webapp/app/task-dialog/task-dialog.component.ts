import {Component, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {TaskService} from "../services/task.service";

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TaskDialogComponent implements OnInit {
  createTask: FormGroup;
  showToday = true;
  onAdd: EventEmitter<any> = new EventEmitter();
  opened = false;
  directional = false;
  dismissOnClickOutside = false;
  readonlyInput = true;
  format = 'middle-endian';

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<TaskDialogComponent>,
              private taskService: TaskService) {
  }

  ngOnInit() {
    this.createTask = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(32)])],
      deadline: [''],
      notes: ['', Validators.maxLength(4000)]
    });
    this.dialogRef.afterOpened()
      .subscribe(data => {
        this.opened = true;
      })
  }

  closeDialog() {
    this.dialogRef.close();
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
    this.taskService.create(this.createTask.value)
      .subscribe(data => {
        console.log("Created task: " + data);
        this.onAdd.emit();
        this.closeDialog();
      }, err => {
        console.log("Http error", err);
        this.closeDialog();
      });
  }

  cancel() {
    this.opened = false;
  }
}
