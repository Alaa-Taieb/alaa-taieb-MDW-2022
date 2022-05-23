package bfi.admin_application.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
public class Appro {
    @Id 
    @GeneratedValue
    private Integer Id;

    private Date date;

    @OneToOne
    @Cascade(CascadeType.PERSIST)
    private MoyenAppro moyen;


    @ManyToOne
    @Cascade(CascadeType.PERSIST)
    private Material material;
    private boolean hasSerialNumbers;
    public MoyenAppro getMoyen() {
        return moyen;
    }

    public void setMoyen(MoyenAppro moyen) {
        this.moyen = moyen;
    }
    private Integer qte;

    public Appro(Date date , Material material , MoyenAppro moyenAppro , Integer Qte , boolean hasSerialNumbers){
        this.date = date;
        this.material = material;
        this.qte = Qte;
        this.hasSerialNumbers = hasSerialNumbers;
        this.moyen = moyenAppro;
    }

    public Appro(){
    }

    public Integer getId() {
        return Id;
    }
    
    public boolean isHasSerialNumbers() {
        return hasSerialNumbers;
    }

    public void setHasSerialNumbers(boolean hasSerialNumbers) {
        this.hasSerialNumbers = hasSerialNumbers;
    }

    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }
    public Material getMaterial() {
        return material;
    }
    public void setMaterial(Material material) {
        this.material = material;
    }
    public Integer getQte() {
        return qte;
    }
    public void setQte(Integer qte) {
        this.qte = qte;
    }

    
    
}
