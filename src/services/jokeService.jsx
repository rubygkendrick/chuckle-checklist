export const  getAllJokes = () => {
    return fetch("http://localhost:8088/jokes").then((res) => res.json())
}



export const addNewJoke = async (newJokePost) => {

    let postOptions = {}
    postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newJokePost)
    }
    await fetch(" http://localhost:8088/jokes", postOptions)

}

export const editJoke = async (jokeId, jokeToToggle) => {

    let putOptions = {}
    putOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jokeToToggle)
    }
    await fetch(`http://localhost:8088/jokes/${jokeId}`, putOptions)

}

export const deleteJoke = async (jokeId) => {
    await fetch(`http://localhost:8088/jokes/${jokeId}`, {
        method: 'DELETE'
    })
}