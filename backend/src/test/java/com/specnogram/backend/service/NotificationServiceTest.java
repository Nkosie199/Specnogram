package com.specnogram.backend.service;

import com.specnogram.backend.model.Notification;
import com.specnogram.backend.repository.NotificationRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mockito;

import java.util.Optional;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class NotificationServiceTest {

    private NotificationRepository notificationRepository;
    private NotificationService notificationService;

    @BeforeEach
    void setUp() {
        notificationRepository = mock(NotificationRepository.class);
        notificationService = new NotificationService(notificationRepository);
    }

    @Test
    void testGetAllNotifications() {
        List<Notification> mockNotifications = List.of(new Notification(), new Notification());
        when(notificationRepository.findAll()).thenReturn(mockNotifications);

        List<Notification> result = notificationService.getAllNotifications();
        assertEquals(2, result.size());
        verify(notificationRepository, times(1)).findAll();
    }

    @Test
    void testGetNotificationById() {
        Notification notification = new Notification();
        notification.setNotificationId(1);
        when(notificationRepository.findById(1)).thenReturn(Optional.of(notification));

        Optional<Notification> result = notificationService.getNotificationById(1);
        assertTrue(result.isPresent());
        assertEquals(1, result.get().getNotificationId());
    }

    @Test
    void testCreateNotification() {
        Notification notification = new Notification();
        when(notificationRepository.save(notification)).thenReturn(notification);

        Notification result = notificationService.createNotification(notification);
        assertEquals(notification, result);
        verify(notificationRepository, times(1)).save(notification);
    }

    @Test
    void testDeleteNotification() {
        doNothing().when(notificationRepository).deleteById(1);
        notificationService.deleteNotification(1);
        verify(notificationRepository, times(1)).deleteById(1);
    }
}
