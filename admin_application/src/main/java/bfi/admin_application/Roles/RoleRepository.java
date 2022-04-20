package bfi.admin_application.Roles;

import bfi.admin_application.Roles.Role;

import org.springframework.data.jpa.repository.JpaRepository;


public interface RoleRepository extends JpaRepository<Role , Integer>{
    public Role findByName(String name);
    
}
