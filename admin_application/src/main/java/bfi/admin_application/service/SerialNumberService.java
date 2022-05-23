package bfi.admin_application.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import bfi.admin_application.model.Appro;
import bfi.admin_application.model.SerialNumber;
import bfi.admin_application.model.User;
import bfi.admin_application.repository.ApproRepository;
import bfi.admin_application.repository.SerialNumberRepository;
import bfi.admin_application.repository.UserRepository;

@Service
public class SerialNumberService {

    @Autowired
    private SerialNumberRepository snr;

    @Autowired
    private ApproRepository ar;

    @Autowired
    private UserRepository ur;

    public Iterable<SerialNumber> findAll(){
        return snr.findAll();
    }

    public Optional<SerialNumber> findById(Integer id){
        return snr.findById(id);
    }

    public Iterable<SerialNumber> findByAppro(Integer appro_id){
        Optional<Appro> o_appro = ar.findById(appro_id);
        if(o_appro.isPresent()){
            Appro appro = o_appro.get();
            return snr.findByAppro(appro);
        }else{
            return null;
        }
    }

    public ResponseEntity create(String number , Integer appro_id , boolean appointed){
        Optional<Appro> o_appro = ar.findById(appro_id);
        if(o_appro.isPresent()){
            Appro appro = o_appro.get();
            SerialNumber serialNumber = new SerialNumber(number , appro , appointed , null);
            try{
                snr.save(serialNumber);
                Map<String , String> body = new HashMap<>();
                body.put("Message" , "Entity Saved!");
                return new ResponseEntity(body , HttpStatus.OK);
            }catch(Exception e){
                Map<String , String> body = new HashMap<>();
                body.put("Message" , "An Error occured while saving!");
                body.put("Error" , e.getMessage());
                return new ResponseEntity(body , HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }else{
            Map<String , String> body = new HashMap<>();
            body.put("Message" , "An Error Occured while saving!");
            body.put("Error" , "Bad Request!");
            return new ResponseEntity(body , HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity update(Integer id , String number , Integer appro_id , boolean appointed , Integer user_id){
        Optional<Appro> o_appro = ar.findById(appro_id);
        Optional<User> o_user = ur.findById(user_id);
        Optional<SerialNumber> o_serialNumber = snr.findById(id);
        if(o_appro.isPresent()  && o_serialNumber.isPresent()){
            Appro appro = o_appro.get();
            User user;
            if(o_user.isPresent()){
                user = o_user.get();
            }else{
                user = null;
            }
            SerialNumber serialNumber = o_serialNumber.get();
            serialNumber.setNumber(number);
            serialNumber.setAppro(appro);
            serialNumber.setUser(user);
            serialNumber.setAppointed(appointed);
            try{
                snr.save(serialNumber);
                Map<String , String> body = new HashMap<>();
                body.put("Message" , "Entity Updated!");
                return new ResponseEntity(body , HttpStatus.OK);
            }catch(Exception e){
                Map<String , String> body = new HashMap<>();
                body.put("Message" , "An error has occured while updating!");
                body.put("Error" , e.getMessage());
                return new ResponseEntity(body , HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }else{
            Map<String , String> body = new HashMap<>();
            body.put("Message" , "An error has occured while updating!");
            body.put("Error" , "Bad Request!");
            return new ResponseEntity(body , HttpStatus.BAD_REQUEST);
        }
    }
    
    public ResponseEntity delete(Integer id){
        
        snr.deleteById(id);
        Map<String , String> body = new HashMap<>();
        body.put("Message" , "Entity deleted!");
        return new ResponseEntity (body , HttpStatus.OK);
    }
}
