package bfi.admin_application.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class ReunionInvitation {
    @Id
    @GeneratedValue
    private Integer Id;

    @OneToOne
    private User user;

    @OneToOne
    private Reunion reunion;

    private boolean present;

    public ReunionInvitation() {
    }

    public ReunionInvitation(User user, Reunion reunion, boolean present) {
        this.user = user;
        this.reunion = reunion;
        this.present = present;
    }

    public Integer getId() {
        return Id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Reunion getReunion() {
        return reunion;
    }

    public void setReunion(Reunion reunion) {
        this.reunion = reunion;
    }

    public boolean isPresent() {
        return present;
    }

    public void setPresent(boolean present) {
        this.present = present;
    }

    
}
