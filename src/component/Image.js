import React, {Component} from 'react'
import {findRecipeById, updateRecipe} from "../services/RecipeService";

export default class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image : ""
        };
    }
    componentDidMount = async () => {
        await findRecipeById(this.props.rid).then(results => this.setState({
            image: results.url
        }))
    };


    updateImage = async () => {
        await updateRecipe(this.props.rid, {...await findRecipeById(this.props.rid).then(result => result), url:this.state.image});
    };




    render() {
        return(
            <div>
                <div>
                    <h2>Image URL</h2>

                    <input
                        onChange={(e) => this.setState({
                            image: e.target.value
                        })}
                        className="form-control" placeholder="new image url" aria-label="Username"
                        value={this.state.image} aria-describedby="basic-addon1"/>

                </div>

                <button
                    onClick={this.updateImage}
                    className={"btn btn-success btn-block"}>Save</button>

            </div>
        )
    }
}

