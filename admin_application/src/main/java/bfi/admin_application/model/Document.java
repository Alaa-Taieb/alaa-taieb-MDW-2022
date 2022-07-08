package bfi.admin_application.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
public class Document {
    
    @Id
    @GeneratedValue
    private Integer Id;

    @ManyToOne
    private User user;

    @OneToOne
    private FileEntity file;

    @Column(unique = true)
    private String code;

    private Date date;

    private boolean sent;

    private Date send_date;

    @ManyToOne
    private Envoi envoi;

    @ManyToOne
    @Cascade(CascadeType.PERSIST)
    private DocumentType documentType;

    public Document(){}

    public Document(User user, FileEntity file, String code, Date date, boolean sent, Date send_date , DocumentType documentType) {
        this.user = user;
        this.file = file;
        this.code = code;
        this.date = date;
        this.sent = sent;
        this.send_date = send_date;
        this.documentType = documentType;
    }

    public Envoi getEnvoi() {
        return envoi;
    }

    public void setEnvoi(Envoi envoi) {
        this.envoi = envoi;
    }

    public DocumentType getDocumentType() {
        return documentType;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
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

    public FileEntity getFile() {
        return file;
    }

    public void setFile(FileEntity file) {
        this.file = file;
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
