import React, { useState } from "react";

function Todo({task = "default todo", id="1", remove, edit }) {
    const [editTask, setEditTask] = useState(task);
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setIsEditing(edit => !edit);
    }

    const handleChange = e => {
        setEditTask(e.target.value);
    }

    const handleDelete = () => remove(id);

    const handleEdit = e => {
        e.preventDefault();
        edit(id, editTask);
        setIsEditing(false);
    }

    let jsx = (
        <div>
            <li>{task}</li>
            <button onClick={toggleEdit}>Edit</button>
            <button onClick={handleDelete}>X</button>
        </div>
    );

    if(isEditing) {
        jsx = (
            <div>
                <form onSubmit={handleEdit}>
                    <input type="text" value={editTask} onChange={handleChange} />
                    <button>Update!</button>
                </form>
            </div>
        );
    }

    return jsx;
}

export default Todo;