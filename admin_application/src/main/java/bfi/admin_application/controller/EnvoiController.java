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

import bfi.admin_application.model.Envoi;
import bfi.admin_application.service.EnvoiService;

@RestController
@CrossOrigin
@RequestMapping(path = "/courrier/envoi")
public class EnvoiController {
    
    @Autowired
    private EnvoiService ES;

    @GetMapping
    public Iterable<Envoi> findAll(){
        return ES.findAll();
    }

    @GetMapping(path = "/{id}")
    public Optional<Envoi> findById(@PathVariable Integer id){
        return ES.findById(id);
    }

    @PostMapping
    public ResponseEntity create(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date , Integer moyen_id , Integer qte){
        return ES.create(date, moyen_id , qte);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity update(@PathVariable Integer id ,@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date , Integer moyen_id , Integer qte){
        return ES.update(id, date, moyen_id , qte);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity delete(@PathVariable Integer id){
        return ES.delete(id);
    }


}
