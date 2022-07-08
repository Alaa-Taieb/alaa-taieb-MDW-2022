package bfi.admin_application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bfi.admin_application.model.Envoi;

public interface EnvoiRepository extends JpaRepository<Envoi , Integer>{
    
}
