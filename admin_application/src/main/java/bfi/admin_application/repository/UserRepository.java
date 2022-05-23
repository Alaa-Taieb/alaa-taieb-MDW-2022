package bfi.admin_application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import bfi.admin_application.model.User;

public interface UserRepository extends JpaRepository<User , Integer>{
    User findByLogin(String username);
}
