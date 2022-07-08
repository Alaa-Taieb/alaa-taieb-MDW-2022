package bfi.admin_application.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class DocumentType {
    
    @Id
    @GeneratedValue
    private Integer Id;
    
    @Column(unique = true)
    private String type;

    public DocumentType(String type) {
        this.type = type;
    }

    public DocumentType() {
    }


    public Integer getId() {
        return Id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    

}
