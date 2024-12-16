import React from "react";
import CheckBox from "./CheckBox";

export default function TodoItem(props) {
    const { data, changeStatus } = props;
    const handleChange = (checked) => changeStatus(data.id, checked);
    const className =
        "todo-item ui-state-default " +
        (data.completed === true ? "completed" : "pending");

    console.log(data);

    return (
        <li className={className}>
            <div className="checkbox d-flex justify-content-between align-items-center">
                <label>
                    <CheckBox
                        checked={data.completed}
                        onChange={handleChange}
                    />{" "}
                    {data.text}
                </label>
                <span className={`badge bg-${getPriorityClass(data.priority)}`}>
                    {capitalize(data.priority)}
                </span>
            </div>
        </li>
    );
}

function getPriorityClass(priority) {
    switch (priority) {
        case "high":
            return "danger"; // Red
        case "medium":
            return "warning"; // Yellow
        case "low":
            return "success"; // Green
        default:
            return "secondary"; // Gray for undefined priorities
    }
}

function capitalize(text) {
    // Safely handle undefined or null priority
    if (typeof text !== "string") {
        return "Unknown";
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
}
