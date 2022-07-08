package bfi.admin_application.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import bfi.admin_application.model.FileEntity;
import bfi.admin_application.repository.FileRepository;

@Service
public class FileService {
    
    @Autowired
    public FileRepository FR;

    public Iterable<FileEntity> findAll(){
        return FR.findAll();
    }

    public byte[] downloadFile(Integer id){
        return FR.findById(id).get().getData();
    }

    public Optional<FileEntity> findById(Integer id){
        return FR.findById(id);
    }

    public ResponseEntity create(MultipartFile file) throws IOException{
        
        FileEntity FE = new FileEntity(file.getOriginalFilename() , file.getBytes());
        FR.save(FE);
        return new ResponseEntity<>(FE , HttpStatus.OK); 
    } 

    public ResponseEntity delete(Integer id){
        FR.deleteById(id);
        Map<String , String> body = new  HashMap();
        body.put("Message" , "File deleted!");
        return new ResponseEntity<>(body , HttpStatus.OK);
    }

}
