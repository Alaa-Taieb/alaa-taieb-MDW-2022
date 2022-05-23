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

import bfi.admin_application.model.Material;
import bfi.admin_application.service.MaterialService;

@RestController
@CrossOrigin
@RequestMapping(path = "/material" , produces="application/json")
public class MaterialController {
    
    @Autowired
    private MaterialService materialService;

    @GetMapping
    public Iterable<Material> findAll(){
        return materialService.findAll();
    }

    @GetMapping(path = "/{id}")
    public Optional<Material> findById(@PathVariable Integer id){
        return materialService.findById(id);
    }

    @PostMapping
    public ResponseEntity create(String name , Integer type_id){
        return materialService.create(name, type_id);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity update(@PathVariable Integer id , String name , Integer type_id){
        return materialService.update(id, name, type_id);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity delete(@PathVariable Integer id){
        return materialService.delete(id);
    }

    

}
