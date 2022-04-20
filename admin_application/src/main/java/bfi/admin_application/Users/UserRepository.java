package bfi.admin_application.Users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import bfi.admin_application.Users.User;

public interface UserRepository extends JpaRepository<User , Integer>{
    User findByLogin(String username);
}
