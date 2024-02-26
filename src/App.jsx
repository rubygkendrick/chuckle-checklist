import "./App.css"

import { getAllJokes } from "./services/jokeService.jsx"
import { useState, useEffect } from "react"
import { addNewJoke } from "./services/jokeService.jsx"

export const App = () => {
  const [allJokes, setAllJokes] = useState([]) // [stateVariable, setterFunction]
  const [untoldJokes, setUntoldJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])
  const [newJoke, setNewJoke] = useState([])

  const fetchAndResetJokes = () => {
    getAllJokes().then(jokesArray => {
      setAllJokes(jokesArray)
    })   
   const untoldJokes = allJokes.filter(joke => joke.told === false)
   setUntoldJokes(untoldJokes)
   const toldJokes = allJokes.filter(joke => joke.told === true)
   setToldJokes(toldJokes)
    
  }

  useEffect(() => {
    getAllJokes().then(jokesArray => {
      setAllJokes(jokesArray)
      console.log("JOKES ARE set!")
    })

  }, [])

  useEffect(() => {
    fetchAndResetJokes()
  }, [allJokes])


  const handleAddJokeClick = async () => {
    const transientJokes = {
      text: newJoke,
      told: false
    }
    addNewJoke(transientJokes)
    setNewJoke("")
    fetchAndResetJokes()

  }



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
        value={newJoke}
        onChange={(event) => {
          setNewJoke(event.target.value)
        }}
      />
      <button className="joke-input-submit" onClick={handleAddJokeClick}>Add</button>
    </div>
    <div className="joke-lists-container">
      <div className="joke-list-container">
        <h2>Untold <span className="untold-count">{untoldJokes.length}</span></h2>
        {untoldJokes.map((joke) => {
          return (<li className="joke-list-item" key={joke.id}>{joke.text}<button><i className="fa-regular fa-face-smile" /></button></li>)
        }
        )}

      </div>
      <div className="joke-list-container">
        <h2>Told <span className="told-count">{toldJokes.length}</span></h2>
        {toldJokes.map((joke) => {

          return (
           
          <li className="joke-list-item" key={joke.id}>{joke.text}<button><i className="fa-regular fa-face-meh" /></button></li>
          )
        }
        )}
      </div>
    </div>
  </div>
}

