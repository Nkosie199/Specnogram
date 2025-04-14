package com.specnogram.backend.repository;

import com.specnogram.backend.model.Task;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findByStatus(String status);
    List<Task> findByProjectId(Integer projectId);
}
