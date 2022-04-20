package bfi.admin_application.Users;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class test {
    @Id
    @GeneratedValue
    private String Id;
    @Column(unique=true)
    private String name;
}
