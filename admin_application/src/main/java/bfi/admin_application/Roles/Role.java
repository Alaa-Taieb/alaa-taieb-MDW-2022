package bfi.admin_application.Roles;

import bfi.admin_application.Users.User;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
public class Role {
    
    @Id
    @GeneratedValue
    private Integer Id;

    

    private String name;

    
    

    public Role (String name){
        this.name = name;
    }

    public Role (){
    }

    public Integer getId(){
        return this.Id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    /*public List<User> getUsers(){
        return users;
    }

    public void setUsers(List<User> users){
        this.users = users;
    }*/
}
