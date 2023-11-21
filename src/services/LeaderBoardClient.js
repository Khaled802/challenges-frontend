


class LeaderBoardClient {
    static HOST = "http://localhost:8081";
    static LEADER_BOARD_URL = "/leaderboard";

    static getLeaderBoard() {
        return fetch(this.HOST + this.LEADER_BOARD_URL)
    }
}

export default LeaderBoardClient;

// Long userId;
//     long totalScore;

//     @With
//     List<String> badges;

//     public LeaderBoard(final Long userId, final Long totalScore) {
//         this.userId = userId;
//         this.totalScore = totalScore;
//         this.badges = List.of();
//     }