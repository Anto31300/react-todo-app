import React from 'react';
import CheckBox from './CheckBox';
import Swal from 'sweetalert2';


export default function TodoItem(props) {
    const {data, changeStatus} = props;

    const handleChange = (checked) => {
        if (checked) {
            Swal.fire({
                title: `Mark task '${data.text}' as completed?`,
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                icon: 'question',
            }).then((result) => {
                if (result.isConfirmed) {
                    changeStatus(data.id, true);
                } else {
                    changeStatus(data.id, false);
                }
            });
        } else {
            changeStatus(data.id, false);
        }
    };


    const className = 'todo-item ui-state-default ' + (data.completed === true ? 'completed' : 'pending');

    return (
        <li className={className}>
            <div className="checkbox">
                <label>
                    <CheckBox checked={data.completed} onChange={handleChange}/> {data.text}
                </label>
            </div>
        </li>
    );
}
