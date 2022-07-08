package bfi.admin_application.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bfi.admin_application.model.DocumentType;
import bfi.admin_application.service.DocumentTypeService;

@RestController
@CrossOrigin
@RequestMapping(path = "document/type")
public class DocumentTypeController {
    
    @Autowired
    private DocumentTypeService DTS;

    @GetMapping
    public Iterable<DocumentType> findAll(){
        return DTS.findAll();
    }

    @GetMapping(path = "/{id}")
    public Optional<DocumentType> findById(@PathVariable Integer id){
        return DTS.findById(id);
    }

    @GetMapping(path = "byTypeName/{type}")
    public Optional<DocumentType> findByType(@PathVariable String type){
        return DTS.findByType(type);
    }

    @PostMapping
    public ResponseEntity create(String type){
        return DTS.create(type);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity update(@PathVariable Integer id , String type){
        return DTS.update(id, type);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity delete(@PathVariable Integer id){
        return DTS.delete(id);
    }
}
