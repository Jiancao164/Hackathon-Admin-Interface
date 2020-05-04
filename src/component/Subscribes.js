import React, {Component} from 'react'
import {findVideoById} from "../services/VideoService";
import {findSubscribes} from "../services/SubscribeService";
import {findProcesses} from "../services/ProcessService";

export default class Subscribes extends Component{
    constructor(props) {
        super(props);
        this.state = {
            subscribe: []
        };
    }

    componentDidMount = async () => {
        await findSubscribes().then(result => this.setState({
            subscribe: result
        }));
    };

    render() {
        return(
            <div className={"container"}>
                <ol>
                    {this.state.subscribe && this.state.subscribe.map(sub =>
                        <li key={sub.id}>
                            <div>
                                {sub.subscribe}
                            </div>
                            <div>
                                {sub.timestamp}
                            </div>
                        </li>
                    )}
                </ol>
            </div>
        )
    }
}