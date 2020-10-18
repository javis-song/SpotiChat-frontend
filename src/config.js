export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = "8ea552fc8aa94118b9bc8b332f4932d2";
export const redirectUri = "http://localhost:3000";
export const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-modify-playback-state",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-email",
    "user-read-private",
    "user-library-modify"
];
