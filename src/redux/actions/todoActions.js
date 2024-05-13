import todoActionTypes from "./actionTypes/todoActionTypes"

const addTodo = (todo) => {
    return {
        type: todoActionTypes.ADD_TODO,
        payload: {todo}
    }
}

const markTodoCompleted = (createdAt) => {
    return {
        type: todoActionTypes.MARK_TODO_COMPLETED,
        payload: {createdAt}
    }
}

const removeTodo = (createdAt) => {
    return {
        type: todoActionTypes.REMOVE_TODO,
        payload: {createdAt}
    }
}

const editTodo = (updatedTodo) => {
    return {
        type: todoActionTypes.EDIT_TODO,
        payload: {updatedTodo}
    }
}

const sortByNewestFirst = () => {
    return {
        type: todoActionTypes.SORT_BY_NEWEST_FIRST,
        payload: {}
    }
}

const sortByOldestFirst = () => {
    return {
        type: todoActionTypes.SORT_BY_OLDEST_FIRST,
        payload: {}
    }
}

export {
    addTodo, 
    markTodoCompleted, 
    removeTodo, 
    editTodo, 
    sortByNewestFirst,
    sortByOldestFirst
}