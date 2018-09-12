# Group Project - "Moodify" Website (data collection)
MSc Computing Science - Imperial College London

This is the (separate) data collection front end used to collect valence/arousal ratings from volunteers. The data are used in the web app of our Group Project. The data collection app implements a player choosing random Spotify tracks from our playlists. The users can use two sliders to set their desired valence/arousal values for each song before submitting, or skip/play/pause a track. There is also a timer and a description included.

The main web app generates Spotify music playlists based on the user's mood. The user chooses up to three emojis reflecting their mood. The back end returns a number adjectives related to those emojis. The user can select up to three adjectives too. The app then generates a Spotify playlist containing tracks which reflect the chosen "moods".

Valence and arousal values are used to create the connection between adjectives and playlist tracks. The emojis/adjectives are associated with valence and arousal values found in psychological studies. The spotify tracks in our database are rated by volunteer users in valence/arousal terms using this data collection website.

## Product

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Screenshots

![Alt text](./data.png?raw=true "data")

