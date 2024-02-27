import "./App.css"

import { getAllJokes } from "./services/jokeService.jsx"
import { useState, useEffect } from "react"
import { addNewJoke } from "./services/jokeService.jsx"
import { editJoke } from "./services/jokeService.jsx"
import { deleteJoke } from "./services/jokeService.jsx"


export const App = () => {
  const [allJokes, setAllJokes] = useState([]) // [stateVariable, setterFunction]
  const [untoldJokes, setUntoldJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])
  const [newJoke, setNewJoke] = useState([])

  const fetchAndResetJokes = () => {
    getAllJokes().then(jokesArray => {
      setAllJokes(jokesArray)
    })
  }

  useEffect(() => {
    fetchAndResetJokes()
  }, [])

  useEffect(() => {
    const untoldJokes = allJokes.filter(joke => joke.told === false)
    setUntoldJokes(untoldJokes)
    const toldJokes = allJokes.filter(joke => joke.told === true)
    setToldJokes(toldJokes)
  }, [allJokes])


  const handleAddJokeClick = async () => {
    const newJokeToPost = {
      text: newJoke,
      told: false
    }
    await addNewJoke(newJokeToPost)
    setNewJoke("")
    fetchAndResetJokes()
  }

  //functions to create  edited joke objects
  const handleUntoldEditJokeClick = async (event) => {
    const jokeId = event.target.dataset.joke
    let told = false
    if (event.target.dataset.told === "false") {
      told = true
    }
    const editedJoke = {
      id: jokeId,
      text: event.target.dataset.text,
      told: told
    }
    await editJoke(jokeId, editedJoke)
    fetchAndResetJokes()
  }

  const handleToldEditJokeClick = async (event) => {
    const jokeId = event.target.dataset.joke
    let told = true
    if (event.target.dataset.told === "true") {
      told = false
    }
    const editedJoke = {
      id: jokeId,
      text: event.target.dataset.text,
      told: told
    }
    await editJoke(jokeId, editedJoke)
    fetchAndResetJokes()
  }

  const handleDeleteJokeClick = async (event) => {
    const jokeId = event.target.dataset.joke
    await deleteJoke(jokeId)
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

          return (<li className="joke-list-item" key={joke.id}>{joke.text}
            <button className="joke-list-action-delete"
              data-joke={joke.id} onClick={handleDeleteJokeClick}>delete
            </button>
            <button className="joke-list-action-toggle"
              data-joke={joke.id} data-text={joke.text} data-told={joke.told}
              onClick={handleUntoldEditJokeClick} >told
            </button>
          </li>)
        }
        )}

      </div>
      <div className="joke-list-container">
        <h2>Told <span className="told-count">{toldJokes.length}</span></h2>
        {toldJokes.map((joke) => {

          return (

            <li className="joke-list-item" key={joke.id}>{joke.text}
              <button className="joke-list-action-delete"
                data-joke={joke.id} onClick={handleDeleteJokeClick}>delete
              </button>
              <button className="joke-list-action-toggle"
                data-joke={joke.id} data-text={joke.text} data-told={joke.told}
                onClick={handleToldEditJokeClick} >untold
              </button>
            </li>
          )
        }
        )}
      </div>
    </div>
  </div>
}

