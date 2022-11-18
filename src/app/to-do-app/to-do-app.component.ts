import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Itask } from '../model/Itask';

@Component({
  selector: 'app-to-do-app',
  templateUrl: './to-do-app.component.html',
  styleUrls: ['./to-do-app.component.scss']
})
export class ToDoAppComponent implements OnInit {

  toDoApp !: FormGroup;
  task: Itask[] = [];
  inProgress: Itask[] = [];
  done: Itask[] = [];
  updateIndex: any;
  isEditEnabled: boolean = false;
  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.toDoApp = this.formbuilder.group({
      taskName: ['', Validators.required]
    })
  }

  drop(event: CdkDragDrop<Itask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addTask(){
    this.task.push({
      description: this.toDoApp.value.taskName,
      done: false
    })
    this.toDoApp.reset();
  }

  deleteTask(deleteTheTask:number){
    this.task.splice(deleteTheTask,1)
  }

  deleteInprogress(deleteTheTask:number){
    this.inProgress.splice(deleteTheTask,1)
  }

  deleteDoneTask(deleteTheTask: number){
    this.done.splice(deleteTheTask,1)
  }

  onEditTask(item: Itask,i: number){
    this.toDoApp.controls['taskName'].setValue(item.description)
    this.updateIndex = i;
    this.isEditEnabled = true
  }

  updateTask(){
    this.task[this.updateIndex].description = this.toDoApp.value.taskName;
    // this.task[this.updateIndex].done = false;
    this.isEditEnabled = false;
    this.updateIndex = undefined;
    this.toDoApp.reset();
  }

}

