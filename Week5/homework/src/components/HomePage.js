import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Box,
  Grid,
} from "@mui/material";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function HomePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // State to hold the list of tasks.
  const [taskList, setTaskList] = useState([]);

  // State for the task name being entered by the user.
  const [newTaskName, setNewTaskName] = useState("");

  // Fetch tasks from the API
  useEffect(() => {
    if (!currentUser.email) {
      navigate("/login");
    } else {
      fetch(`${process.env.REACT_APP_BACKEND}/tasks/${currentUser.email}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch tasks: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetched tasks:", data); // Log the fetched tasks
          setTaskList(data); // Set the tasks to state
        })
        .catch((error) => {
          console.error("Error fetching tasks:", error);
        });
    }
  }, [currentUser, navigate]);

  // Add a new task
  function handleAddTask() {
    if (newTaskName && !taskList.some((task) => task.text === newTaskName)) {
      if (!currentUser) {
        console.error("User ID is not available");
        return; // Don't proceed if user ID is missing
      }

      fetch(`${process.env.REACT_APP_BACKEND}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.email,
          text: newTaskName,
          completed: false,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to add task: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          setTaskList([...taskList, data]); // Update the task list
          setNewTaskName(""); // Clear the input field
        })
        .catch((error) => {
          console.error("Failed to add task:", error);
        });
    } else if (taskList.some((task) => task.text === newTaskName)) {
      alert("Task already exists!");
    }
  }

  // Toggle task completion
  function toggleTaskCompletion(task) {
    fetch(`${process.env.REACT_APP_BACKEND}/tasks/${currentUser.email}/${task.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete task: ${response.statusText}`);
        }
        // Update the state to remove the deleted task
        setTaskList(taskList.filter((existingTask) => existingTask.id !== task.id));
      })
      .catch((error) => console.error("Failed to delete task:", error));
  }


  // Get a message for the number of unfinished tasks
  function getUnfinishedTaskMessage() {
    const unfinishedTasks = taskList.filter((task) => !task.completed).length;
    return unfinishedTasks === 1
      ? "You have 1 unfinished task"
      : `You have ${unfinishedTasks} tasks left to do`;
  }

  return (
    <>
      <Header />
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="div" fontWeight="bold">
            {getUnfinishedTaskMessage()}
          </Typography>
          <Box
            sx={{
              width: "100%",
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={newTaskName}
                  placeholder="Type your task here"
                  onChange={(event) => setNewTaskName(event.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddTask}
                  fullWidth
                >
                  Add
                </Button>
              </Grid>
            </Grid>
            <List sx={{ marginTop: 3 }}>
              {taskList.map((task) => (
                <ListItem key={task.id} dense>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task)}
                  />
                  <ListItemText primary={task.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Container>
    </>
  );
}
