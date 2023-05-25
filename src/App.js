import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./components/Header";
import { useState, useEffect } from 'react'
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  // Fetch Tasks by Creating async function
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch a single Tasks
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      // Set Tasks from the server here
      setTasks(tasksFromServer)
    }

    getTasks()
  }, []) // Dependency array: If you have a value in function arguments that you want to run if it changes, now put [] 

  // Delete a task
  const deleteTask = async (id) => {
    //console.log('Delete task', id)
    // To delete a tasks, deal with mutable state
    // Do a temporary Delete by filtering out tasks not having this id

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => task.id != id))
  }

  const toggleReminder = async (id) => {
    // Get the task to update and change its reminder
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    // Update the task by id
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id == id ? { ...task, reminder: data.reminder } : task
      )
    )
    // console.log('toggled: ', id)
    // tasks.map((task) => task.id == id ? console.log(task.reminder) : '')
  }

  // Add Task
  const addTask = async (task) => {
    // Generate random id
    // const id = Math.floor(Math.random() * 1000) + 1
    // create new task from id and copying all from tsk
    // const newTask = { id, ...task }
    // Set a new task by copying(using spread operator) existing tasks and add new task
    // setTasks([...tasks, newTask])

    // New addTask via API
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const newData = await res.json()

    setTasks([...tasks, newData])
  }

  return (
    <Router>
      <div className="container">
        {/* Set showAddTask to whatever opposit value, onAdd will passed to Header as a prop*/}
        <Header title="Task Tracker" onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />

        <Routes>
          <Route
            path='/'
            element={
              <>
                {/* Short way to do ternary operator without else */}
                {showAddTask == true && <AddTask onAdd={addTask} />}
                {/* Wrap Task component in Ternary Operator to show Tasks component if tasks are available, else show No tasks message */}
                {tasks.length > 0 ? (
                  <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
                ) : (
                  'No tasks to show'
                )}
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
