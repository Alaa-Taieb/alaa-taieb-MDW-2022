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

import bfi.admin_application.model.Recieve;
import bfi.admin_application.service.RecieveService;

@RestController
@CrossOrigin
@RequestMapping(path = "/courrier/recieve")
public class RecieveController {
    
    @Autowired
    private RecieveService RS;


    @GetMapping
    public Iterable<Recieve> findAll(){
        return RS.findAll();
    }

    @GetMapping(path = "/{id}")
    public Optional<Recieve> findById(@PathVariable Integer id){
        return RS.findById(id);
    }

    @PostMapping
    public ResponseEntity create(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date , Integer moyen_id , String description){
        return RS.create(date, moyen_id, description);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity update(@PathVariable Integer id ,@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date , Integer moyen_id , String description){
        return RS.update(id, date, moyen_id, description);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity delete(@PathVariable Integer id){
        return RS.delete(id);
    }
}
