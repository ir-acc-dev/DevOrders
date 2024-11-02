# Fullstack Roadmap \- Task App

**Description**  
This is the reference doc that I created and will develop into an app for JM's class, but it should also help serve as a roadmap for people that want a reference on how to set up a full stack app. It walks you through how to create a to do list application that utilizes all CRUD APIs. I’m very open to suggestions on what else I can include to make my final app better. If you have any questions let me know. 

**Source Code** \- for application being developed in this doc

- [https://github.com/ir-acc-dev/Tutorial-SWF](https://github.com/ir-acc-dev/Tutorial-SWF)  
- If you’re confused about some of the code snippets below, this repo has all the code for my app

# Backend

## 1. Backend Setup

   1. Go to Spring Initializer(https://start.spring.io/)  
      1. You only need to update the following:  
         1. Artifact (will also update Name)  
      2. Add the Following Dependencies   
         1. Spring Web  
         2. Spring Data JPA  
         3. PostgreSQL Driver  
         4. Flyway Migration  
         5. Lombok   
   2. Open project on IntelliJ  
   3. Check build.gradle dependencies \- it should look like this

```java
dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	implementation 'org.flywaydb:flyway-core'
	implementation 'org.flywaydb:flyway-database-postgresql'
	compileOnly 'org.projectlombok:lombok'
	runtimeOnly 'org.postgresql:postgresql'
	annotationProcessor 'org.projectlombok:lombok'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
	testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
}
```

 ## 2. Create Docker Container

   1. Create a docker-compose.yaml file \- it should look like this, update the following:  
      1. Container\_name  
      2. POSTGRES\_USER  
      3. POSTGRES\_PASSWORD  
      4. POSTGRES\_DB  
      5. Ports \- the first set of 4 numbers (Always keep 2nd Port 5432\)

```java
version: "3.8"
services:
  postgres-db:
    container_name: tutorial
    image: postgres # use latest official postgres version
    restart: always
    environment:
      POSTGRES_USER: tutorial
      POSTGRES_PASSWORD: tutorial
      POSTGRES_DB: tutorial
      POSTGRES_HOST_AUTH_METHOD: password
    ports:
      - "5436:5432"

volumes:
  postgresql_data:
    driver: local
```

   2. Run “docker compose up \-d” in your terminal  
   3. Check container creation on Docker app  
      1. It should be green and active

## 3. Configure IntelliJ for Database

   1. Add Database to IntelliJ  
   2. Create application.yaml in src → main → resources. Update the following based off Docker config file  
      1. Name  
      2. Url ending(jdbc:postgresql://localhost:XXXX/name)  
      3. Username  
      4. Password 

```java
spring:
  application:
    name: tutorial

  datasource:
    url: jdbc:postgresql://localhost:5436/tutorial
    driver-class-name: org.postgresql.Driver
    username: tutorial
    password: tutorial
  flyway:
    enabled: true
    locations: classpath:db/migration
    jpa:
      generate-ddl: false
      hibernate:
        ddl-auto: none
  server:
    port: 8080
```

   3. Build application \- ensure there are no errors  
      1. Run “./gradlew bR” in terminal

## 4. Create Entity and Table

   1. Create the following folder structure for your application  
      1. Src → main → java → com.example.Name →  
         1. Controller   
         2. Entity  
         3. Repository   
         4. Service   
   2. Ensure it has @Entity, @Table, @Id \- these are the annotations that help Spring Boot associate your entity with a table

```java
package com.example.Tutorial.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private boolean taskComplete;
    
}
```

   3. If your Entity is annotated properly you should see a database icon next to your class Name  
      1. Click on database icon  
      2. Click “Flyway Init Migration”  
      3. Click ok in the pop up first screen  
      4. Name your migration   
      5. Your table should now populate in your database, ensure you assign it to the data source you want

## 5. Create Repository

   1. The repo must be an interface

```java
package com.example.Tutorial.repository;

import com.example.Tutorial.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
```

## 6. Create Task API

   1. Service \- .save

```java
package com.example.Tutorial.service;

import com.example.Tutorial.entity.Task;
import com.example.Tutorial.repository.TaskRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }
}
```

   2. Controller \- @PostMapping

```java
package com.example.Tutorial.controller;

import com.example.Tutorial.entity.Task;
import com.example.Tutorial.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task newTask = taskService.createTask(task);
        return new ResponseEntity<>(newTask, HttpStatus.CREATED);
    }
}
```

   3. Client \- POST

```java
POST http://localhost:8080/api/tasks
Content-Type: application/json

{
  "description": "Third task",
  "taskComplete": true
}
```

## 7. Get All Tasks API

   1. Service \- .findAll

```java
public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
```

   2. Controller \- @GetMapping

```java
@GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }
```

   3. Client \- GET

```java
### Get All Lists
GET http://localhost:8080/api/tasks
```

## 8. Get Task By Id API

   1. Service \- .findById

```java
public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }
```

   2. Controller \- @GetMapping({id})

```java
@GetMapping ("{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Task specificTask = taskService.getTaskById(id);
        return ResponseEntity.ok(specificTask);
    }
```

   3. Client \- GET

```java
### Get Specifc Task
GET http://localhost:8080/api/tasks/1
```

## 9. Delete Task API

   1. Service \- .delete

```java
public void deleteTaskById(Long id) {
        taskRepository.deleteById(id);
    }
```

   2. Controller \- @DeleteMapping

```java
@DeleteMapping("{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        taskService.deleteTaskById(id);
        return ResponseEntity.ok("Task deleted");
    }
```

   3. Client \- DELETE

```java
### Delete Task
DELETE http://localhost:8080/api/tasks/1
```

## 10. Update Task API

    1. Service \- .findById and .save

```java
public Task updateTask(Task updatedTask, Long id) {
        Task existingTask = taskRepository.findById(id).orElse(null);
        existingTask.setDescription(updatedTask.getDescription());
        existingTask.setTaskComplete(updatedTask.isTaskComplete());
        return taskRepository.save(existingTask);
    }
```

    2. Controller \- @PutMapping

```java
@PutMapping("{id}")
    public ResponseEntity<Task> updateTask(@RequestBody Task task, @PathVariable Long id) {
        Task updatedTask = taskService.updateTask(task, id);
        return ResponseEntity.ok(updatedTask);
    }
```

    3. Client \- PUT

```java
### Update Task
PUT http://localhost:8080/api/tasks/2
Content-Type: application/json

{
  "description": "updated task",
  "taskComplete": false

}
```

## 11. Toggle Completion API

```java
public Task toggleCompletion(Long id) {
        Task existingTask = taskRepository.findById(id).orElse(null);
        existingTask.setTaskComplete(!existingTask.isTaskComplete());
        return taskRepository.save(existingTask);
    }
```

```java
@PutMapping("{id}/complete")
    public ResponseEntity<Task> toggleCompletion(@PathVariable Long id) {
        Task updatedTaskCompletion = taskService.toggleCompletion(id);
        return ResponseEntity.ok(updatedTaskCompletion);
    }
```

```java
### Update Task Completion
PUT http://localhost:8080/api/tasks/4/complete
```

# Frontend

## 1. Frontend Setup

   1. CD into main directory and create “frontend” folder

```c
yarn create vite frontend
cd frontend
yarn
yarn run dev
```

   2. Install the following dependencies

```c
yarn add @mui/material @emotion/react @emotion/styled
yarn add @mui/material @mui/styled-engine-sc styled-components
yarn add axios
yarn add react-router-dom
```

   3. Clear out App and Main CSS  
   4. Clear out App.jsx \- display something so you can test proper rendering

```c
import './App.css'

function App() {

  return (
    <>
        <h1>App Component</h1>
    </>
  )
}

export default App

```

   5. Change title name in index.html

## 2. Create Components 

   1. Create a components folder in your src directory  
      1. Home.jsx  
      2. Header.jsx  
      3. List.jsx  
      4. ModifyDetails.jsx  
   2. Add an h1 in all of the components so you can test they are rendering (“rsc” on IntelliJ is a shortcut to create the frame of a component)

## 3. Configure App Routing

   1. Add routes in APP

```c
import './App.css'
import Header from "./components/Header.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home.jsx";
import List from "./components/List.jsx";
import ModifyDetails from "./components/ModifyDetails.jsx";

function App() {

  return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/tasks' element={<List />}></Route>
                <Route path='/add-task' element={<ModifyDetails />}></Route>
                <Route path='/edit-task/:id' element={<ModifyDetails/>}></Route>
            </Routes>
        </BrowserRouter>
  )
}

export default App
```

   2. Create navbar in HEADER page

```java
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <Box sx={{ marginBottom: 4 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}> App Name </Typography>

                    <Box sx={{ display: 'flex' }}>
                        <Button component={NavLink} to="/" color="inherit"  sx={{ textTransform: 'none' }}> Home </Button>
                        <Button component={NavLink} to="/tasks" color="inherit" sx={{ textTransform: 'none' }}> Tasks </Button>
                    </Box>

                </Toolbar>
            </AppBar>

        </Box>

    );
};

export default Header;
```

## 4. Add Theme (Optional)

   1. Create a Theme.jsx file in your assets folder  
   2. This is the theme I like to use

```c
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FFCC01',
        },
        secondary: {
            main: '#3f423f',
        },
    },
});

const Theme = ({ children }) => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default Theme;
```

   3. Update your main.jsx to implement the theme

```c
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Theme from "./assets/Theme.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Theme>
          <App />
      </Theme>
  </StrictMode>,
)
```

## 5. Get All Tasks REST API Implementation

   1. Go to LIST  
   2. Create a table and dummy data to map rows into

```c
import {Box, Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";

const List = () => {

    // Example mock data for Task array
    const tasks = [
        { id: 1, description: "Set up project structure", taskComplete: false },
        { id: 2, description: "Implement API integration", taskComplete: true },
        { id: 3, description: "Design user interface", taskComplete: false },
    ];

    return (
        <div>
            <Box>
                {/* Title and Button Box */}
                <Box>
                    <Typography variant="h4" className="title">Travel Entries</Typography>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Task Completion</TableCell>
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
        </div>
    );
};

export default List;
```

   3. Create Client.js in your src folder  
   4. Write Get All API \- refer to your Controller to ensure proper routing

*Client.js*

```c
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/tasks'

export const getAllTasks = () => axios.get(BASE_URL);
```

5. Call GetAll API in List.jsx and have data populate in table  
   

*Additions to List.jsx*

```c
const [tasks, setTasks] = useState([])

    const listAllTasks = async () => {
        getAllTasks()
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        listAllTasks();
    }, []);
```

## 6. Create Task REST API Implementation

   1. Create “Add Entry” button in LIST and have it navigate to MODIFY  
   2. Create a form in ModifyDetails.jsx  
   3. Write a POST API  
   4. Call POST in the ModifyDetails.jsx page (through the Submit button) \- ensure it navigates back to List.jsx

```c
import { useState } from 'react';
import { Container, Typography, Box, TextField, Button} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {createTask} from "../Client.js";

const ModifyDetails = () => {

    const [description, setDescription] = useState('');
    const taskComplete = false;
    const navigator = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {description, taskComplete};

        createTask(newTask)
            .then((response) => {
                console.log(response.data);
                navigator("/tasks");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Modify</Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <TextField
                    label="Task Description"
                    placeholder="What is the task?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Box>
        </Container>
    );
};

export default ModifyDetails;
```

## 7. Delete Task API Implementation

   1. Write Delete API

```c
export const deleteTask = (id) => axios.delete(BASE_URL + "/" + id);
```

   2. Call in LIST

```c
const removeTask = (id) => {
        deleteTask(id)
            .then(() => {
                listAllTasks();
            })
            .catch((error) => {
                console.error(error);
            });
    };

<Button onClick={() => {removeTask(task.id)}}>Delete</Button>
```

## 8. Get Task By ID REST API Implementation

   1. Write GetById API

```c
export const getTaskById = (id) => axios.get(BASE_URL + "/" + id);
```

   2. Call GetById in List.jsx when clicking the edit button to have data pre-populate when navigating to the ModifyDetails.jsx page 

```java
In List.jsx
<Button onClick={() => viewDetails(task.id)}>Edit</Button> 

const viewDetails = (id) => {
        navigator(`/edit-task/${id}`)
    };

In ModifyDetails.jsx
const {id} = useParams();

    useEffect(() => {
        if(id) {
            getTaskById(id).then((response) => {
                setDescription(response.data.description);
            }).catch((error) => {
                console.error(error)
            })
        }
    }, [id]);
```

## 9. Update Task API Implementation

   1. Write Update API

```java
export const updateTask = (task, id) => axios.put(BASE_URL + "/" + id, task)
```

   2. Call in ModifyDetails.jsx then navigate back to List.jsx \- updated ModifyDetails.jsx  
      

*Additions to ModifyDetails.jsx*

```c
const {id} = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {description, taskComplete};

        if(id) {
            updateTask(newTask, id).then((response) => {
                console.log(response.data)
                navigator("/tasks")
            }).catch((error) => {
                console.error(error)
            })
        } else {
            createTask(newTask)
                .then((response) => {
                    console.log(response.data);
                    navigator("/tasks");
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };
```

## 10. Toggle Completion API Implementation 

    1. Write toggleCompletionAPI

```c
export const toggleCompletion = (id) => axios.put(BASE_URL + "/" + id + "/complete")
```

    2. Implement in List.jsx app

*Additions to List.jsx*

```c
<Checkbox checked={task.taskComplete} onChange={() => handleToggleCompletion(task.id)} />const handleToggleCompletion = (id) => {
        toggleCompletion(id)
            .then((response) => {
                const updatedTask = response.data;
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === id ? { ...task, taskComplete: updatedTask.taskComplete } : task
                    )
                );
            })
            .catch((error) => {
                console.error("Error toggling completion:", error);
            });
    };
```

## 11. Styling \- Up to Your Personal Preference 

    1. Add Theme  
    2. Build Hero Section  
    3. Add Desired CSS