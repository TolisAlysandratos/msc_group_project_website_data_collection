import { TestBed, inject } from '@angular/core/testing';

import { ValenceArousalService } from './valence-arousal.service';

describe('ValenceArousalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValenceArousalService]
    });
  });

  it('should create service', inject([ValenceArousalService], (service: ValenceArousalService) => {
    expect(service).toBeTruthy();
  }));

  it('should set valence to 4', inject([ValenceArousalService], (service: ValenceArousalService) => {
    service.setValence(4);
    expect(service.valence).toEqual(4);
  }));

  it('should set arousal to 4', inject([ValenceArousalService], (service: ValenceArousalService) => {
    service.setArousal(4);
    expect(service.arousal).toEqual(4);
  }));

  it('should get valence value of 0', inject([ValenceArousalService], (service: ValenceArousalService) => {
    let valence_value = service.getValence();
    expect(valence_value).toEqual(0);
  }));

  it('should get arousal value of 0', inject([ValenceArousalService], (service: ValenceArousalService) => {
    let arousal_value = service.getArousal();
    expect(arousal_value).toEqual(0);
  }));

});
