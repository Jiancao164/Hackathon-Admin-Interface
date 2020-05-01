import React, {Component} from 'react'
import {createNutrition, findNutrition, findNutritiones, updateNutrition} from "../services/NutritionService";
import {createIngredient, findIngredients, updateIngredients} from "../services/IngredientService";

export default class Nutrition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nutrition : []
        };
    }
    componentDidMount = async () => {
        await findNutrition(this.props.rid).then(results => this.setState({
            nutrition: results
        }))
    };

    addNutrition = async () => {
        await updateNutrition(this.props.rid, this.state.nutrition);
        await createNutrition(this.props.rid);
        await findNutrition(this.props.rid).then(results => this.setState({
            nutrition: results
        }))
    };

    updateNutrition = async () => {
        await updateNutrition(this.props.rid, this.state.nutrition);
    };

    deleteNutrition = async (iid) => {
        const items = this.state.nutrition.filter(nutrition => nutrition.id !== iid);
        await this.setState({ nutrition: items });
    };


    render() {
        return(
            <div>
                <div>
                    <h2>Nutrition</h2>
                    <ol>
                        {this.state.nutrition && this.state.nutrition.map(nutrition =>
                            <li key={nutrition.id}>
                                <div className={"row"}>
                                    <div className={"col-11"}>
                                        <input
                                            type={"text"}
                                            onChange={(e) => this.setState({
                                                nutrition: this.state.nutrition.map(el => (el.id === nutrition.id ? Object.assign({}, el, { nutritionDetail: e.target.value }) : el))
                                            })}
                                            className="form-control" placeholder="new nutrition" aria-label="Username"
                                            value={nutrition.nutritionDetail} aria-describedby="basic-addon1"/>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => this.deleteNutrition(nutrition.id)}
                                            className={"btn btn-danger"}>X</button>
                                    </div>
                                </div>
                                <br/>
                            </li>
                        )}
                    </ol>
                    <button
                        onClick={this.addNutrition}
                        className={"btn btn-success"}>+</button>
                </div>

                <button
                    onClick={this.updateNutrition}
                    className={"btn btn-success btn-block"}>Save</button>

            </div>
        )
    }
}

