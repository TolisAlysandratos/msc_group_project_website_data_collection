import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable()
export class ValenceArousalService {

  valence: number = 0;
  arousal: number = 0;
  resetSlidersEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  setValence(val: number) {
    this.valence = val;
    console.log("Service set valence to " + this.valence);
  }

  getValence() {
    console.log("Service sent valence of " + this.valence);
    return this.valence;
  }

  setArousal(val: number) {
    this.arousal = val;
    console.log("Service set arousal to " + this.arousal);
  }

  getArousal() {
    console.log("Service sent arousal of " + this.arousal);
    return this.arousal;
  }

}
