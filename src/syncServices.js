import * as $ from "jquery";

export const getDevice = (access_token) => {
    $.ajax({
        url: 'https://api.spotify.com/v1/me/player/devices',
        headers: {
        'Authorization': 'Bearer ' + access_token
        },
    }).done((data) => {
        console.log(data.devices[0].id);
    })
};

export const skipToNext = (access_token) => {
    $.ajax({
        url: 'https://api.spotify.com/v1/me/player/next',
        method: 'POST',
        headers: {
        'Authorization': 'Bearer ' + access_token
        },
    })
};
    
export const addToQueue = (access_token, uri) => {
    $.ajax({
        url: "https://api.spotify.com/v1/me/player/queue?uri=" + uri,
        method: "POST",
        headers: {
        'Authorization': 'Bearer ' + access_token
        },
    }).done(data => {
        skipToNext(access_token);
    })
};

export const getCurrentlyPlaying = (access_token) => {
    return new Promise((res, rej) => {
        $.ajax({
            url: "https://api.spotify.com/v1/me/player",
            method: "GET",
            beforeSend: xhr => {
            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
            },
        }).done(data => {
            if (data) {
                res(data.item.uri)
            }
        });
    });
};