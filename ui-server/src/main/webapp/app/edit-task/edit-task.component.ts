import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Task} from "../task";
import {TaskService} from "../services/task.service";

@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  @Input()
  open: boolean = false;
  @Output()
  onEdit = new EventEmitter();
  @Output()
  onClosed = new EventEmitter();
  editTask: FormGroup;
  template: Task;

  constructor(private taskService: TaskService, private formBuilder: FormBuilder) {
    this.editTask = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(32)])],
      deadline: [''],
      notes: ['', Validators.maxLength(4000)]
    });
  }

  ngOnInit() {
  }

  get f() {
    return this.editTask.controls;
  }

  @Input()
  set task(task: Task) {
    this.template = task;
    this.setForm();
  }

  private setForm() {
    if (!this.template) {
      console.log("No task to set.");
      // No task selected return
      return;
    }
    this.f.name.setValue(this.template.getName());
    this.f.name.markAsTouched();

    this.f.deadline.setValue(this.template.getDeadline());
    this.f.deadline.markAsTouched();

    this.f.notes.setValue(this.template.getNotes());
    this.f.notes.markAsTouched();
  }

  onSubmit() {
    if (!this.editTask.valid) {
      Object.keys(this.f).forEach(field => {
        const control = this.editTask.get(field);
        control.markAsTouched({onlySelf: true});
      });
      return;
    }
    let edited: Task = Task.fromJson(this.editTask.value);
    this.taskService.update(this.template.getId(), edited)
      .subscribe(data => {
        console.log("Edited task: " + data);
        this.onEdit.emit(data);
        this.closeDialog();
      }, err => {
        console.log("Http error", err);
        //this.closeDialog();
      });
  }

  private isNameInvalid() {
    return (this.f.name.dirty || this.f.name.touched) && this.f.name.invalid && this.f.name.errors;
  }

  getNameErrorMessage() {
    if (this.isNameInvalid()) {
      if (this.f.name.errors.required) {
        return "Task name is required."
      } else if (this.f.name.errors.maxLength) {
        return "Task name must be 32 characters or less."
      }
    }
    return null;
  }

  closeDialog() {
    this.open = false;
    this.onClosed.emit();
  }

  cancel() {
    this.editTask.reset();
    this.setForm();
    this.closeDialog();
  }

}
