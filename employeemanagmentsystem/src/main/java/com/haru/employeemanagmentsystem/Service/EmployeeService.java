package com.haru.employeemanagmentsystem.Service;

import com.haru.employeemanagmentsystem.DTO.EmployeeDTO;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface EmployeeService {
    EmployeeDTO createEmployee(EmployeeDTO employee) ;
    EmployeeDTO getEmployee(Long employeeId);
    List<EmployeeDTO> getAllEmployees();
    EmployeeDTO updateEmployee(long employeeId,EmployeeDTO employeeDTO);
    List<EmployeeDTO> insertAllEmployee(List<EmployeeDTO> employeeDTOList);
    public void deleteEmployee(long employeeId);
}
