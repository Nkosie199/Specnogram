package com.specnogram.backend.service;

import com.specnogram.backend.model.Role;
import com.specnogram.backend.repository.RoleRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mockito;

import java.util.Optional;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class RoleServiceTest {

    private RoleRepository roleRepository;
    private RoleService roleService;

    @BeforeEach
    void setUp() {
        roleRepository = mock(RoleRepository.class);
        roleService = new RoleService(roleRepository);
    }

    @Test
    void testGetAllRoles() {
        List<Role> mockRoles = List.of(new Role(), new Role());
        when(roleRepository.findAll()).thenReturn(mockRoles);

        List<Role> result = roleService.getAllRoles();
        assertEquals(2, result.size());
        verify(roleRepository, times(1)).findAll();
    }

    @Test
    void testGetRoleById() {
        Role role = new Role();
        role.setRoleId(1);
        when(roleRepository.findById(1)).thenReturn(Optional.of(role));

        Optional<Role> result = roleService.getRoleById(1);
        assertTrue(result.isPresent());
        assertEquals(1, result.get().getRoleId());
    }

    @Test
    void testCreateRole() {
        Role role = new Role();
        when(roleRepository.save(role)).thenReturn(role);

        Role result = roleService.createRole(role);
        assertEquals(role, result);
        verify(roleRepository, times(1)).save(role);
    }

    @Test
    void testDeleteRole() {
        doNothing().when(roleRepository).deleteById(1);
        roleService.deleteRole(1);
        verify(roleRepository, times(1)).deleteById(1);
    }
}
