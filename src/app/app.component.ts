import { Http } from '@angular/http';
import { SliderComponent } from './components/slider/slider.component';
import { Component, OnDestroy } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { SpotifyAudioService } from './services/spotify-audio.service';
import { SpotifyAPIService } from './services/spotify-api.service';
import { Subscription } from 'rxjs';
import { Track, DataColl } from './services/album-interface';
import { ValenceArousalService } from './services/valence-arousal.service';
import { SimpleTimer } from 'ng2-simple-timer';

@Component({
  selector: 'app-root',
  template:
     `<div class="container">
        <h1>{{title}}</h1>
        <h2>Listen.</h2>
        <button id="playbtn" type="button" class="btn btn-success btn-lg"
            (click)="getPlaylist()">{{playPauseLabel}}</button>
        <p id="timer">{{counter0}} sec / 30 sec </p>
        <p class="lead">Rate the track using the valence and arousal sliders.</p>
        <div>
          <app-slider></app-slider>
        </div>
        <p></p>
        <button id="submit_btn" type="button" class="btn btn-default btn-lg"
                (click)="submitData()">{{submitTickLabel}}</button>
        <button type="button" class="btn btn-secondary btn-sm"
                (click)="skipSong()">Skip</button>
        <p></p>
        <div class="container">
          <p>Click for definitions of valence and arousal.</p>
          <button id="desc_button" type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo">Help!</button>
          <div id="demo" class="collapse">
              Valence: The 'goodness' or 'badness' of an emotion. <br/>
              Arousal: How intense the music makes you feel. <br/>
              E.g: A high-arousal, high-valence emotion may be euphoria, a neutral-arousal low-valence emotion may be sad,
              <br/> and a low-valence, low-arousal emotion may be extreme boredom.
          </div>
        </div>
      </div>
     `,
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'moodify.';
  track: Track;
  tracks: Track[];
  playlist: any = {};
  playlistData: DataColl[] = [];
  counter: number = 0;
  loaded: boolean = false;
  playLabel: string = String.fromCharCode(9658);
  pauseLabel: string = String.fromCharCode(10074) + String.fromCharCode(10074);
  playPauseLabel: string = this.playLabel;
  tickLabel: string = String.fromCharCode(10004);
  submitLabel: string = "Submit";
  submitTickLabel: string = this.submitLabel;
  counter0: number = 0;
  timer0Id: string;
  timer0button = 'Subscribe';
  endOfTrack: boolean = false;

  constructor(
    public spotifyAudio: SpotifyAudioService,
    public spotifyAPI: SpotifyAPIService,
    private valenceArousalService: ValenceArousalService,
    private st: SimpleTimer
  ) {
    spotifyAPI.tokenParsedEvent.subscribe(
      () => {
        this.getPlaylist();
      });
  }

  ngOnInit() {
    if (!window.location.href.includes("access_token")) {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=780a86aafb444d96aef50b9be3eee94f&scope=playlist-modify-public&response_type=token&redirect_uri=https:%2F%2Fmoodifydc.azurewebsites.net`;
    } else {
      this.parseToken(window.location.toString());
    }
    this.st.newTimer('1sec',1);
  }

  parseToken(url: string) {
    this.spotifyAPI.parseToken(url);
  }

  // Subscribes a new 'track playtime' timer
  subscribeTimer0() {
    if (this.timer0Id) {
      // Unsubscribe if timer Id is defined
      this.st.unsubscribe(this.timer0Id);
      this.timer0Id = undefined;
      this.timer0button = 'Subscribe';
    } else {
      // Subscribe if timer Id is undefined
      this.timer0Id = this.st.subscribe('1sec', () => this.timer0callback());
      this.timer0button = 'Unsubscribe';
    }
  }

  // Manages timer's counter
  timer0callback() {
    if (this.counter0 == 3 && this.submitTickLabel == this.tickLabel) {
      this.toggleSubmitTickLabel();
    }
    if (this.counter0 < 30) {
      this.counter0++;
    }
    else {
      this.counter0 = 30;
      if (!this.endOfTrack) {
        this.togglePlayPauseLabel();
        this.endOfTrack = true;
      }
    }
  }

  // Handles the play/pause behaviour of the Player
  // Retrieves and plays/pauses track previews using their Spotify IDs
  getPlaylist() {
    if (!this.loaded) {
      this.spotifyAPI.getPlaylist()
         .subscribe(playlist => { this.playlist = playlist; },
                    error => { console.log("Error:", error);
                               window.location.href = `https://moodifydc.azurewebsites.net/`; },
                    () => {
                            this.loaded = true;
                            this.counter = 0;
                    });
    }
    else {
      this.playPauseSong();

      if (this.endOfTrack) {
        this.subscribeTimer0();
        this.endOfTrack = false;
      }
      this.subscribeTimer0();
      this.togglePlayPauseLabel();
      this.counter0 = 0;
    }
  }

  // Stores the user's input values from the position of the sliders
  // alongside Spotify track information for the back-end
  collectData() {
    if (this.counter < this.playlist.items.length) {
      this.playlistData[this.counter] = {} as DataColl;
      this.playlistData[this.counter].spotify_id = this.playlist.items[this.counter].track.id;
      this.playlistData[this.counter].artist = this.playlist.items[this.counter].track.artists[0].name;
      this.playlistData[this.counter].song_title = this.playlist.items[this.counter].track.name;
      this.playlistData[this.counter].new_valence = this.valenceArousalService.getValence();
      this.playlistData[this.counter].new_arousal = this.valenceArousalService.getArousal();
    }
  }

  // Handles the behaviour of the 'Submit' button
  // and pushes collected data to the back-end
  submitData() {
    if (this.loaded) {
      this.collectData();
      this.spotifyAPI.pushData(this.playlistData[this.counter]);
      this.counter++;
      this.resetSlider();
      this.toggleSubmitTickLabel();
      if (this.timer0Id == undefined) {
        this.subscribeTimer0();
        this.playPauseSong();
        this.togglePlayPauseLabel();
      }
      else if (this.endOfTrack) {
        this.endOfTrack = false;
        this.togglePlayPauseLabel();
        this.playPauseSong();
      }
      else {
        this.playPauseSong();
      }
      this.counter0 = 0;
    }
  }

  // Handles the play/pause functionality of the Audio element
  playPauseSong() {
    if (this.playlist.items[this.counter].track.preview_url != null){
      this.spotifyAudio.playAudioTrack(this.playlist.items[this.counter].track.preview_url);
    }
    else {
      this.skipSong();
    }
  }

  // Handles the functionality of the 'Skip' button
  // Skips to the next track without submitting data
  skipSong() {
    if (this.playlist.items[this.counter].track.preview_url != null) {
      this.counter++;
      this.playPauseSong();
      this.resetSlider();
      if (this.timer0Id == undefined) {
        this.subscribeTimer0();
        this.togglePlayPauseLabel();
      }
      if (this.endOfTrack) {
        this.endOfTrack = false;
        this.togglePlayPauseLabel();
      }
      this.counter0 = 0;
    }
    else {
      this.counter++;
      this.playPauseSong();
    }
  }

  // Emits an event to reset sliders in the SliderComponent
  resetSlider() {
    this.valenceArousalService.resetSlidersEvent.emit();
  }

  // Toggles play/pause label of the Player button
  togglePlayPauseLabel() {
    if (this.playPauseLabel === this.playLabel) {
      this.playPauseLabel = this.pauseLabel;
    }
    else {
      this.playPauseLabel = this.playLabel;
    }
  }

  // Toggles the label of submit button ('submit'/tick)
  toggleSubmitTickLabel() {
    if (this.submitTickLabel === this.submitLabel) {
      this.submitTickLabel = this.tickLabel;
    }
    else {
      this.submitTickLabel = this.submitLabel;
    }
  }

  ngOnDestroy() {
    this.spotifyAudio.destroy();
  }

}
