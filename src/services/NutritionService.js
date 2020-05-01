import {HEROKU_SERVER_URL} from "../common/constant";

export const findNutrition = async (rid) =>
    await fetch(`${HEROKU_SERVER_URL}/recipes/${rid}/nutrition`).then(response => response.json());

export const createNutrition= (rid) =>
    fetch(`${HEROKU_SERVER_URL}/recipes/${rid}/nutrition`, {
        method: 'POST',
        body: JSON.stringify({nutritionDetail: ""}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());


export const updateNutrition= (rid, nutrition) =>
    fetch(`${HEROKU_SERVER_URL}/recipes/${rid}/nutrition`, {
        method: 'PUT',
        body: JSON.stringify(nutrition),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());
