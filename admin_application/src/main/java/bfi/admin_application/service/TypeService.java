package bfi.admin_application.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import bfi.admin_application.model.Type;
import bfi.admin_application.repository.TypeRepository;

@Service
public class TypeService {
    
    @Autowired
    private TypeRepository typeRepository;

    public ResponseEntity findAll(){
        List<Type> list_type = typeRepository.findAll();
        return new ResponseEntity<>(list_type , HttpStatus.OK);
    }

    public ResponseEntity findById(Integer id){
        Type type = typeRepository.getById(id);
        return new ResponseEntity<>(type , HttpStatus.OK);
    }

    public ResponseEntity create(String name){
        Type type = new Type(name);
        typeRepository.save(type);
        return new ResponseEntity<Type>(type , HttpStatus.OK);
    }

    public ResponseEntity update(String name , Integer id){

        Optional<Type> type = typeRepository.findById(id);

        if(type.isPresent()){
            Type realType = type.get();
            realType.setName(name);
            typeRepository.save(realType);
            return new ResponseEntity<>(realType , HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Wrong Id!" , HttpStatus.NOT_FOUND);
        }

    }

    public ResponseEntity delete(Integer id){
        typeRepository.deleteById(id);
        return new ResponseEntity<>("Success!" , HttpStatus.OK);
    }

    public ResponseEntity getByName(String name){
        Type type = typeRepository.findByName(name);
        return new ResponseEntity<>(type , HttpStatus.OK);
    }
}
