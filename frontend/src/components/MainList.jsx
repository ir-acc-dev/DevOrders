import {Box, Button, Checkbox, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import React, {useEffect, useState} from "react";
import {addStep, getAllSteps} from "../assets/Client.js";

const MainList = () => {

    const [expandedRows, setExpandedRows] = useState({});
    const [steps, setSteps] = useState([]);
    const [isAddingStep, setIsAddingStep] = useState(false);
    const [newStepDescription, setNewStepDescription] = useState("");

    const listAllSteps = async () => {
        getAllSteps()
            .then((res) => {
                setSteps(res.data);
            }).catch((err) => {console.error(err)})
    }

    useEffect(() => {
        listAllSteps();
    }, [])


    const handleExpandClick = (id) => {
        setExpandedRows((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleAddStep = () => {
        setIsAddingStep(true);
    }

    const handleSaveStep = async () => {
        try {
            const newStep = {description: newStepDescription, stepComplete: false};
            const response = await addStep(newStep);
            setSteps((prevSteps) => [...prevSteps, response.data]);
            setNewStepDescription("");
            setIsAddingStep(false);
        } catch (err) {
            console.error("Failed to add Step", err);
        }
    }

    return (
        <Box>
            <Typography variant="h4">List</Typography>
            <Button onClick={handleAddStep} variant = "contained" color="primary" style={{ margin: '10px 0' }}>
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
                                {/* Main Step Row */}
                                <TableRow className="table-row">
                                    <TableCell>
                                        <Checkbox checked={step.stepComplete} />
                                    </TableCell>
                                    <TableCell>{step.description}</TableCell>
                                    <TableCell>
                                        <Button>Edit</Button>
                                        <Button>Delete</Button>
                                        <IconButton onClick={() => handleExpandClick(step.id)}>
                                            {expandedRows[step.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>

                                {/* Task Rows */}
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                                        <Collapse in={expandedRows[step.id]} timeout="auto" unmountOnExit>
                                            <Table size="small" aria-label="tasks">
                                                <TableBody>
                                                    {step.tasks.map((task) => (
                                                        <TableRow key={task.id}>
                                                            <TableCell style={{ width: "10%" }}>
                                                                <Checkbox
                                                                    checked={task.taskComplete}
                                                                />
                                                            </TableCell>
                                                            <TableCell style={{ width: "70%", paddingLeft: 32 }}>{task.description}</TableCell>
                                                            <TableCell style={{ width: "20%" }}>
                                                                <Button>Edit</Button>
                                                                <Button>Delete</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}

                        {/*New Step Row*/}
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
                                        placeholder="Enter step description" />
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
