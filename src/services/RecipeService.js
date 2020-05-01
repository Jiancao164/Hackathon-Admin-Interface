import {HEROKU_SERVER_URL} from "../common/constant";

export const findRecipes = async () =>
    await fetch(`${HEROKU_SERVER_URL}/recipes`).then(response => response.json());

export const findRecipeById = async (rid) =>
    await fetch(`${HEROKU_SERVER_URL}/recipes/${rid}/url`).then(response => response.json());

export const updateRecipe= (rid, recipe) =>
    fetch(`${HEROKU_SERVER_URL}/recipes/${rid}/url`, {
        method: 'PUT',
        body: JSON.stringify(recipe),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());

export const createRecipe = () =>
    fetch(`${HEROKU_SERVER_URL}/recipes`, {
        method: 'POST',
        body: JSON.stringify(""),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());

export const deleteRecipe = (rid) =>
    fetch(`${HEROKU_SERVER_URL}/recipes/${rid}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
    }).then(response => response.json());