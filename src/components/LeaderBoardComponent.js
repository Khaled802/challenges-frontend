import React from "react";
import LeaderBoardClient from "../services/LeaderBoardClient";
import ApiClient from "../services/ApiClient";


class LeaderBoardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leaderBoard: [],
            serverError: false
        }
    }

    componentDidMount() {
        this.getLeaderBoard();
    }

    async getUsers(leaderBoard) {
        const ids = [];
        for (const user of leaderBoard) {
            ids.push(user.userId);
        }
        console.log(ids);
        const response = await ApiClient.getUsersByIds(ids);
        const users = await response.json();
        const usersMap = new Map();
        for (const user of users) {
            usersMap.set(user.id, user);
        }
        console.log(usersMap);
        return usersMap;
    }

    async getLeaderBoard() {
        const response = await LeaderBoardClient.getLeaderBoard();
        if (!response.ok) return this.setState({ "serverError": true });

        this.setState({ "serverError": false });

        const leaderBoard = await response.json();
        const users = await this.getUsers(leaderBoard);
        console.log(leaderBoard);
        for (const userLB of leaderBoard) {
            userLB.alias = users.get(userLB.userId).alias;
            console.log(userLB);
        }
        console.log(leaderBoard);
        this.setState({
            leaderBoard
        }) 
        console.log(this.setState.leaderboard);   
    }

    render() {
        if (this.state.serverError) {
            return (
                <div>We're sorry, but we can't display game statistics at this moment.</div>
            )
        }

        return (
            <div>
               
                <h3>Leaderboard</h3>
                <table>
                    <thead>
                    <tr>
                        <th>User</th>
                        <th>Score</th>
                        <th>Badges</th>
                    </tr>
                    </thead>
                <tbody>
                    {this.state.leaderBoard.map(row => 
                    <tr key={row.userId}>
                        <td>{row.alias ? row.alias : row.userId}</td>
                        <td>{row.totalScore}</td>
                        <td>{row.badges.map(b => <span className="badge" key={b}>{b}</span>)}</td>
                    </tr>)}
                </tbody>
                </table>
            </div>
        )
    }
}

export default LeaderBoardComponent;