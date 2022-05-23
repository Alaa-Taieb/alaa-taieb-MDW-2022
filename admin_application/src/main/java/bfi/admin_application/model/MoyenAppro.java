package bfi.admin_application.model;

import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;

@Entity
public class MoyenAppro {

    @Id 
    @GeneratedValue
    private Integer Id;

    @Column(unique = true)
    private String name;


    public MoyenAppro(String name){
        this.name = name;
    }

    public MoyenAppro(){
        
    }

    public Integer getId() {
        return Id;
    }

    

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }



    
}
