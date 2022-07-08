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

import bfi.admin_application.model.ReunionInvitation;
import bfi.admin_application.service.ReunionInvitationService;

@RestController
@CrossOrigin
@RequestMapping(path = "/reunion/reunionInvitation" , produces = "application/json")
public class ReunionInvitationController {
    
    @Autowired
    private ReunionInvitationService RIS;

    @GetMapping
    public Iterable<ReunionInvitation> getAll(){
        return RIS.findAll();
    }

    @GetMapping(path = "/{id}")
    public Optional<ReunionInvitation> getById(@PathVariable Integer id){
        return RIS.findById(id);
    }

    @GetMapping(path = "/user/{user_id}")
    public Iterable<ReunionInvitation> getByUser(@PathVariable Integer user_id){
        return RIS.findByUser(user_id);
    }

    @GetMapping(path = "/reunion/{reunion_id}")
    public Iterable<ReunionInvitation> getByReunion(@PathVariable Integer reunion_id){
        return RIS.findByReunion(reunion_id);
    } 

    @PostMapping
    public ResponseEntity create(Integer user_id , Integer reunion_id){
        return RIS.create(user_id, reunion_id);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity update(@PathVariable Integer id , boolean assisted){
        return RIS.update(id, assisted);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity delete(@PathVariable Integer id){
        return RIS.delete(id);
    }

}
