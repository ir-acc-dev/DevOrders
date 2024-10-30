package com.example.DevOrders.repository;

import com.example.DevOrders.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
