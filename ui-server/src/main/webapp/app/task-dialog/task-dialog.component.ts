import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../services/task.service";

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {
  createTask: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<TaskDialogComponent>,
              private taskService: TaskService) {
  }

  ngOnInit() {
    this.createTask = this.formBuilder.group({
      name: ['', Validators.required],
      deadline: [''],
      notes: ['', Validators.maxLength(4000)]
    });
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
    this.taskService.create(this.createTask.value)
      .subscribe(data => {
        console.log("Created task: " + data);
      });
  }
}
