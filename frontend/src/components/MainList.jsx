import {
    Box, Button, Checkbox, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from "react";
import { addStep, getAllSteps, addTask } from "../assets/Client.js";

const MainList = () => {
    const [expandedRows, setExpandedRows] = useState({});
    const [steps, setSteps] = useState([]);
    const [isAddingStep, setIsAddingStep] = useState(false);
    const [newStepDescription, setNewStepDescription] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [addingTaskForStep, setAddingTaskForStep] = useState(null); // Stores the ID of the step we're adding a task for

    const listAllSteps = async () => {
        try {
            const res = await getAllSteps();
            setSteps(res.data);
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

    return (
        <Box>
            <Typography variant="h4">List</Typography>
            <Button onClick={handleAddStep} variant="contained" color="primary" style={{ margin: '10px 0' }}>
                Add Step
            </Button>

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
                                        <Checkbox checked={step.stepComplete} />
                                    </TableCell>
                                    <TableCell>{step.description}</TableCell>
                                    <TableCell>
                                        <Button>Edit</Button>
                                        <Button>Delete</Button>
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
                                                                <Checkbox checked={task.taskComplete} />
                                                            </TableCell>
                                                            <TableCell style={{ width: "70%", paddingLeft: 32 }}>{task.description}</TableCell>
                                                            <TableCell style={{ width: "20%" }}>
                                                                <Button>Edit</Button>
                                                                <Button>Delete</Button>
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
