import React, {Component} from 'react'
import {findVideoById, updateVideo} from "../../services/VideoService";


export default class VideoDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            url: ''
        };
    }
    componentDidMount = async () => {
        await findVideoById(this.props.match.params.vid).then(results => this.setState({
            url: results.url, title: results.title, description: results.description
        }));
    };


    updateVideo = async (vid) => {
        await updateVideo(vid, {...await findVideoById(vid).then(result => result),
            title:this.state.title, description:this.state.description, url: this.state.url});
    };




    render() {
        return(
            <div className={"container"}>
                <div className={"info"}>
                    <h2>{this.state.title}</h2>
                    <div className={"row"}>

                    </div>
                    <div className={"row"}>
                        <div className={"col-2"}>Description: </div>
                        <div className={"col-10"}>
                            <textarea
                                rows={4}
                                onChange={(e) => this.setState({
                                    description: e.target.value
                                })}
                                className="info form-control" placeholder="description" aria-label="Username"
                                value={this.state.description} aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-2"}>URL: </div>
                        <div className={"col-10"}>
                            <input
                                onChange={(e) => this.setState({
                                    url: e.target.value
                                })}
                                className="info form-control" placeholder="url" aria-label="Username"
                                value={this.state.url} aria-describedby="basic-addon1"/>
                        </div>
                    </div>




                </div>

                <button
                    onClick={() => this.updateVideo(this.props.match.params.vid)}
                    className={"btn btn-success btn-block"}>Save</button>

            </div>
        )
    }
}

