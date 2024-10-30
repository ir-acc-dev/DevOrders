package com.example.DevOrders.service;

import com.example.DevOrders.entity.Step;
import com.example.DevOrders.entity.Task;
import com.example.DevOrders.repository.StepRepository;
import com.example.DevOrders.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StepService {

    @Autowired
    private StepRepository stepRepository;

    @Autowired
    private TaskRepository taskRepository;

    // Method to create a new step
    public Step createStep(Step step) {
        return stepRepository.save(step);
    }

    // Method to get all steps
    public List<Step> getAllSteps() {
        return stepRepository.findAll();
    }

    // Method to get a specific step by ID
    public Optional<Step> getStepById(Long id) {
        return stepRepository.findById(id);
    }

    // Method to add a task to a specific step
    public Task addTaskToStep(Long stepId, Task task) {
        Optional<Step> optionalStep = stepRepository.findById(stepId);
        if (optionalStep.isPresent()) {
            Step step = optionalStep.get();
            step.getTasks().add(task); // Add the task to the step's task list
            stepRepository.save(step);  // Save the updated step
            return task; // Return the added task
        }
        throw new RuntimeException("Step not found");
    }

    // Method to update a step description
    public Step updateStepDescription(Long id, String stepDescription) {
        Step step = stepRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Step not found"));
        step.setDescription(stepDescription);
        return stepRepository.save(step);
    }

    // Method to update a task description
    public Task updateTaskDescription(Long id, String taskDescription) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setDescription(taskDescription);
        return taskRepository.save(task);
    }

    // Method to toggle step completion
    public Step toggleStepCompletion(Long stepId) {
        Step step = stepRepository.findById(stepId)
                .orElseThrow(() -> new RuntimeException("Step not found"));
        step.setStepComplete(!step.getStepComplete());
        return stepRepository.save(step);
    }

    // Method to toggle task completion
    public Task toggleTaskCompletion(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setTaskComplete(!task.getTaskComplete());
        return taskRepository.save(task);
    }

    // Method to delete a step
    public void deleteStep(Long stepId) {
        if(!stepRepository.existsById(stepId)) {
            throw new RuntimeException("Step not found");
        }
        stepRepository.deleteById(stepId);
    }

    // Method to delete a task
    public void deleteTask(Long taskId) {
        if(!taskRepository.existsById(taskId)) {
            throw new RuntimeException("Task not found");
        }
        taskRepository.deleteById(taskId);
    }

}
