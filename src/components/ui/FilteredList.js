import React from 'react';
import TodoItem from './TodoItem';
import { MSG_NO_ITEMS } from '../../assets/text/en_US';

export default function FilteredList(props) {
    const { items, changeStatus, filterPriority, setFilterPriority } = props;

    // Filter items based on priority if filterPriority is set
    const filteredItems = filterPriority 
        ? items.filter(item => item.priority === filterPriority) 
        : items;

    if (filteredItems.length === 0) {
        return <p className="alert alert-info">{MSG_NO_ITEMS}</p>;
    }

    return (
        <div>
            {/* Priority Filter */}
            <div className="priority-filter">
                <label>Filter by Priority: </label>
                <select 
                    className="form-control" 
                    value={filterPriority} 
                    onChange={(e) => setFilterPriority(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>

            <ul className="list-unstyled">
                {filteredItems.map((item) => (
                    <TodoItem key={item.id} data={item} changeStatus={changeStatus} />
                ))}
            </ul>
        </div>
    );
}
