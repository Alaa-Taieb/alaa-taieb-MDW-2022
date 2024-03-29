package bfi.admin_application.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.JoinColumn;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.Cascade;

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

    
    @ManyToOne(cascade = CascadeType.ALL)
    private Role role;

    // @ManyToMany(mappedBy = "users_invited" , cascade = {CascadeType.MERGE})
    // // @JoinTable(
    // // name = "reunionInvited", 
    // // joinColumns = @JoinColumn(name = "user_id"), 
    // // inverseJoinColumns = @JoinColumn(name = "reunion_id"), 
    // // uniqueConstraints = @UniqueConstraint(columnNames = {"reunion_id", "user_id" }))
    // private List<Reunion> reunion_invited = new ArrayList<Reunion>();

    // @ManyToMany(mappedBy = "users_assisted" , cascade = {CascadeType.MERGE})
    // // @JoinTable(
    // // name = "reunionAssisted", 
    // // joinColumns = @JoinColumn(name = "user_id"), 
    // // inverseJoinColumns = @JoinColumn(name = "reunion_id"), 
    // // uniqueConstraints = @UniqueConstraint(columnNames = {"reunion_id", "user_id" }))
    // private List<Reunion> reunion_assisted = new ArrayList<Reunion>();
    

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

    

    

    // public List<Reunion> getReunion_invited() {
    //     return reunion_invited;
    // }

    // public void setReunion_invited(ArrayList<Reunion> reunion_invited) {
    //     this.reunion_invited = reunion_invited;
    // }

    // public List<Reunion> getReunion_assisted() {
    //     return reunion_assisted;
    // }

    // public void setReunion_assisted(ArrayList<Reunion> reunion_assisted) {
    //     this.reunion_assisted = reunion_assisted;
    // }

    public Integer getId(){
        return Id;
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
