import { Component, OnInit } from '@angular/core';
import { ValenceArousalService } from '../../services/valence-arousal.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NouiFormatter } from "ng2-nouislider/src/nouislider";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['slider.component.css']
})

export class SliderComponent {

  public disabled: boolean = false;
  public someValue: number = 5;
  public someMin: number = 0;
  public someMax: number = 8;

  valenceRange=[4];
  arousalRange=[4];

  constructor(private valenceArousalService: ValenceArousalService) {
    valenceArousalService.resetSlidersEvent.subscribe(
      () => {
        this.valenceRange=[4];
        this.arousalRange=[4];
      }
    );
  }

  saveRange(slider, value) {
    console.log('Value of ' + slider + ' slider changed to', value);
    if (slider == 'valence') { this.valenceArousalService.setValence(value); }
    else { this.valenceArousalService.setArousal(value); }
  }

  resetSlider() {
    this.valenceRange=[4];
    this.arousalRange=[4];
  }

}
