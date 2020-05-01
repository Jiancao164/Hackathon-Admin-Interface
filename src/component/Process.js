import React, {Component} from 'react'
import {createProcess, findProcesses, updateProcess} from "../services/ProcessService";

export default class Process extends Component {
    constructor(props) {
        super(props);
        this.state = {
            process : []
        };
    }
    componentDidMount = async () => {
        await findProcesses(this.props.rid).then(results => this.setState({
            process: results
        }))
    };
    addProcess = async () => {
        await this.setState({process: [...this.state.process, ""]});
        // await createProcess(this.props.match.params.rid);
    };

    updateProcess = async () => {
        await updateProcess(this.props.rid, this.state.process);
    };

    deleteProcess = async (iid) => {
        const items = this.state.process.filter(process => process.id !== iid);
        await this.setState({ process: items });
    };


    render() {
        return(
            <div>
                <div>
                    <h2>Directions</h2>
                    <ol>
                        {this.state.process && this.state.process.map(process =>
                            <li key={process.id}>
                                <div className={"row"}>
                                    <div className={"col-11"}>
                                        <textarea
                                               onChange={(e) => this.setState({
                                                   process: this.state.process.map(el => (el.id === process.id ? Object.assign({}, el, { processDetail: e.target.value }) : el))
                                               })}
                                               className="form-control" placeholder="new process" aria-label="Username"
                                               value={process.processDetail} aria-describedby="basic-addon1"/>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => this.deleteProcess(process.id)}
                                            className={"btn btn-danger"}>X</button>
                                    </div>
                                </div>
                                <br/>
                            </li>
                        )}
                    </ol>
                    <button
                        onClick={this.addProcess}
                        className={"btn btn-success"}>+</button>
                </div>

                <button
                    onClick={this.updateProcess}
                    className={"btn btn-success btn-block"}>Save</button>

            </div>
        )
    }
}

