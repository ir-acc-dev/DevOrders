package com.example.DevOrders.controller;

import com.example.DevOrders.entity.Step;
import com.example.DevOrders.entity.Task;
import com.example.DevOrders.service.StepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/steps")
public class StepController {

    @Autowired
    private StepService stepService;

    // Endpoint to create a new step
    @PostMapping
    public ResponseEntity<Step> createStep(@RequestBody Step step) {
        Step createdStep = stepService.createStep(step);
        return new ResponseEntity<>(createdStep, HttpStatus.CREATED);
    }

    // Endpoint to get all steps
    @GetMapping
    public ResponseEntity<List<Step>> getAllSteps() {
        List<Step> steps = stepService.getAllSteps();
        return new ResponseEntity<>(steps, HttpStatus.OK);
    }

    // Endpoint to get a specific step by ID
    @GetMapping("/{id}")
    public ResponseEntity<Step> getStepById(@PathVariable Long id) {
        return stepService.getStepById(id)
                .map(step -> new ResponseEntity<>(step, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Endpoint to add a task to a specific step
    @PostMapping("/{id}/tasks")
    public ResponseEntity<Task> addTask(@PathVariable Long id, @RequestBody Task task) {
        try {
            Task createdTask = stepService.addTaskToStep(id, task);
            return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/des")
    public ResponseEntity<Step> updateStepDescription(@PathVariable Long id, @RequestBody String description) {
        try {
            Step updatedStep = stepService.updateStepDescription(id, description);
            return new ResponseEntity<>(updatedStep, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/tasks/{taskId}/des")
    public ResponseEntity<Task> updateTaskDescription(@PathVariable Long taskId, @RequestBody String description) {
        try {
            Task updatedTask = stepService.updateTaskDescription(taskId, description);
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        }catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/toggle-completion")
    public ResponseEntity<Step> toggleStepCompletion(@PathVariable Long id) {
        try{
            Step updatedStep = stepService.toggleStepCompletion(id);
            return new ResponseEntity<>(updatedStep, HttpStatus.OK);
        }catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/tasks/{taskId}/toggle-completion")
    public ResponseEntity<Task> toggleTaskCompletion(@PathVariable Long taskId) {
        try{
            Task updatedTask = stepService.toggleTaskCompletion(taskId);
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        }catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a Step
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStep(@PathVariable Long id) {
        try {
            stepService.deleteStep(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a Task
    @DeleteMapping("/tasks/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {
        try {
            stepService.deleteTask(taskId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
