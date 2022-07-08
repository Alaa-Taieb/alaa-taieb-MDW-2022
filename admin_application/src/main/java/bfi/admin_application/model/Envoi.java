package bfi.admin_application.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Envoi {
    
    @Id
    @GeneratedValue
    private Integer Id;

    private Date date;

    @ManyToOne
    private MoyenAppro moyen;

    private Integer qte;

    public Envoi() {}

    public Envoi(Date date, MoyenAppro moyen , Integer qte) {
        this.date = date;
        this.moyen = moyen;
        this.qte = qte;
    }

    public Integer getQte() {
        return qte;
    }

    public void setQte(Integer qte) {
        this.qte = qte;
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


}
