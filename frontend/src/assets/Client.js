import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/steps';

export const getAllSteps = () => axios.get(BASE_URL);

export const addStep = (step) => axios.post(BASE_URL, step);

export const addTask = (id, task)  => axios.post(BASE_URL + "/" + id + "/" + "tasks", task);



// @PostMapping("/{id}/tasks")
// public ResponseEntity<Task> addTask(@PathVariable Long id, @RequestBody Task task) {
//     try {
//         Task createdTask = stepService.addTaskToStep(id, task);
//         return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
//     } catch (RuntimeException e) {
//         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//     }
// }