package com.haru.employeemanagmentsystem.Repository;

import com.haru.employeemanagmentsystem.Entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
