package com.haru.employeemanagmentsystem.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Component
public class EmployeeDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;

}
