package bfi.admin_application.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumns;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.UniqueConstraint;

@Entity
public class Reunion {
    @Id
    @GeneratedValue
    private Integer Id;

    private Date creation_date;

    private Date scheduled_date;

    private String state;

    @OneToOne
    private FileEntity pv;

    // @Column(name = "invites", nullable = false)
    // @ElementCollection  
    // private Collection<User> invites = new ArrayList<User>();

    // @Column(name = "assistes", nullable = false)    
    // @ElementCollection
    // private Collection<User> assistes = new ArrayList<User>();


    // @ElementCollection(fetch = FetchType.EAGER)
	// @CollectionTable(name = "reunion_invites", joinColumns = @JoinColumn(name = "reunion_id"))

    // @Column(name = "reunion_invites", nullable = false)
    // @ElementCollection
    @ManyToMany(cascade = {CascadeType.PERSIST , CascadeType.MERGE})
    @JoinTable(
    name = "reunionInvited", 
    joinColumns = @JoinColumn(name = "reunion_id"),
    inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> users_invited = new ArrayList<User>();

    // @ElementCollection(fetch = FetchType.EAGER)
	// @CollectionTable(name = "reunion_assistes", joinColumns = @JoinColumn(name = "reunion_id"))
    
    
    
    // @Column(name = "reunion_assistes", nullable = false)
    // @ElementCollection
    @ManyToMany(cascade = {CascadeType.PERSIST , CascadeType.MERGE})
    @JoinTable(
    name = "reunionAssisted", 
    joinColumns = @JoinColumn(name = "reunion_id"), 
    inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> users_assisted = new ArrayList<User>();

    
    private String sujet;
    

    public Reunion() {
    }

    

    public Reunion(Date creation_date, Date scheduled_date, String state, FileEntity pv, ArrayList<User> invites,
    ArrayList<User> assistes, String sujet) {
        this.creation_date = creation_date;
        this.scheduled_date = scheduled_date;
        this.state = state;
        this.pv = pv;
        this.users_invited = invites;
        this.users_assisted = assistes;
        this.sujet = sujet;
    }

    


    public String getSujet() {
        return sujet;
    }



    public void setSujet(String sujet) {
        this.sujet = sujet;
    }



    

    public void setReunion_invited(List<User> reunion_invited) {
        this.users_invited = reunion_invited;
    }



    public void setReunion_assisted(List<User> reunion_assisted) {
        this.users_assisted = reunion_assisted;
    }



    public List<User> getReunion_invited() {
        return users_invited;
    }



    public List<User> getReunion_assisted() {
        return users_assisted;
    }



    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Integer getId() {
        return Id;
    }

    public Date getCreation_date() {
        return creation_date;
    }

    public void setCreation_date(Date creation_date) {
        this.creation_date = creation_date;
    }

    public Date getScheduled_date() {
        return scheduled_date;
    }

    public void setScheduled_date(Date scheduled_date) {
        this.scheduled_date = scheduled_date;
    }

    public FileEntity getPv() {
        return pv;
    }

    public void setPv(FileEntity pv) {
        this.pv = pv;
    }

    
    
}
