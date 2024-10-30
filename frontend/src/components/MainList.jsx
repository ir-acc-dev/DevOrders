import {Box, Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import React from "react";

const MainList = () => {

    const tasks = [
        {
            id: 1,
            description: "Task 1",
            taskComplete: true
        },
        {
            id: 2,
            description: "Task 2",
            taskComplete: false
        }
    ]

    return (

        <Box>

            <Typography variant="h4">List</Typography>

            <TableContainer component={Paper}>

                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>Completion Status</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id} className="table-row">
                                <TableCell>
                                    <Checkbox checked={task.taskComplete} />
                                </TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>
                                    <Button>Edit</Button>
                                    <Button>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>

            </TableContainer>

        </Box>


    );
};

export default MainList;