import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

function InputBox(props) {
    const { addNew, priority, setPriority } = props;

    // State to handle due date
    const [dueDate, setDueDate] = useState("");

    const handleAdd = (event) => {
        if (event.key === "Enter" && event.target.value.trim()) {
            // Show SweetAlert confirmation dialog
            Swal.fire({
                title: "Are you sure?",
                text: `You are about to add "${event.target.value.trim()}" with priority ${priority} and due date ${
                    dueDate ? dueDate : "None"
                }.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, add it!",
                cancelButtonText: "Cancel",
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    try {
                        // If confirmed, add the new item with due date
                        addNew(event.target.value.trim(), priority, dueDate);
                        event.target.value = ""; // Clear the input field
                        setDueDate(""); // Reset due date
                        Swal.fire(
                            "Added!",
                            "Your task has been added.",
                            "success"
                        );
                    } catch (error) {
                        // Handle any errors that occur during adding
                        Swal.fire(
                            "Error!",
                            "Something went wrong while adding the task.",
                            "error"
                        );
                    }
                }
            });
        }
    };

    const handlePriorityChange = (event) => {
        setPriority(event.target.value); // Update priority when selected
    };

    const handleDateChange = (event) => {
        setDueDate(event.target.value); // Update due date when selected
    };

    return (
        <div className="input-box-container">
            <input
                autoFocus
                type="text"
                className="form-control add-todo"
                onKeyUp={handleAdd}
                placeholder="Enter task description"
            />
            <select
                className="form-control priority-select"
                value={priority}
                onChange={handlePriorityChange}
            >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>

            {/* Due date picker */}
            <input
                type="date"
                className="form-control due-date-select"
                value={dueDate}
                onChange={handleDateChange}
                placeholder="Select due date"
            />
        </div>
    );
}

export default InputBox;
