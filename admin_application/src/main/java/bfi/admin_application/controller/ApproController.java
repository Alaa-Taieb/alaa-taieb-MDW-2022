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

import bfi.admin_application.model.Appro;
import bfi.admin_application.service.ApproService;

@RestController
@CrossOrigin
@RequestMapping(path = "/appro" , produces="application/json")
public class ApproController {

    @Autowired
    private ApproService approService;

    @GetMapping
    public Iterable<Appro> findAll(){
        return approService.findAll();
    }

    @GetMapping(path = "/{id}")
    public Optional<Appro> findById(@PathVariable Integer id){
        return approService.findById(id);
    }

    @GetMapping(path = "/material/{id}")
    public Iterable<Appro> findByMaterial(@PathVariable Integer id){
        return approService.findByMaterial(id);
    }

    @PostMapping
    public ResponseEntity create(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date , Integer moyen_id , Integer id_material , Integer qte , boolean hasSerialNumber){
        System.out.print("Has Serial Numbers : " + hasSerialNumber);
        return approService.create(date, moyen_id, id_material, qte, hasSerialNumber);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity update(@PathVariable Integer id , @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date , Integer moyen_id , Integer id_material , Integer qte , boolean hasSerialNumbers){
        return approService.update(id, date, moyen_id, id_material, qte, hasSerialNumbers);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity delete(@PathVariable Integer id){
        return approService.delete(id);
    }

    
    
    
}
