import React, {Component} from 'react'
import Recipe from "../component/Recipe";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Editor from "../component/Editor";

export default class Manager extends Component{
    render() {
        return(
            <div>
                <Router>
                    <Route
                        path="/"
                        exact={true}
                        render={(props) =>
                            <Recipe
                                {...props}/>
                        }/>
                    <Route
                        path={"/recipes/:rid"}
                        exact={true}
                        component={Editor}/>



                </Router>
            </div>
        )
    }
}