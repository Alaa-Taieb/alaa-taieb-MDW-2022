package bfi.admin_application.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import bfi.admin_application.model.Appro;
import bfi.admin_application.model.Material;
import bfi.admin_application.model.MoyenAppro;
import bfi.admin_application.repository.ApproRepository;
import bfi.admin_application.repository.MaterialRepository;
import bfi.admin_application.repository.MoyenApproRepository;

@Service
public class ApproService {
    
    @Autowired
    private ApproRepository approRepository;

    @Autowired
    private MoyenApproRepository moyenApproRepository;

    @Autowired
    private MaterialRepository materialRepository;

    public Iterable<Appro> findAll(){
        return approRepository.findAll();
    }

    public Optional<Appro> findById(Integer id){
        return approRepository.findById(id);
    }

    public Iterable<Appro> findByMaterial(Integer material_id){
        Optional<Material> o_material = materialRepository.findById(material_id);
        if(o_material.isPresent()){
            Material material = o_material.get();
            return approRepository.findByMaterial(material);
        }else{
            return null;
        }

    }

    public ResponseEntity create(Date date , Integer moyen_id , Integer id_material , Integer qte , boolean hasSerialNumbers){
        Optional<Material> o_material = materialRepository.findById(id_material);
        Optional<MoyenAppro> o_moyen = moyenApproRepository.findById(moyen_id);
        if(o_material.isPresent() && o_moyen.isPresent()){
            Material material = o_material.get();
            MoyenAppro moyen = o_moyen.get();
            Appro appro = new Appro(date, material, moyen ,qte, hasSerialNumbers);
            try{
                approRepository.save(appro);
                Map<String , String> body = new HashMap<>();
                body.put("Message", "Entity Saved Successfully!");
                return new ResponseEntity<>( appro  , HttpStatus.OK);
            }catch(Exception e){
                Map<String , String> body = new HashMap<>();
                body.put("Message", "An error occured while saving!");
                body.put("Error" , e.getMessage());
                return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }else{
            Map<String , String> body = new HashMap<>();
            body.put("Message", "An error occured while saving!");
            body.put("Error" , "Wrong inputs!");
            return new ResponseEntity(body , HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity update(Integer id , Date date , Integer moyen_id , Integer id_material , Integer qte , boolean hasSerialNumbers){
        Optional<Material> o_material = materialRepository.findById(id_material);
        Optional<MoyenAppro> o_moyen = moyenApproRepository.findById(moyen_id);
        Optional<Appro> o_appro = approRepository.findById(id);
        if(o_material.isPresent() && o_moyen.isPresent() && o_appro.isPresent()){
            Material material = o_material.get();
            MoyenAppro moyen = o_moyen.get();
            Appro appro = o_appro.get();
            appro.setDate(date);
            appro.setMoyen(moyen);
            appro.setMaterial(material);
            appro.setQte(qte);
            appro.setHasSerialNumbers(hasSerialNumbers);
            try{
                approRepository.save(appro);
                Map<String , String> body = new HashMap<>();
                body.put("Message", "Entity Updated Successfully!");
                return new ResponseEntity<>(body , HttpStatus.OK);
            }catch(Exception e){
                Map<String , String> body = new HashMap<>();
                body.put("Message", "An error occured while updating!");
                body.put("Error" , e.getMessage());
                return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }else{
            Map<String , String> body = new HashMap<>();
            body.put("Message", "An error occured while updating!");
            body.put("Error" , "Wrong inputs!");
            return new ResponseEntity(body , HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity delete(Integer id){
        approRepository.deleteById(id);
        Map<String , String> body = new HashMap<>();
        body.put("Message", "Entity Deleted!");
        return new ResponseEntity(body , HttpStatus.OK);
    }

}
