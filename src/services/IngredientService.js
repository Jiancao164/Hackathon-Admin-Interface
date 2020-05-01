import {HEROKU_SERVER_URL} from "../common/constant";

export const findIngredients = async (rid) =>
    await fetch(`${HEROKU_SERVER_URL}/recipes/${rid}`).then(response => response.json());

export const createIngredient= (rid) =>
    fetch(`${HEROKU_SERVER_URL}/recipes/${rid}`, {
        method: 'POST',
        body: JSON.stringify({ingredientDetail: ""}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());


export const updateIngredients= (rid, ingredients) =>
    fetch(`${HEROKU_SERVER_URL}/recipes/${rid}`, {
        method: 'PUT',
        body: JSON.stringify(ingredients),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
