import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function CreateTodo() {
  let title = '';
  let description = '';

  // fetch all todos from server
  function titleInput(event) {
    title = event.target.value;
    console.log(title)
  }
  function descInput(event) {
    description = event.target.value
    console.log(description)

  }


  function sendData() {
    console.log(title)
    console.log(description)
    console.log("creating your task")
    const todo = { title, description }

    fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo)
    }).then((res) => {

      res.json().then((data) => {
        console.log(data)

      })
    }).catch((err) => {
      console.log(err)
    })

  }

  return (
    <>
      <div>
        <h2>create todo</h2>
        <label htmlFor="title">Title:</label>
        <input type="text" onChange={titleInput} />
        <label htmlFor="description">Description:</label>
        <input type="text" onChange={descInput} />
        <button onClick={sendData}>Submit</button>

      </div>
    </>
  )



}

function Todo(props) {



  function deleteTask() {

    fetch('http://localhost:3000/todos/' + props.id, {
      method: 'DELETE'
    }).then((res) => {

      res.text().then((data) => {
        console.log(data)
      })


    })

  }

  return (<>
    <span> <b>{props.title}</b></span>
    <br></br>
    <span>{props.description}</span>
    <br />

    <span>{props.completed == true ? "completed" : "not Completed"}</span>
    <br />
    <button onClick={deleteTask}>DELETE</button>
    <br />
  </>)
}

function ShowTodos() {

  const [todos, setTodos] = useState([]);

  function display() {
    fetch('http://localhost:3000/todos').then((res) => {
      res.json().then((data) => {




        setTodos(data.map((work) => <Todo
          key={work.id}
          title={work.title}
          description={work.description}
          completed={work.completed}
          id={work.id}
        ></Todo>))
      })
    })

  }



  return (
    <>
      <button onClick={display}>SHOW TODOS</button>
      <p>{todos}</p>
    </>
  )
}




function App() {



  return (
    <>
      <h1>Todos App</h1>
      <CreateTodo></CreateTodo>
      <h2>show todos</h2>
      <ShowTodos></ShowTodos>


    </>
  )
}

// function Todo(props) {
//   // Add a delete button here so user can delete a TODO.
//   return <div>
//     {props.title}
//   </div>
// }

export default App
