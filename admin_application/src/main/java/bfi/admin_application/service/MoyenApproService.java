package bfi.admin_application.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import bfi.admin_application.model.MoyenAppro;
import bfi.admin_application.repository.MoyenApproRepository;

@Service
public class MoyenApproService {
    
    @Autowired
    private MoyenApproRepository mar;

    public Iterable<MoyenAppro> findAll(){
        return mar.findAll();
    }

    public Optional<MoyenAppro> findById(Integer id){
        return mar.findById(id);
    }

    public ResponseEntity create(String name){
        MoyenAppro ma = new MoyenAppro(name);
        try{
            mar.save(ma);
            return new ResponseEntity<>(ma , HttpStatus.OK);
        }catch(Exception e){
            Map<String , String> body = new HashMap<>();
            body.put("message", "Error occured while performing the opperation!");
            body.put("Error", e.getMessage());
            return new ResponseEntity<>(ma , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity update(Integer id , String name){
        Optional<MoyenAppro> ma = mar.findById(id);

        if(ma.isPresent()){
            MoyenAppro real_ma = ma.get();
            real_ma.setName(name);
            mar.save(real_ma);
            Map<String , String> body = new HashMap<>();
            body.put("message", "Entity updated!");
            return new ResponseEntity<>(body  , HttpStatus.OK);
        }else{
            Map<String , String> body = new HashMap<>();
            body.put("message", "Rntity not found!");
            return new ResponseEntity<>(body , HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity delete(Integer id){
        mar.deleteById(id);
        Map<String , String> body = new HashMap<>();
        body.put("message", "Entity Deleted!");
        return new ResponseEntity<>(body  , HttpStatus.OK);
    }
}
