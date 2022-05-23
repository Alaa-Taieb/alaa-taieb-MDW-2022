package bfi.admin_application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bfi.admin_application.model.Type;

public interface TypeRepository extends JpaRepository<Type , Integer> {
    public Type findByName(String name);
}
