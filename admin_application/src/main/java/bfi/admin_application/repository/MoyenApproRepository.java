package bfi.admin_application.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import bfi.admin_application.model.MoyenAppro;

public interface MoyenApproRepository extends JpaRepository<MoyenAppro , Integer>{
    public MoyenAppro findByName(String name);
}
