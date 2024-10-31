import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/steps';

export const getAllSteps = () => axios.get(BASE_URL);

export const addStep = (step) => axios.post(BASE_URL, step);

export const addTask = (id, task)  => axios.post(BASE_URL + "/" + id + "/" + "tasks", task);

export const updateStepDescription = (id, description) => {
    return axios.put(BASE_URL + "/" + id + "/des", description, {
        headers: {
            'Content-Type': 'text/plain'
        }
    });
};

export const updateTaskDescription = (id, description) => {
    return axios.put(BASE_URL + "/tasks/" + id + "/des", description, {
        headers: {
            'Content-Type': 'text/plain'
        }
    });
};


// @PutMapping("/tasks/{taskId}/des")
// public ResponseEntity<Task> updateTaskDescription(@PathVariable Long taskId, @RequestBody String description) {
//     try {
//         Task updatedTask = stepService.updateTaskDescription(taskId, description);
//         return new ResponseEntity<>(updatedTask, HttpStatus.OK);
//     }catch (RuntimeException e) {
//         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//     }
// }





