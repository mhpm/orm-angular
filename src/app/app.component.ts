import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zero';
  counter = 0;

  increment(){
    this.counter++;
  }

  decrement(){
    this.counter--;

    if(this.counter < 1){
      this.counter = 0;
    }
  }

  resetCounter() {
    this.counter = 0;
  }
}
