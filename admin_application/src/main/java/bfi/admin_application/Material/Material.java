package bfi.admin_application.Material;

import java.util.Date;

import javax.persistence.Column;
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
    private Date date_acq;
    private String moyen_acq;
    @ManyToOne
    @Cascade(CascadeType.PERSIST)
    private Type type;
    
    private String state;
    private String serial_number;

    
    public Material(){}

    public Material(String name, Date date_acq, String moyen_acq, Type type, String state, String serial_number) {
        this.name = name;
        this.date_acq = date_acq;
        this.moyen_acq = moyen_acq;
        this.type = type;
        this.state = state;
        this.serial_number = serial_number;
    }

    public Material(String name, Date date_acq, String moyen_acq, String state, String serial_number) {
        this.name = name;
        this.date_acq = date_acq;
        this.moyen_acq = moyen_acq;
        this.state = state;
        this.serial_number = serial_number;
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
    public Date getDate_acq() {
        return date_acq;
    }
    public void setDate_acq(Date date_acq) {
        this.date_acq = date_acq;
    }
    public String getMoyen_acq() {
        return moyen_acq;
    }
    public void setMoyen_acq(String moyen_acq) {
        this.moyen_acq = moyen_acq;
    }
    public Type getType() {
        return type;
    }
    public void setType(Type type) {
        this.type = type;
    }
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }
    public String getSerial_number() {
        return serial_number;
    }
    public void setSerial_number(String serial_number) {
        this.serial_number = serial_number;
    }
    
}
