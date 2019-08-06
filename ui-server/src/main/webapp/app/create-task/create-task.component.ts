import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Task} from "../task";
import {TaskService} from "../services/task.service";

@Component({
  selector: 'create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateTaskComponent implements OnInit {
  @Input()
  open: boolean = false;
  @Output()
  onCreate = new EventEmitter();
  @Output()
  onClosed = new EventEmitter();
  createTask: FormGroup;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService) {
    this.createTask = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(32)])],
      deadline: [''],
      notes: ['', Validators.maxLength(4000)]
    });
  }

  ngOnInit() {
  }

  get f() {
    return this.createTask.controls;
  }

  get isNameInvalid() {
    return (this.f.name.dirty || this.f.name.touched) && this.f.name.invalid && this.f.name.errors;
  }

  closeDialog() {
    this.open = false;
    this.onClosed.emit();
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
    this.taskService.create(task)
      .subscribe(data => {
        console.log("Created task: " + data);
        this.createTask.reset();
        this.onCreate.emit(data);
        this.closeDialog();
      }, err => {
        console.log("Http error", err);
      });
  }

  cancel() {
    this.createTask.reset();
    this.closeDialog();
  }
}
