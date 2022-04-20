package bfi.admin_application.Users;

import bfi.admin_application.Roles.Role;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
public class User {
    
    @Id 
    @GeneratedValue
    private Integer Id;

    private String name;
    private String secondName;
    @Temporal(TemporalType.TIMESTAMP)
    private Date birthday;
    private String email;
    private String phoneNumber;
    @Column(unique = true)
    private String login;
    private String password;

    
    @ManyToOne
    @Cascade(CascadeType.PERSIST)
    private Role role;

    public User(){
    }

    public User(String name , 
                String secondName , 
                Date birthday , 
                String email , 
                String phoneNumber , 
                String login , 
                String password
                ){
        this.name = name;
        this.secondName = secondName;
        this.birthday = birthday;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.login = login;
        this.password = password;
        
    }

    public Integer getId(){
        return Id;
    }

    public void setId(Integer id){
        this.Id = id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getSecondName(){
        return secondName;
    }

    public void setSecondName(String secondName){
        this.secondName = secondName;
    }

    public Date getBirthday(){
        return birthday;
    }

    public void setBirthday(Date birthday){
        this.birthday = birthday;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getPhoneNumber(){
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber){
        this.phoneNumber = phoneNumber;
    }

    public Role getRole(){
        return role;
    }

    public void setRole(Role role){
        this.role = role;
    }

    public String getLogin(){
        return login;
    }

    public void setLogin(String login){
        this.login = login;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }


}
