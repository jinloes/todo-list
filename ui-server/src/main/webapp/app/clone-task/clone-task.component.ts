import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {TaskService} from "../services/task.service";
import {Task} from "../task";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'clone-task',
  templateUrl: './clone-task.component.html',
  styleUrls: ['./clone-task.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CloneTaskComponent implements OnInit {
  @Input()
  open: boolean = false;
  @Output()
  onCreate = new EventEmitter();
  @Output()
  onClosed = new EventEmitter();
  cloneTask: FormGroup;
  template: Task;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService) {
    this.cloneTask = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(32)])],
      deadline: ['', this.deadlineValidator],
      notes: ['', Validators.maxLength(4000)]
    });
  }

  ngOnInit() {
  }

  get f() {
    return this.cloneTask.controls;
  }

  private isNameInvalid() {
    return (this.f.name.dirty || this.f.name.touched) && this.f.name.invalid && this.f.name.errors;
  }

  closeDialog() {
    this.open = false;
    this.onClosed.emit();
  }

  onSubmit() {
    if (!this.cloneTask.valid) {
      Object.keys(this.f).forEach(field => {
        const control = this.cloneTask.get(field);
        control.markAsTouched({onlySelf: true});
      });
      return;
    }
    let clone: Task = Task.fromJson(this.cloneTask.value);
    this.taskService.create(clone)
      .subscribe(data => {
        console.log("Created task: " + data);
        this.onCreate.emit(data);
        this.closeDialog();
      }, err => {
        console.log("Http error", err);
        //this.closeDialog();
      });
  }

  cancel() {
    this.setForm();
    this.closeDialog();
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
    this.f.name.setValue(("Copy of " + this.template.getName())
      .substr(0, 32));
    this.f.name.markAsTouched();

    this.f.deadline.setValue(this.template.getDeadline());
    this.f.deadline.markAsTouched();

    this.f.notes.setValue(this.template.getNotes());
    this.f.notes.markAsTouched();
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

  private isDeadlineInvalid() {
    return (this.f.deadline.dirty || this.f.deadline.touched) && this.f.deadline.invalid && this.f.deadline.errors;
  }

  getDeadlineErrorMessage() {
    if (this.isDeadlineInvalid()) {
      if (this.f.deadline.errors.deadline) {
        return "Date does not match the supported format: MM/dd/yyyy";
      }
    }
    return null;
  }

  deadlineValidator(control: FormControl) {
    let deadline = control.value;
    if (deadline) {
      if ("Invalid Date" === new Date(deadline).toString()) {
        return {deadline: deadline};
      }
      return null;
    }
    return null;
  }
}
