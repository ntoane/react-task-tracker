import Header from "./components/Header";
import { useState } from 'react'
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [tasks, setTasks] = useState([
    {
      "id": 1,
      "text": "Doctors Appointment",
      "day": "Feb 5th at 2:30pm",
      "reminder": true
    },
    {
      "id": 2,
      "text": "Meeting at School",
      "day": "Feb 6th at 1:30pm",
      "reminder": true
    },
    {
      "id": 3,
      "text": "Meeting at church",
      "day": "Feb 6th at 6:30pm",
      "reminder": false
    }
  ])

  // Delete a task
  const deleteTask = (id) => {
    //console.log('Delete task', id)
    // To delete a tasks, deal with mutable state
    // Do a temporary Delete by filtering out tasks not having this id
    setTasks(tasks.filter((task) => task.id != id))
  }

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id == id ? { ...task, reminder: !task.reminder } : task
      )
    )
    // console.log('toggled: ', id)
    // tasks.map((task) => task.id == id ? console.log(task.reminder) : '')
  }

  // Add Task
  const addTask = (task) => {
    // Generate random id
    const id = Math.floor(Math.random() * 1000) + 1
    // create new task from id and copying all from tsk
    const newTask = { id, ...task }
    // Set a new task by copying(using spread operator) existing tasks and add new task
    setTasks([...tasks, newTask])
  }

  return (
    <div className="container">
      <Header title="Task Tracker" />
      <AddTask onAdd={addTask} />
      {/* Wrap Task component in Ternary Operator to show Tasks component if 
        tasks are available, else show No tasks message */}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        'No tasks to show'
      )}
    </div>
  );
}

export default App;
