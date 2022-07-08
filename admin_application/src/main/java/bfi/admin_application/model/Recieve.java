package bfi.admin_application.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Recieve {
    
    @Id 
    @GeneratedValue
    private Integer Id;

    private Date date;

    @ManyToOne
    private MoyenAppro moyen;

    private String description;

    

    public Recieve() {
    }

    public Recieve(Date date, MoyenAppro moyen, String description) {
        this.date = date;
        this.moyen = moyen;
        this.description = description;
    }

    public Integer getId() {
        return Id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public MoyenAppro getMoyen() {
        return moyen;
    }

    public void setMoyen(MoyenAppro moyen) {
        this.moyen = moyen;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    

}
