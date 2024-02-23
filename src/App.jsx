import "./App.css"

import { getAllJokes } from "./services/jokeService.jsx"
import { useState, useEffect } from "react"

export const addNewJoke = (parameter) => {
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

export const App = () => {
  const [allJokes, setAllJokes] = useState([]) // [stateVariable, setterFunction]
  const [newJoke, setNewJoke] = useState({})


  useEffect(() => {
    getAllJokes().then(jokesArray => {
      setAllJokes(jokesArray)
      console.log("JOKES ARE set!")
    })

  }, [])



return <div className="app-container">
  <div className="app-heading ">
    <h1 className="app-heading-text">Chuckle Checklist</h1>

  </div>
  <h2>Add Joke</h2>
  <div className="joke-add-form">
    <input
      className="joke-input"
      type="text"
      placeholder="New One Liner"
      onChange={() => {
        console.log("WHAT HAPPENED?")
        // What's the value of event? the value is going to be a post request 
      }}
    />
    <button className="joke-input-submit">Add</button>
  </div>
</div>
}

