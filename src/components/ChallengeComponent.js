import ApiClient from "../services/ApiClient";
import React from "react";
import LastAttemptsComponent from "./LastAttemptsComponent";
import LeaderBoardComponent from "./LeaderBoardComponent";

class ChallengeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            factor1: "",
            factor2: "",
            user: "",
            message: "",
            guess: 0,
            lastAttempts: [],
        }

        this.handleSubmitResult = this.handleSubmitResult.bind(this);
        this.handleChange = this.handleChange.bind(this);


    }

    async componentDidMount() {
        const response = await ApiClient.challenge();
        if (!response.ok) return this.updateMessage("Can't reach the server");
        const json = await response.json();
        this.setState({
            factor1: json.factor1,
            factor2: json.factor2,
        });
    }

    updateMessage(message) {
        this.setState({
            message
        })
    }

    handleChange(event) {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value
        });
    }

    async handleSubmitResult(event) {
        event.preventDefault();
        const response = await ApiClient.sendGuess(this.state.factor1, this.state.factor2, this.state.guess, this.state.user);
        if (!response.ok) return this.updateMessage("bad request")
        const json = await response.json();

        if (json.correct) {
            this.setState({
                "message": "Congratulations"
            });
        } else {
            this.setState({
                "message": "Wrong"
            })
        }

        this.updateAttempts(this.state.user);
        // this.refreshChallenge();
    }

    async updateAttempts(userAlies) {
        const response = await ApiClient.getAttempts(userAlies);
        if (!response.ok) this.updateMessage("there is problem to get Attempts");
        const json = await response.json();
        const lastAttempts = [];
        json.forEach(element => {
            lastAttempts.push(element);
        });
        this.setState({
            lastAttempts,
        });
        console.log(lastAttempts);
    }

    render() {
        return (
            <div className="display-column">
                <div>
                    <h3>Your new challenge is</h3>
                    <h1 className="challenge">
                        {this.state.factor1} x {this.state.factor2}
                    </h1>
                </div>
                <form onSubmit={this.handleSubmitResult}>
                    <label>
                        Your alias:
                        <input type="text" maxLength="12" name="user" value={this.state.user} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Your guess:
                        <input type="number" min="0" name="guess" value={this.state.guess} onChange={this.handleChange}/>
                    </label>
                <br/>
                <input type="submit" value="Submit"/>
                </form>
                <h4>{this.state.message}</h4>
                {this.state.lastAttempts.length > 0 &&<LastAttemptsComponent lastAttempts={this.state.lastAttempts}/>}
                <div className="display-column">
                    <LeaderBoardComponent />
                </div>
            </div>

        )
    }
}

export default ChallengeComponent;