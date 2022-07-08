package bfi.admin_application.controller;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bfi.admin_application.model.Document;
import bfi.admin_application.service.DocumentService;

@RestController
@CrossOrigin
@RequestMapping(path = "/document")
public class DocumentController {
    
    @Autowired
    private DocumentService BS;

    @GetMapping
    public Iterable<Document> findAll(){
        return BS.findAll();
    }

    @GetMapping(path = "/{id}")
    public Optional<Document> findById(@PathVariable Integer id){
        return BS.findById(id);
    }

    @GetMapping(path = "/user/{id}")
    public Iterable<Document> findByUserId(@PathVariable Integer id){
        return BS.findByUser(id);
    }

    @GetMapping(path = "/envoi/{envoi_id}")
    public Iterable<Document> findByEnvoi(@PathVariable Integer envoi_id){
        return BS.findByEnvoi(envoi_id);
    }

    @PostMapping
    public ResponseEntity create(Integer user_id , Integer file_id , String code ,@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date , boolean sent ,@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date_sent , Integer documentTypeId){
        return BS.create(user_id, file_id, code, date, sent, date_sent , documentTypeId);
    }

    @PutMapping(path = "/envoyer/{id}")
    public ResponseEntity markSent(@PathVariable Integer id , Integer envoi_id){
        return BS.markSent(id, envoi_id);
    }

    @PutMapping(path = "/unsend/{id}")
    public ResponseEntity markUnsent(@PathVariable Integer id){
        return BS.markUnsent(id);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity update(@PathVariable Integer id , Integer user_id , Integer file_id , String code ,@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date , boolean sent ,@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date_sent , Integer documentTypeId){
        return BS.update(id, user_id, file_id, code, date, sent, date_sent , documentTypeId);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity delete(@PathVariable Integer id){
        return BS.delete(id);
    }

}
