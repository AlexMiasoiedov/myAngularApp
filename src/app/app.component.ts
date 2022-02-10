import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title: string = 'myApp';
  startColor: string = 'white';
  myColor: string = this.startColor;
  counter: number = 1;
  timeoutId: null | ReturnType<typeof setTimeout> = null;

  startColorSemaphore(): void {
    this.timeoutId = setInterval(() => {
        this.counter = (this.counter + 1) % 2

        if (this.counter == 0) { this.myColor = 'green'; }
        else { this.myColor = 'red'; }
      }, 2500);
  }

  stopColorSemaphore(): void {
    if (this.timeoutId != null) {
      clearInterval(this.timeoutId);
    }
  }

  changeStartColor(newColor: string = this.myColor): void {
    this.startColor = newColor;
  }

  rotateColor(): void {
    this.stopColorSemaphore();
    this.myColor = this.startColor;
    this.startColorSemaphore();
  }

  constructor() {
    this.startColorSemaphore()
  }
}
