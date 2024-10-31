import {
    Box, Button, Checkbox, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import React, {useEffect, useState} from "react";
import {getAllSteps} from "../assets/Client.js";

const MainList = () => {

    const [expandedRows, setExpandedRows] = useState({});
    const [steps, setSteps] = useState([]);

    const listAllSteps = async () => {
        getAllSteps()
            .then((res) => {
                setSteps(res.data);
            }).catch((err) => {console.error(err)})
    }

    useEffect(() => {
        listAllSteps();
    }, [])

    // const steps = [
    //     {
    //         id: 1,
    //         description: "Step 1",
    //         stepComplete: true,
    //         tasks: [
    //             { id: 1.1, description: "Task 1.1", taskComplete: false },
    //             { id: 1.2, description: "Task 1.2", taskComplete: false }
    //         ]
    //     },
    //     {
    //         id: 2,
    //         description: "Step 2",
    //         stepComplete: false,
    //         tasks: [
    //             { id: 2.1, description: "Task 2.1", taskComplete: true },
    //             { id: 2.2, description: "Task 2.2", taskComplete: false }
    //         ]
    //     }
    // ];

    const handleExpandClick = (id) => {
        setExpandedRows((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <Box>
            <Typography variant="h4">List</Typography>
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
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default MainList;
