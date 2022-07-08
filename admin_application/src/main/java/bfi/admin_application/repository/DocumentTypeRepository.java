package bfi.admin_application.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import bfi.admin_application.model.DocumentType;

public interface DocumentTypeRepository extends JpaRepository<DocumentType , Integer> {
    public Optional<DocumentType> findByType(String type);
}
