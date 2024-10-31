package com.example.DevOrders.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="Step")
public class Step {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String description;

    private Boolean stepComplete;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "task_fk", referencedColumnName = "id")
    List<Task> tasks = new ArrayList<>();

    public Step(String description, Boolean stepComplete) {
        super();
        this.description = description;
        this.stepComplete = stepComplete;
    }

}
