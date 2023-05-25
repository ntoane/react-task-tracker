import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {
    return (
        <div
            // Have a regular expression to show green border class if reminder is true else nothing
            className={`task ${task.reminder == true ? 'reminder' : ''}`}
            onDoubleClick={() => onToggle(task.id)}>
            <h3>
                {task.text}
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    // Make arrow function and call onDelete function with task id
                    onClick={() => onDelete(task.id)}
                />
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
