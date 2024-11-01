import {Box, Button, Checkbox, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from "react";
import {addStep, getAllSteps, addTask, updateStepDescription, updateTaskDescription, toggleStepCompletion, toggleTaskCompletion, deleteStep, deleteTask} from "../../assets/Client.js";
import './MainList.css'

const MainList = () => {
    const [expandedRows, setExpandedRows] = useState({});
    const [steps, setSteps] = useState([]);
    const [isAddingStep, setIsAddingStep] = useState(false);
    const [newStepDescription, setNewStepDescription] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [addingTaskForStep, setAddingTaskForStep] = useState(null);
    const [editingStepId, setEditingStepId] = useState(null);
    const [editingStepDescription, setEditingStepDescription] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskDescription, setEditingTaskDescription] = useState("");

    const listAllSteps = async () => {
        try {
            const res = await getAllSteps();
            const sortedSteps = res.data.sort((a,b) => a.id - b.id);
            setSteps(sortedSteps);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        listAllSteps();
    }, []);

    const handleExpandClick = (id) => {
        setExpandedRows((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleAddStep = () => {
        setIsAddingStep(true);
    };

    const handleSaveStep = async () => {
        try {
            const newStep = { description: newStepDescription, stepComplete: false };
            const response = await addStep(newStep);
            setSteps((prevSteps) => [...prevSteps, response.data]);
            setNewStepDescription("");
            setIsAddingStep(false);
        } catch (err) {
            console.error("Failed to add Step", err);
        }
    };

    const handleAddTaskClick = (stepId) => {
        setAddingTaskForStep(stepId);
        setExpandedRows((prev) => ({ ...prev, [stepId]: true })); // Expand the row
    };

    const handleSaveTask = async (stepId) => {
        try {
            const newTask = { description: newTaskDescription, taskComplete: false };
            const response = await addTask(stepId, newTask);
            setSteps((prevSteps) =>
                prevSteps.map((step) =>
                    step.id === stepId ? { ...step, tasks: [...step.tasks, response.data] } : step
                )
            );
            setNewTaskDescription("");
            setAddingTaskForStep(null);
        } catch (err) {
            console.error("Failed to add Task", err);
        }
    };

    const handleEditStepClick = (step) => {
        setEditingStepId(step.id);
        setEditingStepDescription(step.description);
    }

    const handleSaveEditedStep = async (id) => {
        try {
            await updateStepDescription(id, editingStepDescription);
            setSteps((prevSteps) =>
                prevSteps.map((step) =>
                    step.id === id ? {...step, description: editingStepDescription } : step
                )
            );
            setEditingStepId(null);
            setEditingStepDescription("");
        } catch (err) {
            console.error("Failed to edit Step", err);
        }
    }

    const handleEditTaskClick = (task) => {
        setEditingTaskId(task.id);
        setEditingTaskDescription(task.description);
    }

    const handleSaveEditedTask = async (id) => {
        try {
            await updateTaskDescription(id, editingTaskDescription);
            setSteps((prevSteps) =>
                prevSteps.map((step) => ({
                    ...step,
                    tasks: step.tasks.map((task) =>
                        task.id === id ? { ...task, description: editingTaskDescription } : task
                    )
                }))
            );
            setEditingTaskId(null);
            setEditingTaskDescription("");
        } catch (err) {
            console.error("Failed to edit Task", err);
        }
    }

    const handleStepToggleCompletion = (id) => {
        toggleStepCompletion(id)
            .then((response) => {
                const updatedStep = response.data;
                setSteps((prevSteps) =>
                    prevSteps.map((step) =>
                        step.id === id ? {...step, stepComplete: updatedStep.stepComplete} : step
                    )
                )
            }).catch((error) => {
                console.error("Failed to edit Step", error);
        })
    }

    const handleTaskToggleCompletion = (id) => {
        toggleTaskCompletion(id)
            .then((response) => {
                const updatedTask = response.data;
                setSteps((prevSteps) =>
                    prevSteps.map((step) => ({
                        ...step,
                        tasks: step.tasks.map((task) =>
                            task.id === id ? { ...task, taskComplete: updatedTask.taskComplete } : task
                        )
                    }))
                )
            }).catch((error) => {
                console.error("Failed to edit Task", error);
        })
    }

    const removeStep = (id) => {
        deleteStep(id)
            .then(() => {
                listAllSteps()
            })
            .catch((error) => {
                console.error("Failed to delete Step", error);
            })
    }

    const removeTask = (id) => {
        deleteTask(id)
            .then(() => {
                listAllSteps()
            })
            .catch((error) => {
                console.error("Failed to delete task", error);
            })
    }

    return (
        <Box className="mainContainer">

            <Box className="title-button-box">
                <Typography variant="h4" className="title">Fullstack Application Checklist</Typography>
                <Button onClick={handleAddStep} variant="contained" color="primary" sx = {{marginLeft: '10px'}}>Add Step</Button>
            </Box>


            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: "10%" }}>Completion</TableCell>
                            <TableCell style={{ width: "70%" }}>Description</TableCell>
                            <TableCell style={{ width: "20%" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {steps.map((step) => (
                            <React.Fragment key={step.id}>
                                <TableRow className="table-row">

                                    <TableCell>
                                        <Checkbox checked={step.stepComplete} onChange={() => handleStepToggleCompletion(step.id)} />
                                    </TableCell>

                                    <TableCell>
                                        {editingStepId === step.id ? (
                                            <TextField
                                                fullWidth
                                                value={editingStepDescription}
                                                onChange={(e) => setEditingStepDescription(e.target.value)}
                                            />
                                        ) : (
                                            step.description
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {editingStepId === step.id ? (
                                            <Button onClick={() => handleSaveEditedStep(step.id)}>Save</Button>
                                        ) : (
                                            <Button onClick={() => handleEditStepClick(step)}>Edit</Button>
                                        )}
                                        <Button onClick={() => removeStep(step.id)}>Delete</Button>

                                        <IconButton onClick={() => handleAddTaskClick(step.id)}>
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleExpandClick(step.id)}>
                                            {expandedRows[step.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </IconButton>
                                    </TableCell>


                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                                        <Collapse in={expandedRows[step.id]} timeout="auto" unmountOnExit>
                                            <Table size="small" aria-label="tasks">
                                                <TableBody>
                                                    {step.tasks.map((task) => (
                                                        <TableRow key={task.id}>
                                                            <TableCell style={{ width: "10%" }}>
                                                                <Checkbox checked={task.taskComplete} onChange={() => handleTaskToggleCompletion(task.id)} />
                                                            </TableCell>
                                                            <TableCell style={{ width: "70%", paddingLeft: 32 }}>
                                                                {editingTaskId === task.id ? (
                                                                    <TextField
                                                                        fullWidth
                                                                        value={editingTaskDescription}
                                                                        onChange={(e) => setEditingTaskDescription(e.target.value)}
                                                                    />
                                                                ) : (
                                                                    task.description
                                                                )}
                                                            </TableCell>
                                                            <TableCell style={{ width: "20%" }}>
                                                                {editingTaskId === task.id ? (
                                                                    <Button onClick={() => handleSaveEditedTask(task.id)}>Save</Button>
                                                                ) : (
                                                                    <Button onClick={() => handleEditTaskClick(task)}>Edit</Button>
                                                                )}
                                                                <Button onClick={() => removeTask(task.id)}>Delete</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}

                                                    {/* New Task Row */}
                                                    {addingTaskForStep === step.id && (
                                                        <TableRow>
                                                            <TableCell>
                                                                <Checkbox disabled />
                                                            </TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    fullWidth
                                                                    value={newTaskDescription}
                                                                    onChange={(e) => setNewTaskDescription(e.target.value)}
                                                                    placeholder="Enter task description"
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button
                                                                    onClick={() => handleSaveTask(step.id)}
                                                                    variant="contained"
                                                                    color="primary"
                                                                >
                                                                    Save Task
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}

                        {/* New Step Row */}
                        {isAddingStep && (
                            <TableRow>
                                <TableCell>
                                    <Checkbox disabled />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        value={newStepDescription}
                                        onChange={(e) => setNewStepDescription(e.target.value)}
                                        placeholder="Enter step description"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button onClick={handleSaveStep} variant="contained" color="primary">Save Step</Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default MainList;
