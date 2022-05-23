package bfi.admin_application.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
public class SerialNumber {

    @Id 
    @GeneratedValue
    private Integer Id;

    private String number;

    @ManyToOne
    @Cascade(CascadeType.PERSIST)
    private Appro appro;

    @ManyToOne
    @Cascade(CascadeType.PERSIST)
    private User user;

    private boolean appointed;


    public boolean isAppointed() {
        return appointed;
    }

    public void setAppointed(boolean appointed) {
        this.appointed = appointed;
    }

    public SerialNumber(String number , Appro appro , boolean appointed ,User user){
        this.user = user;
        this.number = number;
        this.appro = appro;
        this.appointed = appointed;
    }

    public SerialNumber(){

    }

    public Integer getId() {
        return Id;
    }

    

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Appro getAppro() {
        return appro;
    }

    public void setAppro(Appro appro) {
        this.appro = appro;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    


    
}
