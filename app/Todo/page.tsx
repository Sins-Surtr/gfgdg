"use client"
import { useState } from "react"
const STYLE = "border border-black rounded-md px-2 mb-2"

export default function Todo() {
    const [task, setTask] = useState('')
    const [editTask, setEditTask] = useState('')
    const [editId, setEditId] = useState(-1)
    const [tasks, setTasks] = useState<string[]>([
        "Reading",
        "Writing",
        "Coding",
    ])

    function deleteTask(indexTask: number): void {
        setTasks(tasks.filter((_, index) => index !== indexTask))
    }

    function editTaskFunction(indexTask: number): void {
        setEditId(indexTask)
        setEditTask(tasks[indexTask])
    }

    function updateTask(): void {
        if (editId === -1) {
            return
        }
        const newTasks = [...tasks]
        newTasks[editId] = editTask
        setTasks(newTasks)
        setEditId(-1)
        setEditTask('')
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Todo</h1>
            <div>
                <label htmlFor="task">Task: </label>
                <input
                    className={`${STYLE}`}
                    type="text" name="task"
                    onChange={e => setTask(e.target.value)}
                />
            </div>
            <div>
                <button className={`${STYLE}`}
                    onClick={() => setTasks([...tasks, task])}
                >Add task</button>
            </div>

            <hr />

            <div>
                Task: {task} <br />

                Tasks:
                {
                    tasks.map((task, index) => (
                        <div key={index}>
                            {index + 1}. {task}
                            <button
                                className={`${STYLE} ml-4`}
                                onClick={() => deleteTask(+index)}
                            > - </button>
                            <button
                                className={`${STYLE} ml-4`}
                                onClick={() => editTaskFunction(+index)}
                            > edit </button>
                        </div>
                    ))
                }

                <hr />

                <div>
                    EditTask:
                    <input
                        className={`${STYLE}`}
                        type="text"
                        defaultValue={editTask}
                        onChange={e => setEditTask(e.target.value)}
                    />
                    <button
                        className={`${STYLE} ml-4`}
                        onClick={updateTask}
                    > Save </button>
                </div>

            </div>
        </div>
    )
}