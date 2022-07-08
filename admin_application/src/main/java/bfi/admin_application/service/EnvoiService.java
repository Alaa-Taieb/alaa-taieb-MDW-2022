package bfi.admin_application.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import bfi.admin_application.model.Envoi;
import bfi.admin_application.model.MoyenAppro;
import bfi.admin_application.repository.EnvoiRepository;
import bfi.admin_application.repository.MoyenApproRepository;

@Service
public class EnvoiService {
    
    @Autowired
    private EnvoiRepository ER;

    @Autowired
    private MoyenApproRepository MAR;

    public Iterable<Envoi> findAll(){
        return ER.findAll();
    }

    public Optional<Envoi> findById(Integer id){
        return ER.findById(id);
    }

    public ResponseEntity create(Date date , Integer moyen_id , Integer qte){
        Optional<MoyenAppro> o_moyen = MAR.findById(moyen_id);
        if(o_moyen.isPresent()){
            MoyenAppro moyen = o_moyen.get();
            Envoi envoi = new Envoi(date, moyen , qte);
            ER.save(envoi);
            return new ResponseEntity<>(envoi , HttpStatus.OK);
        }else{
            Map<String , String> body = new HashMap();
            body.put("message" , "An Error has occured!");
            body.put("error" , "Moyen Id isn't valid!");
            return new ResponseEntity<>(body , HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity update(Integer id , Date date , Integer moyen_id , Integer qte){
        Optional<MoyenAppro> o_moyen = MAR.findById(moyen_id);
        Optional<Envoi> o_envoi = ER.findById(id);
        if(o_envoi.isPresent() && o_moyen.isPresent()){
            Envoi envoi = o_envoi.get();
            MoyenAppro moyen = o_moyen.get();
            envoi.setDate(date);
            envoi.setMoyen(moyen);
            envoi.setQte(qte);
            ER.save(envoi);
            return new ResponseEntity<>(envoi , HttpStatus.OK);   
        }else{
            Map<String , String> body = new HashMap();
            body.put("message" , "An Error has occured!");
            body.put("error" , "Invalid  arguments!");
            return new ResponseEntity<>(body , HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity delete(Integer id){
        ER.deleteById(id);
        Map<String , String> body = new HashMap();
        body.put("message" , "Item deleted Successfully!");
        return new ResponseEntity<>(body , HttpStatus.OK);
    }
}
