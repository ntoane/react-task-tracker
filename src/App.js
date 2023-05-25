import Header from "./components/Header";
import { useState } from 'react'
import Tasks from "./components/Tasks";

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

  return (
    <div className="container">
      <Header title="Task Tracker" />
      <Tasks tasks={tasks} onDelete={deleteTask} />
    </div>
  );
}

export default App;
