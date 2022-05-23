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

import bfi.admin_application.model.SerialNumber;
import bfi.admin_application.service.SerialNumberService;

@RestController
@CrossOrigin
@RequestMapping(path = "/serialNumber" , produces="application/json")
public class SerialNumberController {
    
    @Autowired
    private SerialNumberService sns;


    @GetMapping
    public Iterable<SerialNumber> findAll(){
        return sns.findAll();
    }

    @GetMapping(path = "/{id}")
    public Optional<SerialNumber> findById(@PathVariable Integer id){
        return sns.findById(id);
    }

    @GetMapping(path = "/appro/{id}")
    public Iterable<SerialNumber> findByAppro(@PathVariable Integer id){
        return sns.findByAppro(id);
    }

    @PostMapping
    public ResponseEntity create(String number , Integer appro_id , boolean appointed){
        return sns.create(number, appro_id, appointed);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity update(@PathVariable Integer id , String number , Integer appro_id , boolean appointed , Integer user_id){
        return sns.update(id, number, appro_id, appointed, user_id);
    }
    
    @DeleteMapping(path = "/{id}")
    public ResponseEntity delete(@PathVariable Integer id){
        return sns.delete(id);
    }

}
