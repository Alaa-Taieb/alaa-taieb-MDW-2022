package bfi.admin_application.controller;

import java.util.Optional;

import javax.websocket.server.PathParam;

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

import bfi.admin_application.model.MoyenAppro;
import bfi.admin_application.service.MoyenApproService;

@RestController
@CrossOrigin
@RequestMapping(path = "/moyenappro" , produces="application/json")
public class MoyenApproController {
    
    @Autowired
    private MoyenApproService mas;

    @GetMapping
    public Iterable<MoyenAppro> findAll(){
        return mas.findAll();
    }

    @GetMapping(path = "/{id}")
    public Optional<MoyenAppro> findById(@PathVariable Integer id){
        return mas.findById(id);
    }

    @PostMapping
    public ResponseEntity create(String name){
        return mas.create(name);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity update(@PathVariable Integer id , String name){
        return mas.update(id, name);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity delete(@PathVariable Integer id){
        return mas.delete(id);
    }

}
