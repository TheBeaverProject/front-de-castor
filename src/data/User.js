export const Status = {
    BANNED: 0,
    ADMIN: 1,
    INACTIVE: 2,
    ACTIVE: 3,
};
Object.freeze(Status)

export class User {
    /**
     * This class constitute the core of the User object containing all the user informations
     * @param username The username of the User
     * @param email The email of the User
     * @param birthdate The birthday of the User
     * @param likedNews Array containing the UIDs of the article he liked
     * @param matchHistory Array containing the UIDs of the matches he played
     * @param elo Elo ranking (double)
     * @param registerDate The date of creation of the account
     * @param status  The status of the player : Banned, Admin, Active, Inactive
     * @param items  Possible items the user have
     * @param level   The current level of the user.
     */
    constructor(
        username,
        email,
        birthdate,
        likedNews = [],
        matchHistory = [],
        elo = 1200,
        registerDate = new Date(),
        status = Status.ACTIVE,
        items = [],
        level = 1
    ) {
        this.username = username;
        this.email = email;
        this.birthdate = birthdate;
        this.likedNews = likedNews;
        this.matchHistory = matchHistory;
        this.elo = elo;
        this.registerDate = registerDate;
        this.status = status;
        this.items = items;
        this.level = level;
    }
}

export default User;


// Firestore data converter
export const userConverter = {
    toFirestore: function (user) {
        return {
            username: user.username,
            email: user.email,
            birthdate: user.birthdate,
            likedNews: user.likedNews,
            matchHistory: user.matchHistory,
            elo: user.elo,
            registerDate: user.registerDate,
            status: user.status,
            items: user.items,
            level: user.level,
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new User(
            data.username,
            data.email,
            data.birthdate,
            data.likedNews,
            data.matchHistory,
            data.elo,
            data.registerDate,
            data.status,
            data.items,
            data.level,
        );
    }
};


export const registerNewUser = (username, email, birthdate) => {
    const newUser = new User(username, email, birthdate);
    console.log(newUser);
}