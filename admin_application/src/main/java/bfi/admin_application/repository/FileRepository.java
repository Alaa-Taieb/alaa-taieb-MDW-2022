package bfi.admin_application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bfi.admin_application.model.FileEntity;

public interface FileRepository extends JpaRepository<FileEntity , Integer> {
    
    
    
}
