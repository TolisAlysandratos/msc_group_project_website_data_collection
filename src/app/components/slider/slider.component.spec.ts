import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouisliderModule } from 'ng2-nouislider';
import { ValenceArousalService } from '../../services/valence-arousal.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NouiFormatter } from "ng2-nouislider/src/nouislider";
import { SliderComponent } from './slider.component';
import { Observable } from 'rxjs/Observable';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;
  let valenceArousalStub = {
    setValence: function(val: number) {
      this.valence = val;
    },
    getValence: function() {
      return this.valence;
    },
    setArousal: function(val: number) {
      this.arousal = val;
    },
    getArousal: function() {
      return this.arousal;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NouisliderModule ],
      declarations: [ SliderComponent ],
      providers: [ ValenceArousalService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set valence to 4', () => {
    let service = TestBed.get(ValenceArousalService);
    component.saveRange('valence', 4);
    expect(service.getValence()).toEqual(4);
  });

  it('should set arousal to 4', () => {
    let service = TestBed.get(ValenceArousalService);
    component.saveRange('arousal', 4);
    expect(service.getArousal()).toEqual(4);
  });

  it('should reset slider values', () => {
    component.valenceRange = [3];
    component.arousalRange = [3];
    component.resetSlider();
    expect(component.valenceRange).toEqual([0]);
    expect(component.arousalRange).toEqual([0]);
  });


});
