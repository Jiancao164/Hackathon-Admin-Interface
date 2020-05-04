import React, {Component} from 'react'
import Recipe from "../component/Recipe";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Editor from "../component/Editor";
import Video from "../component/video/Video";
import VideoDetail from "../component/video/VideoDetail";
import Subscribes from "../component/Subscribes";

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
                        path="/"
                        exact={true}
                        render={(props) =>
                            <Video
                                {...props}/>
                        }/>
                    <Route
                        path="/subscribes"
                        exact={true}
                        render={(props) =>
                            <Subscribes
                                {...props}/>
                        }/>
                    <Route
                        path={"/recipes/:rid"}
                        exact={true}
                        component={Editor}/>
                    <Route
                        path={"/videos/:vid"}
                        exact={true}
                        component={VideoDetail}/>



                </Router>
            </div>
        )
    }
}