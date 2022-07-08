package bfi.admin_application.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class FileEntity {

    @Id
    @GeneratedValue
    private Integer Id;

    private String name;

    @Lob
    private byte[] data;

    public FileEntity(String name, byte[] data) {
        this.name = name;
        this.data = data;
    }

    public FileEntity() {
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

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    
    
}
