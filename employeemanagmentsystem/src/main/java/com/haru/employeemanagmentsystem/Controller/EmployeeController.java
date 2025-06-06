package com.haru.employeemanagmentsystem.Controller;

import com.haru.employeemanagmentsystem.DTO.EmployeeDTO;
import com.haru.employeemanagmentsystem.Service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/employeemanager/")
public class EmployeeController {
    private EmployeeService employeeService;

    @PostMapping("/createEmployee")
    public ResponseEntity<EmployeeDTO> createEmployee(@RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO savedEmployee = employeeService.createEmployee(employeeDTO);
        return new ResponseEntity<>(savedEmployee,HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable("id") Long id) {
        EmployeeDTO foundEmployee = employeeService.getEmployee(id);
        return new ResponseEntity<>(foundEmployee,HttpStatus.OK);
    }

    @GetMapping("/getEmployees")
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        List<EmployeeDTO> employees = employeeService.getAllEmployees();
        return new ResponseEntity<>(employees,HttpStatus.OK);
    }

    @PutMapping("/updateEmployee/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployee(@PathVariable("id") Long id,
                                                      @RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO updatedEmployee = employeeService.updateEmployee(id, employeeDTO);
        return new ResponseEntity<>(updatedEmployee,HttpStatus.OK);
    }

    @PostMapping("/insertAllEmployees")
    public ResponseEntity<List<EmployeeDTO>> insertAllEmployees(@RequestBody List<EmployeeDTO> employeeDTO) {
       List<EmployeeDTO> savedEmployees =  employeeService.insertAllEmployee(employeeDTO);
        return new ResponseEntity<>(savedEmployees,HttpStatus.OK);
    }

    @DeleteMapping("/deleteEmployee/{id}")
    public ResponseEntity<String> deleteEmployeeById(@PathVariable("id") Long id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>("Employee Deleted Successfully",HttpStatus.OK);
    }
}
