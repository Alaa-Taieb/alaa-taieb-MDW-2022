package bfi.admin_application.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
public class Material {

    @Id 
    @GeneratedValue
    private Integer Id;
    
    private String name;
    
    @ManyToOne
    @Cascade(CascadeType.PERSIST)
    private Type type;

    

    public Material(String name, Type type) {
        this.name = name;
        this.type = type;
    }

    public Material(){
        
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

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    

    
}
