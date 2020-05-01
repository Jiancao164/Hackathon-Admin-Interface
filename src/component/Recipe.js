import React, {Component} from 'react'
import {createRecipe, deleteRecipe, findRecipeById, findRecipes, updateRecipe} from "../services/RecipeService";
import {updateIngredients} from "../services/IngredientService";

export default class Recipe extends Component{
    componentDidMount = async () => {
        await findRecipes().then(results => this.setState({
                recipes: results
            }))
    };

    state = {
        recipes: [],
        editing: false,
        editId: ''
    };

    createRecipe = async () => {
        await createRecipe();
        await findRecipes().then(results => this.setState({
            recipes: results
        }))
        // this.setState({recipes: [...this.state.recipes, {title: "new recipe", url:"", preTime:"", cookingTime:"", servings:""}]})
    };

    deleteRecipe = async (rid) => {
        const items = this.state.recipes.filter(recipe => recipe.id !== rid);
        await this.setState({ recipes: items });
        await deleteRecipe(rid)
        await findRecipes().then(results => this.setState({
            recipes: results
        }))
    };

    updateRecipe = async (rid) => {
        await updateRecipe(rid, this.state.recipes.filter(el => {return el.id===rid})[0])
        this.setState({editId: ''})
    };

    render() {
        return(
            <div className={"container"}>
                <h1>
                    recipe
                </h1>
                <ul>
                    {this.state.recipes && this.state.recipes.map(recipe =>
                        <li key={recipe.id}>
                            {this.state.editId!==recipe.id && <a href={`/recipes/${recipe.id}`}>{recipe.title}</a>}
                            {this.state.editId===recipe.id &&
                            <input
                                onChange={(e) => this.setState({
                                    recipes: this.state.recipes.map(el => (el.id === recipe.id ? Object.assign({}, el, { title: e.target.value }) : el))
                                })}
                                value={recipe.title}/>}
                            {this.state.editId!==recipe.id && <i
                                onClick={() => {this.setState({editing: !this.state.editing}); this.setState({editId: recipe.id}) }}
                                className="far fa-edit fa-2x"/>}
                            {this.state.editId===recipe.id &&
                            <i
                                onClick={() => this.updateRecipe(recipe.id)}
                                className="fas fa-check fa-2x"/>}
                            <button
                                onClick={() => this.deleteRecipe(recipe.id)}
                                className={"btn btn-danger btn-recipe"}>X</button>
                        </li>
                    )}
                </ul>
                <button
                    onClick={this.createRecipe}
                    className={"btn btn-success"}>+</button>
            </div>

        )
    }
}