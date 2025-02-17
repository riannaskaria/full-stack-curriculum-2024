import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../contexts/AuthContext";

const BACKEND_URL = "https://to-do-backend-self.vercel.app";

function HomePage() {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks?user=${currentUser?.email}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const response = await fetch(`${BACKEND_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: currentUser?.email, task: newTask }),
      });
      if (response.ok) {
        setNewTask("");
        fetchTasks();
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold">
          {currentUser ? `${currentUser.email}'s To-Do List` : "Guest's To-Do List"}
        </Typography>
      </Box>
      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          label="New Task"
          variant="outlined"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={addTask}>
          Add
        </Button>
      </Box>
      <List sx={{ mt: 2 }}>
        {tasks.map((task) => (
          <ListItem key={task.id} secondaryAction={
            <IconButton edge="end" onClick={() => deleteTask(task.id)}>
              <DeleteIcon color="error" />
            </IconButton>
          }>
            <ListItemText primary={task.task} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default HomePage;