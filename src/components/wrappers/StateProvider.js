import React, { Component } from 'react';
import { FILTER_ALL } from '../../services/filter';
import { MODE_CREATE, MODE_NONE } from '../../services/mode';
import { objectWithOnly, wrapChildrenWith } from '../../util/common';
import { getAll, addToList, updateStatus } from '../../services/todo';

class StateProvider extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            mode: MODE_CREATE,
            filter: FILTER_ALL,
            list: getAll(),
            priority: 'medium', // Default priority
            filterPriority: '', // Priority filter state
            dueDate: '', // Due date state for new tasks
        };
    }

    render() {
        let children = wrapChildrenWith(this.props.children, {
            data: this.state,
            actions: objectWithOnly(this, [
                'addNew',
                'changeFilter',
                'changeStatus',
                'changeMode',
                'setSearchQuery',
                'setPriority',
                'setFilterPriority',
                'setDueDate', // Include setDueDate action
            ]),
        });

        return <div>{children}</div>;
    }

    // Add a new task with priority and dueDate
    addNew(text) {
        const { priority, dueDate } = this.state;
        let updatedList = addToList(this.state.list, { text, completed: false, priority, dueDate });

        this.setState({ list: updatedList });
    }

    // Change the filter
    changeFilter(filter) {
        this.setState({ filter });
    }

    // Change the status of a task (completed or not)
    changeStatus(itemId, completed) {
        const updatedList = updateStatus(this.state.list, itemId, completed);

        this.setState({ list: updatedList });
    }

    // Change the mode (create, view, etc.)
    changeMode(mode = MODE_NONE) {
        this.setState({ mode });
    }

    // Set the search query
    setSearchQuery(text) {
        this.setState({ query: text || '' });
    }

    // Set the priority for tasks
    setPriority(priority) {
        this.setState({ priority });
    }

    // Set the filterPriority for filtering tasks by priority
    setFilterPriority(priority) {
        this.setState({ filterPriority: priority });
    }

    // Set the due date for tasks
    setDueDate(dueDate) {
        this.setState({ dueDate }); // Update the due date state
    }
}

export default StateProvider;
