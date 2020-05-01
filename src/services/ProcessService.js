import {HEROKU_SERVER_URL} from "../common/constant";

export const findProcesses = async (rid) =>
    await fetch(`${HEROKU_SERVER_URL}/recipes/${rid}/steps`).then(response => response.json());

export const createProcess= (rid) =>
    fetch(`${HEROKU_SERVER_URL}/recipes/${rid}/steps`, {
        method: 'POST',
        body: JSON.stringify({ingredientDetail: ""}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());


export const updateProcess= (rid, process) =>
    fetch(`${HEROKU_SERVER_URL}/recipes/${rid}/steps`, {
        method: 'PUT',
        body: JSON.stringify(process),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
