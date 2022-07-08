package bfi.admin_application.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import bfi.admin_application.model.MoyenAppro;
import bfi.admin_application.model.Recieve;
import bfi.admin_application.repository.MoyenApproRepository;
import bfi.admin_application.repository.RecieveRepository;

@Service
public class RecieveService {
    
    @Autowired
    private RecieveRepository RR;

    @Autowired
    private MoyenApproRepository MAR;

    public Iterable<Recieve> findAll(){
        return RR.findAll();
    }

    public Optional<Recieve> findById(Integer id){
        return RR.findById(id);
    }

    public ResponseEntity create(Date date , Integer moyen_id , String description){
        Optional<MoyenAppro> o_moyen = MAR.findById(moyen_id);
        if(o_moyen.isPresent()){
            MoyenAppro moyen = o_moyen.get();
            Recieve recieve = new Recieve(date, moyen, description);
            RR.save(recieve);
            return new ResponseEntity<>(recieve , HttpStatus.OK);
        }else{
            Map<String , String> body = new HashMap<>();
            body.put("message", "An error has occured!");
            body.put("error" , "Invalid arguments!");
            return new ResponseEntity<>(body , HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity update(Integer id , Date date , Integer moyen_id , String description){
        Optional<Recieve> o_recieve = RR.findById(id);
        Optional<MoyenAppro> o_moyen = MAR.findById(moyen_id);
        if(o_moyen.isPresent() && o_recieve.isPresent()){
            Recieve recieve = o_recieve.get();
            MoyenAppro moyen = o_moyen.get();
            recieve.setDate(date);
            recieve.setDescription(description);
            recieve.setMoyen(moyen);
            RR.save(recieve);
            return new ResponseEntity<>(recieve , HttpStatus.OK);
        }else{
            Map<String , String> body = new HashMap<>();
            body.put("message", "An error has occured!");
            body.put("error" , "Invalid arguments!");
            return new ResponseEntity<>(body , HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity delete(Integer  id){
        RR.deleteById(id);
        Map<String , String> body = new HashMap<>();
        body.put("message", "Item Deleted!");
        return new ResponseEntity<>(body , HttpStatus.OK);
    }
    
}
