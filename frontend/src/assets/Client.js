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

export const toggleStepCompletion = (id) => axios.put(BASE_URL + "/" + id + "/toggle-completion");


// @PutMapping("/{id}/toggle-completion")
// public ResponseEntity<Step> toggleStepCompletion(@PathVariable Long id) {
//     try{
//         Step updatedStep = stepService.toggleStepCompletion(id);
//         return new ResponseEntity<>(updatedStep, HttpStatus.OK);
//     }catch (RuntimeException e) {
//         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//     }
// }




