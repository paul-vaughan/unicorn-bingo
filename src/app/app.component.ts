import { Component } from '@angular/core';
import {interval} from 'rxjs';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular2';

  title = 'unicorn-bingo-app';

  bingoImages: string[] = [];
  selectedBingoImages: string[] = [];

  nrOffImages = 24;
  remainingNrOfImages = 24;

  currentIndex = 0;
  subscribe: any;

  running = true;

  ngOnInit() {
    console.log('loaded component');
    let i;
    for (i = 0; i < this.nrOffImages; i++) {
      console.log('added');
      this.bingoImages.push('https://raw.githubusercontent.com/paul-vaughan/unicorn-bingo/master/src/assets/unicorn/bingo_' + (1 + i) + '.png');
    }

    this.startRun();
  }

  getCurrentImage(): string {
    const index = this.currentIndex < this.remainingNrOfImages ? this.currentIndex
      : this.remainingNrOfImages - 1;
    return this.bingoImages[index];
  }

  next(): void {
    if (this.remainingNrOfImages === 0) {
      return;
    }

    if (this.running) {
      this.subscribe.unsubscribe();
      this.selectedBingoImages.push(this.getCurrentImage());
    } else {
      this.removeCurrent();
      if(this.remainingNrOfImages > 1) {
        this.startRun();
      }else {
        this.selectedBingoImages.push(this.getCurrentImage());
      }
    }
    this.running = !this.running;
  }

  reset() {
    this.bingoImages = [];
    this.nrOffImages = 24;
    this.remainingNrOfImages = 24;
    let i;
    for (i = 0; i < this.nrOffImages; i++) {
      console.log('added');
      this.bingoImages.push('/assets/unicorn/bingo_' + (1 + i) + '.png');
    }
    this.selectedBingoImages = [];
  }

  removeCurrent(): void {
    const current = [];
    let i;

    for (i = 0; i < this.remainingNrOfImages; i++) {
      console.log('added');
      if (this.bingoImages[i] !== this.getCurrentImage()) {
        current.push(this.bingoImages[i]);
      }
    }
    this.bingoImages = current;
    this.remainingNrOfImages--;

  }


  startRun() {
    const source = interval(50);
    this.subscribe = source.subscribe(val => this.currentIndex = val % this.remainingNrOfImages);
  }
}
