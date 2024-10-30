package com.example.DevOrders.service;

import com.example.DevOrders.repository.StepRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class StepService {

    private final StepRepository stepRepository;


}
