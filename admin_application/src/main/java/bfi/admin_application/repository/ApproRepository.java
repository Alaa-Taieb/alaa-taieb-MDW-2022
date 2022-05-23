package bfi.admin_application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bfi.admin_application.model.Appro;
import bfi.admin_application.model.Material;

public interface ApproRepository extends JpaRepository<Appro , Integer> {
    public Iterable<Appro> findByMaterial(Material material);
}
