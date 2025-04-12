package com.specnogram.backend.service;

import com.specnogram.backend.model.Task;
import com.specnogram.backend.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mockito;

import java.util.Optional;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class TaskServiceTest {

    private TaskRepository taskRepository;
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        taskRepository = mock(TaskRepository.class);
        taskService = new TaskService(taskRepository);
    }

    @Test
    void testGetAllTasks() {
        List<Task> mockTasks = List.of(new Task(), new Task());
        when(taskRepository.findAll()).thenReturn(mockTasks);

        List<Task> result = taskService.getAllTasks();
        assertEquals(2, result.size());
        verify(taskRepository, times(1)).findAll();
    }

    @Test
    void testGetTaskById() {
        Task task = new Task();
        task.setTaskId(1);
        when(taskRepository.findById(1)).thenReturn(Optional.of(task));

        Optional<Task> result = taskService.getTaskById(1);
        assertTrue(result.isPresent());
        assertEquals(1, result.get().getTaskId());
    }

    @Test
    void testCreateTask() {
        Task task = new Task();
        when(taskRepository.save(task)).thenReturn(task);

        Task result = taskService.createTask(task);
        assertEquals(task, result);
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void testDeleteTask() {
        doNothing().when(taskRepository).deleteById(1);
        taskService.deleteTask(1);
        verify(taskRepository, times(1)).deleteById(1);
    }
}
