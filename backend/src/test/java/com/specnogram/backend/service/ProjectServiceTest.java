package com.specnogram.backend.service;

import com.specnogram.backend.model.Project;
import com.specnogram.backend.repository.ProjectRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mockito;

import java.util.Optional;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class ProjectServiceTest {

    private ProjectRepository projectRepository;
    private ProjectService projectService;

    @BeforeEach
    void setUp() {
        projectRepository = mock(ProjectRepository.class);
        projectService = new ProjectService(projectRepository);
    }

    @Test
    void testGetAllProjects() {
        List<Project> mockProjects = List.of(new Project(), new Project());
        when(projectRepository.findAll()).thenReturn(mockProjects);

        List<Project> result = projectService.getAllProjects();
        assertEquals(2, result.size());
        verify(projectRepository, times(1)).findAll();
    }

    @Test
    void testGetProjectById() {
        Project project = new Project();
        project.setProjectId(1);
        when(projectRepository.findById(1)).thenReturn(Optional.of(project));

        Optional<Project> result = projectService.getProjectById(1);
        assertTrue(result.isPresent());
        assertEquals(1, result.get().getProjectId());
    }

    @Test
    void testCreateProject() {
        Project project = new Project();
        when(projectRepository.save(project)).thenReturn(project);

        Project result = projectService.createProject(project);
        assertEquals(project, result);
        verify(projectRepository, times(1)).save(project);
    }

    @Test
    void testDeleteProject() {
        doNothing().when(projectRepository).deleteById(1);
        projectService.deleteProject(1);
        verify(projectRepository, times(1)).deleteById(1);
    }
}
