package bfi.admin_application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bfi.admin_application.model.Appro;
import bfi.admin_application.model.SerialNumber;

public interface SerialNumberRepository extends JpaRepository<SerialNumber , Integer> {

    public Iterable<SerialNumber> findByAppro(Appro appro);
    
}
