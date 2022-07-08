package bfi.admin_application.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import bfi.admin_application.model.DocumentType;
import bfi.admin_application.repository.DocumentTypeRepository;

@Service
public class DocumentTypeService {
    @Autowired
    private DocumentTypeRepository DTR;

    public Iterable<DocumentType> findAll(){
        return DTR.findAll();
    }

    public Optional<DocumentType> findById(Integer id){
        return DTR.findById(id);
    }

    public Optional<DocumentType> findByType(String type){
        return DTR.findByType(type);
    }

    public ResponseEntity create(String type){
        DocumentType documentType = new DocumentType(type);
        try{
            DTR.save(documentType);
            return new ResponseEntity<>(documentType , HttpStatus.OK);
        }catch(Exception e){
            Map<String , String> body = new HashMap();
            body.put("Message" , "An Error Occured!");
            body.put("Error" , e.getMessage());
            return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity update(Integer id , String type){
        Optional<DocumentType> o_documentType = DTR.findById(id);
        if(o_documentType.isPresent()){
            DocumentType documentType = o_documentType.get();
            documentType.setType(type);
            try{
                DTR.save(documentType);
                return new ResponseEntity<>(documentType , HttpStatus.OK);
            }catch(Exception e){
                Map<String , String> body = new HashMap();
                body.put("Message" , "An Error Occured!");
                body.put("Error" , e.getMessage());
                return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }else{
            Map<String , String> body = new HashMap();
            body.put("Message" , "An Error Occured!");
            body.put("Error" , "Type Not Found!");
            return new ResponseEntity<>(body , HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity delete(Integer id){
        try{
            DTR.deleteById(id);
            Map<String , String> body = new HashMap();
            body.put("Message" , "Item Deleted!");            
            return new ResponseEntity<>(body , HttpStatus.OK);
        }catch(Exception e){
            Map<String , String> body = new HashMap();
            body.put("Message" , "An Error Occured!");
            body.put("Error" , e.getMessage());
            return new ResponseEntity<>(body , HttpStatus.NOT_FOUND);
        }
    }
}
