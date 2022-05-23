package bfi.admin_application.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import bfi.admin_application.model.Material;
import bfi.admin_application.model.Type;
import bfi.admin_application.repository.MaterialRepository;
import bfi.admin_application.repository.TypeRepository;

@Service
public class MaterialService {

    @Autowired
    private MaterialRepository mr;

    @Autowired
    private TypeRepository tr;

    public Iterable<Material> findAll(){
        return mr.findAll();
    }

    public Optional<Material> findById(Integer id){
        return mr.findById(id);
    }

    public ResponseEntity create(String name , Integer type_id){
        Optional<Type> o_type = tr.findById(type_id);
        
        if(o_type.isPresent()){
            Type type = o_type.get();
            Material material = new Material(name , type);
            try{
                mr.save(material);
                Map<String , String> body = new HashMap<>();
                body.put("Message", "Entity Created Successfully!");
                return new ResponseEntity<>(material , HttpStatus.OK);
            }catch(Exception e){
                Map<String , String> body = new HashMap<>();
                body.put("Message", "Entity Created Successfully!");
                body.put("Error" , e.getMessage());
                return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }else{
            Map<String , String> body = new HashMap<>();
            body.put("Message" , "Type Not Found!");
            return new ResponseEntity(body , HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity update(Integer id , String name , Integer type_id){
        Optional<Material> o_material = mr.findById(id);
        if(o_material.isPresent()){
            Material material = o_material.get();
            Optional<Type> o_type = tr.findById(type_id);
            if(o_type.isPresent()){
                Type type = o_type.get();
                material.setName(name);
                material.setType(type);
                try{
                    mr.save(material);
                    Map<String , String> body = new HashMap<>();
                    body.put("Message" , "Entity Updated!");
                    return new ResponseEntity<>(body , HttpStatus.OK);
                }catch(Exception e){
                    Map<String , String> body = new HashMap<>();
                    body.put("Message" , "An error Occured");
                    body.put("Error" , e.getMessage());
                    return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR); 
                }
            }else{
                Map<String , String> body = new HashMap<>();
                body.put("Message" , "Type Not Found!");
                return new ResponseEntity<>(body , HttpStatus.NOT_FOUND);
            }
        }else{
            Map<String , String> body = new HashMap<>();
                body.put("Message" , "Material Not Found!");
                return new ResponseEntity<>(body , HttpStatus.NOT_FOUND);
        }
    }
    
    public ResponseEntity delete(Integer id){
        mr.deleteById(id);
        Map<String , String> body = new HashMap<>();
        body.put("Message" , "Entity Deleted!");
        return new ResponseEntity<>(body , HttpStatus.OK);
    }

}
