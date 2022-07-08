package bfi.admin_application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bfi.admin_application.model.Reunion;

public interface ReunionRepository extends JpaRepository<Reunion , Integer>{
    
}
