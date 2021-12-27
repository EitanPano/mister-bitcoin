export const userService = {
    getUser
}

function getUser() {
    return Promise.resolve({
        name: "Agent Beanz",
        coins: 100,
        moves: []
    })
}