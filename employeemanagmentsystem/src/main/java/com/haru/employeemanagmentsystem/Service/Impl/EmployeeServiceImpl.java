package com.haru.employeemanagmentsystem.Service.Impl;

import com.haru.employeemanagmentsystem.DTO.EmployeeDTO;
import com.haru.employeemanagmentsystem.Entities.Employee;
import com.haru.employeemanagmentsystem.Exception.ResourceNotFoundException;
import com.haru.employeemanagmentsystem.Mapper.EmployeeMapper;
import com.haru.employeemanagmentsystem.Repository.EmployeeRepository;
import com.haru.employeemanagmentsystem.Service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDTO createEmployee(EmployeeDTO employee) {
        Employee employee1 = EmployeeMapper.mapToEmployee(employee);
        Employee savedEmployee = employeeRepository.save(employee1);
        return EmployeeMapper.mapToEmployeeDTO(savedEmployee);
    }

    @Override
    public EmployeeDTO getEmployee(Long employeeId) {
        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee Not Found With Id : " + employeeId));
        return EmployeeMapper.mapToEmployeeDTO(employee);
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        List<EmployeeDTO> employees = employeeRepository.findAll()
                .stream().map(EmployeeMapper::mapToEmployeeDTO)
                .toList();

        return employees;
    }

    @Override
    public EmployeeDTO updateEmployee(long employeeId, EmployeeDTO employeeDTO) {
        Employee oldEmployee = employeeRepository.findById(employeeId).
                orElseThrow(() -> new ResourceNotFoundException("Employee Not Found With Id : " + employeeId));
        oldEmployee.setFirstName(employeeDTO.getFirstName());
        oldEmployee.setLastName(employeeDTO.getLastName());
        oldEmployee.setEmail(employeeDTO.getEmail());
        Employee updatedEmployee = employeeRepository.save(oldEmployee);
        return EmployeeMapper.mapToEmployeeDTO(updatedEmployee);
    }

    @Override
    public List<EmployeeDTO> insertAllEmployee(List<EmployeeDTO> employees) {
        List<Employee> employeeInsertions = employees.stream().map(EmployeeMapper::mapToEmployee).toList();
        List<Employee> savedEmployees = employeeRepository.saveAll(employeeInsertions);
        return savedEmployees.stream().map(EmployeeMapper::mapToEmployeeDTO).collect(Collectors.toList());
    }

    @Override
    public void deleteEmployee(long employeeId) {
        Employee oldEmployee = employeeRepository.findById(employeeId).
                orElseThrow(() -> new ResourceNotFoundException("Employee Not Found With Id : " + employeeId));
        employeeRepository.deleteById(employeeId);
    }

}
