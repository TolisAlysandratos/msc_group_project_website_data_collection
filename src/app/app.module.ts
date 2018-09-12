import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NouisliderModule } from 'ng2-nouislider';
import { NgModel } from '@angular/forms';
import { SimpleTimer } from 'ng2-simple-timer';
import { AppComponent } from './app.component';
import { SpotifyAPIService } from './services/spotify-api.service';
import { SpotifyAudioService } from './services/spotify-audio.service';
import { SliderComponent } from './components/slider/slider.component';
import { ValenceArousalService } from './services/valence-arousal.service';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NouisliderModule
  ],
  providers: [
    SpotifyAudioService,
    SpotifyAPIService,
    ValenceArousalService,
    SimpleTimer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
