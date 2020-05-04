import React, {Component} from 'react'
import {
    createVideo,
    deleteVideo,
    findCalendars,
    findVideoById,
    findVideos, updateCalendar,
    updateVideo
} from "../../services/VideoService";
import {updateIngredients} from "../../services/IngredientService";

export default class Video extends Component{
    componentDidMount = async () => {
        await findVideos().then(results => this.setState({
            videos: results
        }));
        await findCalendars().then(result => this.setState({
            calendar: result[0]
        }))

    };

    state = {
        videos: [],
        editing: false,
        editId: '',
        calendar: {},
        url:'',
        subscribe: []
    };

    createVideo = async () => {
        await createVideo();
        await findVideos().then(results => this.setState({
            videos: results
        }))
        // this.setState({videos: [...this.state.videos, {title: "new video", url:"", preTime:"", cookingTime:"", servings:""}]})
    };

    deleteVideo = async (vid) => {
        const items = this.state.videos.filter(video => video.id !== vid);
        await this.setState({ videos: items });
        await deleteVideo(vid)
        await findVideos().then(results => this.setState({
            videos: results
        }))
    };

    updateVideo = async (vid) => {
        const items = await findVideos().then(results => results.filter(el => {return el.id===vid})[0]);
        await updateVideo(vid, {...items, title: this.state.videos.filter(el => {return el.id===vid})[0].title});
        await findVideos().then(results => this.setState({
            videos: results
        }));
        this.setState({editId: ''})
    };

    updateCalendar = async () => {
      await updateCalendar({...this.state.calendar, url: this.state.url});
    };

    render() {
        return(
            <div className={"container"}>
                <h1>
                    video
                </h1>
                <ul>
                    {this.state.videos && this.state.videos.map(video =>
                        <li key={video.id}>
                            {this.state.editId!==video.id && <a href={`/videos/${video.id}`}>{video.title}</a>}
                            {this.state.editId===video.id &&
                            <input
                                onChange={(e) => this.setState({
                                    videos: this.state.videos.map(el => (el.id === video.id ? Object.assign({}, el, { title: e.target.value }) : el))
                                })}
                                value={video.title}/>}
                            {this.state.editId!==video.id && <i
                                onClick={() => {this.setState({editing: !this.state.editing}); this.setState({editId: video.id}) }}
                                className="far fa-edit fa-2x"/>}
                            {this.state.editId===video.id &&
                            <i
                                onClick={() => this.updateVideo(video.id)}
                                className="fas fa-check fa-2x"/>}
                            <button
                                onClick={() => this.deleteVideo(video.id)}
                                className={"btn btn-danger btn-video"}>X</button>
                        </li>
                    )}
                </ul>
                <button
                    onClick={this.createVideo}
                    className={"btn btn-success"}>+</button>
                <div>
                    <h1>Subscribe:
                    <a href={"/subscribes"}>Link</a></h1>
                </div>
                <h1>
                    Current calendar URL：{this.state.calendar && this.state.calendar.url}
                </h1>
                <div>
                    <input type="text"
                           onChange={(e) => this.setState({
                               url: e.target.value
                           })}
                           className="form-control" placeholder="Calendar URL" aria-label="Username"
                           value={this.state.url} aria-describedby="basic-addon1"/>
                    <button
                        onClick={() => this.updateCalendar()}
                        className={"btn btn-success btn-block"}>Save</button>
                </div>
            </div>

        )
    }
}