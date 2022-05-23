package bfi.admin_application.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

@Entity
public class BulletinS {
    
    @Id
    @GeneratedValue
    private Integer Id;

    @ManyToOne
    private User user;

    @Lob
    private Byte[] data;

    @Column(unique = true)
    private String code;

    private Date date;

    private boolean sent;

    private Date send_date;

    public BulletinS(){}

    public BulletinS(User user, Byte[] data, String code, Date date, boolean sent, Date send_date) {
        this.user = user;
        this.data = data;
        this.code = code;
        this.date = date;
        this.sent = sent;
        this.send_date = send_date;
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

    public Byte[] getData() {
        return data;
    }

    public void setData(Byte[] data) {
        this.data = data;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean isSent() {
        return sent;
    }

    public void setSent(boolean sent) {
        this.sent = sent;
    }

    public Date getSend_date() {
        return send_date;
    }

    public void setSend_date(Date send_date) {
        this.send_date = send_date;
    }

    

}
