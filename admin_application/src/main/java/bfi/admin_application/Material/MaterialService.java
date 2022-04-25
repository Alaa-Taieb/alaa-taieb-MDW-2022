package bfi.admin_application.Material;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class MaterialService {

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private TypeRepository typeRepository;

    public ResponseEntity findAll(){
        List<Material> response = materialRepository.findAll();
        return new ResponseEntity(response , HttpStatus.OK);
    } 

    public ResponseEntity findById(Integer id){
        Optional<Material> material = materialRepository.findById(id);
        if(material.isPresent()){
            Material newMaterial = material.get();
            return new ResponseEntity(newMaterial , HttpStatus.OK);
        }else{
            Map<String , String> body = new HashMap();
            body.put("message", "Material Not Found");
            return new ResponseEntity(body , HttpStatus.NOT_FOUND);
        }

    }

    public ResponseEntity create(String name , 
                                Date date_acq , 
                                String moyen_acq , 
                                Integer type_id , 
                                String state ,
                                String serial_number ,
                                Integer Qte){

        
        Optional<Type> type = typeRepository.findById(type_id);
        if(type.isPresent()){
            Type newType = type.get();
            
            try{
                Material material = new Material(name , date_acq , moyen_acq , newType , state , serial_number);
                materialRepository.save(material);
                    
                Map<String , String> body = new HashMap();
                body.put("message" , "Materials created Successfully!");
                return new ResponseEntity(body , HttpStatus.CREATED);
            }catch(Exception e){
                Map<String , String> body = new HashMap();
                body.put("message" , e.getMessage());
                return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR);
            }
            
        }else{
            Map<String , String> body = new HashMap();
            body.put("message" , "Wrong Type Id!");
            return new ResponseEntity(body , HttpStatus.NOT_FOUND);
        }

    }

    public ResponseEntity update(Integer id , String name , 
                                Date date_acq , 
                                String moyen_acq , 
                                Integer type_id , 
                                String state ,
                                String serial_number)
    {
        Optional<Material> material = materialRepository.findById(id);
        Optional<Type> type = typeRepository.findById(type_id);

        if(material.isPresent() && type.isPresent()){
            Material realMaterial = material.get();
            Type realType = type.get();
            realMaterial.setName(name);
            realMaterial.setDate_acq(date_acq);
            realMaterial.setMoyen_acq(moyen_acq);
            realMaterial.setType(realType);
            realMaterial.setState(state);
            realMaterial.setSerial_number(serial_number);
            materialRepository.save(realMaterial);
            Map<String , String> body = new HashMap();
            body.put("message" , "Material successfully updated!");
            return new ResponseEntity<>(body , HttpStatus.OK);
        }else{
            Map<String , String> body = new HashMap();
            body.put("message" , "Operation failed!");
            return new ResponseEntity<>(body , HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity delete(Integer id){
        Optional<Material> material = materialRepository.findById(id);

        if(material.isPresent()){
            materialRepository.deleteById(id);
            Map<String , String> body = new HashMap();
            body.put("message" , "Material Deleted Successefully!");
            return new ResponseEntity<>(body , HttpStatus.OK);
        }else{
            Map<String , String> body = new HashMap();
            body.put("message" , "Material not found!");
            return new ResponseEntity<>(body , HttpStatus.NOT_FOUND);
        }
    }
    
    
}
