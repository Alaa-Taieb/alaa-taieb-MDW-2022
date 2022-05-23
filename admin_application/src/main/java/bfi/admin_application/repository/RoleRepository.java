package bfi.admin_application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bfi.admin_application.model.Role;


public interface RoleRepository extends JpaRepository<Role , Integer>{
    public Role findByName(String name);
    
}
