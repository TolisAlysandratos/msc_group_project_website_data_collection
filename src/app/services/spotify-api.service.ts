import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { DataColl } from './album-interface';
import { Observable } from 'rxjs/Observable';
import { EventEmitter } from '@angular/core';


@Injectable()
export class SpotifyAPIService {
  private client_id = '780a86aafb444d96aef50b9be3eee94f';
  private client_secret = 'a15377f816384271ab977c776fcd4839';
  private accessToken: any;
  tokenStartPos: number;
  tokenEndPos: number;
  tokenParsedEvent: EventEmitter<any> = new EventEmitter();

  constructor(private http: Http) { }

  parseToken(url: string) {
    this.tokenStartPos = url.indexOf("access_token=") + 13;
    this.tokenEndPos = url.indexOf("&", this.tokenStartPos);
    this.accessToken = url.substring(this.tokenStartPos, this.tokenEndPos);
    this.tokenParsedEvent.emit();
  }

  // Fetches data collection playlist from Spotify and returns JSON with info
  getPlaylist() {
    const options = this.getOptions();
    return this.http.get(
          `https://api.spotify.com/v1/users/12143462047/playlists/5OyqCNB7HnDngYbZo6AkH2/tracks`, options)
      .map(res => res.json())
  }

  // Sends Valence/Arousal user input for a track to the back-end
  pushData(trackData: DataColl) {
    const options = this.postOptions();
    this.http.post(`https://mmapl.azurewebsites.net/api/songs`,
                    JSON.stringify(trackData), options)
            .subscribe(res => { });
  }

  // Returns GET request options as a RequestOptions object
  private getOptions() {
    let header = new Headers();
    header.append('Authorization', 'Bearer ' + this.accessToken);
    let options = new RequestOptions({ headers: header });

    return options;
  }

  // Returns POST request options as a RequestOptions object
  private postOptions() {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: header });

    return options;
  }
}
