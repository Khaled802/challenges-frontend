

class ApiClient {
    static HOST = "http://localhost:8000";
    static GET_CHALLENGE = "/challenges/random";
    static POST_ATTEMPT = "/attempts";
    static GET_ATTEMPTS_BY_USER_ALIEN = "/attempts";
    static GET_USERS_BY_IDS = "/users"

    static challenge() {
        return fetch(this.HOST + this.GET_CHALLENGE);
    }

    static sendGuess(factor1, factor2, guess, user) {
        const body = {
            factor1, factor2, guess, user
        }

        return fetch(this.HOST + this.POST_ATTEMPT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:  JSON.stringify(body)
        });
    }

    static getAttempts(alias) {
        return fetch(this.HOST+this.GET_ATTEMPTS_BY_USER_ALIEN+"/"+alias);
    }

    static getUsersByIds(ids) {
        return fetch(this.HOST+this.GET_USERS_BY_IDS+"/"+ids.join(","));
    }
}

export default ApiClient;