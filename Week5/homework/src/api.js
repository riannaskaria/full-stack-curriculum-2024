import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
});

// fetch all tasks
export const fetchTasks = () => API.get("/tasks");

// add new task
export const addTasks = (task) => API.post("/tasks", task);

// delete a task
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

// mark completed
export const completeTask = (id) => API.put(`/tasks/${id}`, {completed: true});