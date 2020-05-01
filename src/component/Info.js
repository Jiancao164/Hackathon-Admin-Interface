import React, {Component} from 'react'
import {findRecipeById, updateRecipe} from "../services/RecipeService";


export default class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preTime: '',
            cookTime: '',
            servings: ''
        };
    }
    componentDidMount = async () => {
        await findRecipeById(this.props.rid).then(results => this.setState({
            servings: results.servings, preTime: results.preTime, cookTime: results.cookTime
        }));
    };
    //
    //
    // updateInfo = async () => {
    //     await updateInfo(this.props.rid, this.state.info);
    // };

    updateRecipe = async (rid) => {
        await updateRecipe(rid, {...await findRecipeById(rid).then(result => result),
            preTime:this.state.preTime, cookTime:this.state.cookTime, servings: this.state.servings});
    };




    render() {
        return(
            <div>
                <div className={"info"}>
                    <h2>Info</h2>
                    <div className={"row"}>
                        <div className={"col-2"}>Prepare Time: </div>
                        <div className={"col-10"}>
                            <input
                                onChange={(e) => this.setState({
                                    preTime: e.target.value
                                })}
                                className="info form-control" placeholder="Prepare time" aria-label="Username"
                                value={this.state.preTime} aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-2"}>Cook Time: </div>
                        <div className={"col-10"}>
                            <input
                                onChange={(e) => this.setState({
                                    cookTime: e.target.value
                                })}
                                className="info form-control" placeholder="cook time" aria-label="Username"
                                value={this.state.cookTime} aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-2"}>Servings: </div>
                        <div className={"col-10"}>
                            <input
                                onChange={(e) => this.setState({
                                    servings: e.target.value
                                })}
                                className="info form-control" placeholder="Servings" aria-label="Username"
                                value={this.state.servings} aria-describedby="basic-addon1"/>
                        </div>
                    </div>




                </div>

                <button
                    onClick={() => this.updateRecipe(this.props.rid)}
                    className={"btn btn-success btn-block"}>Save</button>

            </div>
        )
    }
}

