import { TestBed, async } from '@angular/core/testing';
import { SliderComponent } from './components/slider/slider.component';
import { NouisliderModule } from 'ng2-nouislider';
import { SpotifyAudioService } from './services/spotify-audio.service';
import { SpotifyAPIService } from './services/spotify-api.service';
import { HttpModule } from '@angular/http';
import { ValenceArousalService } from './services/valence-arousal.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { SimpleTimer } from 'ng2-simple-timer';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fix;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NouisliderModule,
        HttpModule
      ],
      declarations: [
        AppComponent,
        SliderComponent
      ],
      providers: [
        SpotifyAudioService,
        SpotifyAPIService,
        ValenceArousalService,
        SimpleTimer
      ]
    }).compileComponents().then(() => {
      fix = TestBed.createComponent(AppComponent);
    });
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'moodify.'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('moodify.');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('moodify.');
  }));

  it('should change button label to PAUSE', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    app.togglePlayPauseLabel();
    expect(app.playPauseLabel).toEqual(app.pauseLabel);
  }));

  it('should change button label to PLAY', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    app.playPauseLabel = app.pauseLabel;
    app.togglePlayPauseLabel();
    expect(app.playPauseLabel).toEqual(app.playLabel);
  }));

  it('should change button label to TICK', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    app.toggleSubmitTickLabel();
    expect(app.submitTickLabel).toEqual(app.tickLabel);
  }));

  it('should change button label to SUBMIT', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    app.submitTickLabel = app.tickLabel;
    app.toggleSubmitTickLabel();
    expect(app.submitTickLabel).toEqual(app.submitLabel);
  }));

  it('should store object from http.get to playlist', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.getPlaylist();
    expect(app.playlist.items[0].track.name).toEqual("Hysteria");
  }));

  it('should change the counter0 state', async(() => {
    fix.detectChanges();
    const app = fix.debugElement.componentInstance;
    app.getPlaylist();
    app.loaded = true;
    app.counter0 = 1;
    app.getPlaylist();
    expect(app.counter0).toEqual(0);
  }));

  it('should change the endOfTrack value', async(() => {
    fix.detectChanges();
    const app = fix.debugElement.componentInstance;
    app.getPlaylist();
    app.loaded = true;
    app.endOfTrack = true;
    app.getPlaylist();
    expect(app.endOfTrack).toEqual(false);
  }));

  it('should store playlist data in playlistData', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    app.getPlaylist();
    expect(app.playlistData[app.counter]).not.toBe({});
  }));

  it('should set endOfTrack to true and counter0 to 30', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    app.counter0 = 31;
    app.endOfTrack = false;
    app.timer0callback();
    expect(app.endOfTrack).toBe(true);
    expect(app.counter0).toEqual(30);
  }));

  it('should set counter0 to 30', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    app.counter0 = 31;
    app.endOfTrack = true;
    app.timer0callback();
    expect(app.endOfTrack).toBe(true);
    expect(app.counter0).toEqual(30);
  }));

  it('should increment counter0', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    app.counter0 = 0;
    app.timer0callback();
    expect(app.counter0).toEqual(1);
  }));

  it('should increment counter0', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    app.counter0 = 3;
    app.submitTickLabel = app.tickLabel;
    app.timer0callback();
    expect(app.counter0).toEqual(4);
  }));

  it('should play the track given the url', async(() => {
    fix.detectChanges();
    const app = fix.debugElement.componentInstance;
    app.playPauseSong();
    expect(app.counter0).toEqual(0);
  }));

  it('should skip to the next track', async(() => {
    fix.detectChanges();
    const app = fix.debugElement.componentInstance;
    app.getPlaylist();
    app.skipSong();
    expect(app.counter).toEqual(1);
  }));

  it('should NOT skip to the next track', async(() => {
    fix.detectChanges();
    const app = fix.debugElement.componentInstance;
    app.getPlaylist();
    app.loaded = false;
    app.counter0 = 1;
    app.skipSong();
    expect(app.counter0).toEqual(1);
  }));

  it('should set endOfTrack to false', async(() => {
    fix.detectChanges();
    const app = fix.debugElement.componentInstance;
    app.getPlaylist();
    app.endOfTrack = true;
    app.skipSong();
    expect(app.endOfTrack).toBe(false);
  }));

  it('should subscribe timer', async(() => {
    fix.detectChanges();
    const app = fix.debugElement.componentInstance;
    app.getPlaylist();
    app.timer0Id = undefined;
    app.skipSong();
    expect(app.timer0Id).not.toBe(undefined);
  }));

  it('should push the track data by calling the SpotifyAPIService', async(() => {
    fix.detectChanges();
    const app = fix.debugElement.componentInstance;
    app.getPlaylist();
    app.submitData();
    expect(app.counter).toEqual(1);
  }));

  it('should NOT push the track data by calling the SpotifyAPIService', async(() => {
    fix.detectChanges();
    const app = fix.debugElement.componentInstance;
    app.getPlaylist();
    app.loaded = false;
    app.counter0 = 1;
    app.submitData();
    expect(app.counter0).toEqual(1);
  }));

  it('should set endOfTrack to false', async(() => {
    fix.detectChanges();
    const app = fix.debugElement.componentInstance;
    app.getPlaylist();
    app.endOfTrack = true;
    app.submitData();
    expect(app.endOfTrack).toBe(false);
  }));

  it('should subscribe timer', async(() => {
    fix.detectChanges();
    const app = fix.debugElement.componentInstance;
    app.getPlaylist();
    app.timer0Id = undefined;
    app.submitData();
    expect(app.timer0Id).not.toBe(undefined);
  }));

  it('should NOT store any more track data', async(() => {
    fix.detectChanges();
    const app = fix.debugElement.componentInstance;
    app.getPlaylist();
    app.counter = app.playlist.items.length;
    app.collectData();
    expect(app.counter).toEqual(app.playlist.items.length);
  }));

});
