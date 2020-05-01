import React, {Component} from 'react'
import {findRecipes} from "../services/RecipeService";
import {createIngredient, findIngredients, updateIngredients} from "../services/IngredientService";
import Process from "./Process";
import Image from "./Image";
import Info from "./Info";
import Nutrition from "./Nutrition";

export default class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients : []
        };
    }
    componentDidMount = async () => {
        await findIngredients(this.props.match.params.rid).then(results => this.setState({
            ingredients: results
        }))
    };
    addIngredients = async () => {
        await updateIngredients(this.props.match.params.rid, this.state.ingredients);
        await createIngredient(this.props.match.params.rid);
        await findIngredients(this.props.match.params.rid).then(results => this.setState({
            ingredients: results
        }))
    };

    updateIngredients = async () => {
        await updateIngredients(this.props.match.params.rid, this.state.ingredients);
    };

    deleteIngredient = async (iid) => {
        const items = this.state.ingredients.filter(ingredient => ingredient.id !== iid);
        await this.setState({ ingredients: items });
    };


    render() {
        return(
            <div className={"container"}>
                <div>
                    <Info rid={this.props.match.params.rid}/>
                    <Nutrition rid={this.props.match.params.rid}/>
                    <h2>Ingredients</h2>
                    <ol>
                        {this.state.ingredients && this.state.ingredients.map(ingredient =>
                            <li key={ingredient.id}>
                                <div className={"row"}>
                                    <div className={"col-11"}>
                                        <input type="text"
                                               onChange={(e) => this.setState({
                                                   ingredients: this.state.ingredients.map(el => (el.id === ingredient.id ? Object.assign({}, el, { ingredientDetail: e.target.value }) : el))
                                               })}
                                               className="form-control" placeholder="new ingredient" aria-label="Username"
                                               value={ingredient.ingredientDetail} aria-describedby="basic-addon1"/>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => this.deleteIngredient(ingredient.id)}
                                            className={"btn btn-danger"}>X</button>
                                    </div>
                                </div>
                                <br/>
                            </li>
                        )}
                    </ol>
                    <button
                        onClick={this.addIngredients}
                        className={"btn btn-success"}>+</button>
                </div>
                <button
                    onClick={this.updateIngredients}
                    className={"btn btn-success btn-block"}>Save</button>
                <hr/>
                <div>
                    <Process rid={this.props.match.params.rid}/>
                </div>
                <hr/>
                <div>
                    <Image rid={this.props.match.params.rid}/>
                </div>

            </div>
        )
    }
}

