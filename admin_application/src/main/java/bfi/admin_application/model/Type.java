package bfi.admin_application.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Type {

    @Id
    @GeneratedValue
    private Integer Id;
    @Column(unique = true)
    private String name;


    public Type(){}

    public Type(String name){
        this.name = name;
    }

    public Integer getId(){
        return this.Id;
    }

    public String getName(){
        return this.name;
    }

    public void setName(String name){
        this.name = name;
    }
    
}
