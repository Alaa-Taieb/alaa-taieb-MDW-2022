package bfi.admin_application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bfi.admin_application.service.TypeService;

@RestController
@RequestMapping(path="/Material/type", produces="application/json")
public class TypeController {
    
    @Autowired
    private TypeService typeService;

    @GetMapping
    public ResponseEntity getAll(){
        return typeService.findAll();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity findById(@PathVariable Integer id){
        return typeService.findById(id);
    }

    @PostMapping
    public ResponseEntity create(@RequestParam String name){
        return typeService.create(name);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity update(@PathVariable Integer id , @RequestParam String name){
        return typeService.update(name, id);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity delete(@PathVariable Integer id){
        return typeService.delete(id);
    }

    @GetMapping(path = "/byName/{name}")
    public ResponseEntity getByName(@PathVariable String name){
        return typeService.getByName(name);
    }

}
