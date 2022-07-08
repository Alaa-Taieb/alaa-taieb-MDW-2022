package bfi.admin_application.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import bfi.admin_application.model.Reunion;
import bfi.admin_application.model.ReunionInvitation;
import bfi.admin_application.model.User;
import bfi.admin_application.repository.ReunionInvitationRepository;
import bfi.admin_application.repository.ReunionRepository;
import bfi.admin_application.repository.UserRepository;

@Service
public class ReunionInvitationService {
    
    @Autowired
    private ReunionRepository RR;

    @Autowired
    private ReunionInvitationRepository RIR;

    @Autowired
    private UserRepository UR;

    public Iterable<ReunionInvitation> findAll(){
        return RIR.findAll();
    }

    public Optional<ReunionInvitation> findById(Integer id){
        return RIR.findById(id);
    }

    public Iterable<ReunionInvitation> findByUser(Integer user_id){
        Optional<User> o_user = UR.findById(user_id);
        User user = o_user.get();
        return RIR.findByUser(user);
    }

    public Iterable<ReunionInvitation> findByReunion(Integer reunion_id){
        Optional<Reunion> o_reunion = RR.findById(reunion_id);
        Reunion reunion = o_reunion.get();
        return RIR.findByReunion(reunion);
    }

    public ResponseEntity create(Integer user_id , Integer reunion_id){
        Optional<User> o_user = UR.findById(user_id);
        Optional<Reunion> o_reunion = RR.findById(reunion_id);
        if(o_user.isPresent() && o_reunion.isPresent()){
            User user = o_user.get();
            Reunion reunion = o_reunion.get();
            ReunionInvitation RI = new ReunionInvitation(user, reunion, false);
            try{
                RIR.save(RI);
                return new ResponseEntity<>(RI , HttpStatus.OK);
            }catch(Exception e){
                Map<String , String> body = new HashMap<>();
                body.put("Message", "An error occured while saving!");
                body.put("Error" , e.getMessage());
                return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }else{
            Map<String , String> body = new HashMap<>();
            body.put("Message", "An error occured while fetching data!");
            body.put("Error" , "Invalid arguments!");
            return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity update(Integer id , boolean assisted){
        Optional<ReunionInvitation> o_RI = RIR.findById(id);
        if(o_RI.isPresent()){
            ReunionInvitation RI = o_RI.get();
            RI.setPresent(assisted);
            RIR.save(RI);
            return new ResponseEntity<>(RI , HttpStatus.OK);
        }else{
            Map<String , String> body = new HashMap<>();
            body.put("Message", "An error occured while fetching data!");
            body.put("Error" , "Invalid arguments!");
            return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity delete(Integer id){
        RIR.deleteById(id);
        Map<String , String> body = new HashMap<>();
        body.put("Message", "Entity Deleted!");
        return new ResponseEntity(body , HttpStatus.OK);
    }
}
