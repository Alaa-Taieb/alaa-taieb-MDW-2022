package bfi.admin_application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bfi.admin_application.model.BulletinS;
import bfi.admin_application.model.User;

public interface BulletinSRepository extends JpaRepository<BulletinS , Integer> {
    public Iterable<BulletinS> findByUser(User user);
    
}
