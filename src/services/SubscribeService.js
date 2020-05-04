import {HEROKU_SERVER_URL} from "../common/constant";



export const findSubscribes = async () =>
    await fetch(`${HEROKU_SERVER_URL}/subscribes`).then(response => response.json());

export const updateCalendar= (calendar) =>
    fetch(`${HEROKU_SERVER_URL}/calendars`, {
        method: 'PUT',
        body: JSON.stringify(calendar),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());

export const findVideoById = async (vid) =>
    await fetch(`${HEROKU_SERVER_URL}/videos/${vid}`).then(response => response.json());

export const updateVideo= (vid, video) =>
    fetch(`${HEROKU_SERVER_URL}/videos/${vid}`, {
        method: 'PUT',
        body: JSON.stringify(video),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());

export const createVideo = () =>
    fetch(`${HEROKU_SERVER_URL}/videos`, {
        method: 'POST',
        body: JSON.stringify(""),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());

export const deleteVideo = (vid) =>
    fetch(`${HEROKU_SERVER_URL}/videos/${vid}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
    }).then(response => response.json());