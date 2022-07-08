package bfi.admin_application.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.apache.catalina.connector.Response;
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

import bfi.admin_application.model.Reunion;
import bfi.admin_application.model.User;
import bfi.admin_application.service.ReunionService;

@RestController
@CrossOrigin
@RequestMapping(path = "/reunion" , produces="application/json")
public class ReunionController {
    @Autowired
    private ReunionService RS;

    @GetMapping
    public Iterable<Reunion> findAll(){
        return RS.findAll();
    }

    @GetMapping(path = "/{id}")
    public Optional<Reunion> findById(@PathVariable Integer id){
        return RS.findById(id);
    }

    @PostMapping(path = "/checkDateAvailability")
    public Boolean checkTimeAvailability(Long date , Integer reunion_id){
        return RS.checkDateAvailability(date , reunion_id);
    }

    @PostMapping
    public ResponseEntity create(Long creation_date , Long scheduled_date , Integer[] invited , String sujet){
        System.out.println(invited);
        System.out.println(invited[0]);
        Date c_date = new Date(creation_date);
        Date s_date = new Date(scheduled_date);
        return RS.create(c_date, s_date , invited , sujet);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity update(@PathVariable Integer id , Long scheduled_date , String sujet){
        return RS.update(id, scheduled_date , sujet);
    }

    @PutMapping(path = "/{id}/pv")
    public ResponseEntity updatePV(@PathVariable Integer id , Integer fileEntity_id){
        return RS.updatePV(id , fileEntity_id);
    }

    @PutMapping(path = "/{id}/state")
    public ResponseEntity updateState(@PathVariable Integer id , String state){
        return RS.updateState(id, state);
    }

    @PutMapping(path = "/{id}/invites")
    public ResponseEntity updateInvite(@PathVariable Integer id , Integer[] invited){
        return RS.updateInvited(id, invited);
    }

    @PutMapping(path = "/{id}/assistes")
    public ResponseEntity updateAssiste(@PathVariable Integer id , Integer[] assisted){
        return RS.updateAssisted(id, assisted);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity delete(@PathVariable Integer id){
        return RS.delete(id);
    }
}
