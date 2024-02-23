export const getAllJokes = () => {
    return fetch("http://localhost:8088/jokes").then((res) => res.json())
}

export const addNewJoke = () => {
    let postOptions = {}
    postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transientState)
    }
    fetch(" http://localhost:9099/jokes", postOptions)
    const inputChangeEvent = new CustomEvent("new joke created")
    document.dispatchEvent(inputChangeEvent)

}