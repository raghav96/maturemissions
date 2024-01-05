package com.main.maturemissions;

import com.main.maturemissions.model.MedicalInfo;
import com.main.maturemissions.model.User;
import com.main.maturemissions.repository.MedicalInfoRepository;
import com.main.maturemissions.repository.UsersRepository;
import com.main.maturemissions.service.MedicalInfoServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import static org.mockito.Mockito.*;

@SpringBootTest
public class MedicalInfoServiceTest {

    @InjectMocks
    private MedicalInfoServiceImpl medicalInfoService;

    @Mock
    private MedicalInfoRepository medicalInfoRepository;

    @Mock
    private UsersRepository usersRepository;

    @Test
    public void testAddMedicalInfo() {
        when(usersRepository.getReferenceById(anyLong())).thenReturn(new User());

        String response = medicalInfoService.addMedicalInfo(1L, "contact", "relation", 123, "conditions", "mobility", "devices", "allergies", "diet", "doctor", 456, "medications", "preferences", 789L);

        verify(medicalInfoRepository, times(1)).save(any(MedicalInfo.class));
        // Add more assertions based on your business logic and expected outcome.
    }

    @Test
    public void testGetMedicalInfo() {
        when(medicalInfoRepository.findMedicalInfoByUser(any(User.class))).thenReturn(new MedicalInfo());

        String response = medicalInfoService.getMedicalInfo(new User());

        verify(medicalInfoRepository, times(1)).findMedicalInfoByUser(any(User.class));
        // Add assertions to check the content of the response.
    }

    // Consider adding more test cases for scenarios like:
    // - What happens if `medicalInfoRepository.findMedicalInfoByUser()` returns null?
    // - Handling exceptions if something goes wrong during the database operations.
}

