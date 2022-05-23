package bfi.admin_application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bfi.admin_application.model.Material;

public interface MaterialRepository extends JpaRepository<Material , Integer> {

    
    
}
