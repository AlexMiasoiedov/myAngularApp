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
  colors: Array<string> = ['green', 'red'];
  toggleColorText: string = 'resume';

  startColorSemaphore(): void {
    this.stopColorSemaphore();

    this.timeoutId = setInterval(() => {
        if (this.counter == this.colors.length - 1) { this.counter = 0 }
        else { this.counter += 1 }

        this.myColor = this.colors[this.counter]
        this.toggleColorText = 'pause';
      }, 1200);
  }

  stopColorSemaphore(): void {
    if (this.timeoutId != null) {
      clearInterval(this.timeoutId);
      this.timeoutId = null;
      this.toggleColorText = 'resume';
    }
  }

  toggleColorSemaphore(): void {
    if (this.timeoutId != null) {
      this.stopColorSemaphore();
    } else {
      this.startColorSemaphore();
    }
  }

  addNewColor(newColorClass: null | string): void {
    if (newColorClass === null) { return }

    this.colors.push(newColorClass);
  }

  resetColor(): void {
    this.myColor = this.startColor;
  }

  forceStartColor(): void {
    this.stopColorSemaphore();
    this.myColor = this.startColor;
  }

  releaseStartColor(): void {
    console.log('releaseStartColor')
    this.myColor = this.colors[this.counter];
    this.startColorSemaphore();
  }

  constructor() {
    this.startColorSemaphore();
  }
}
