package bfi.admin_application.controller;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import bfi.admin_application.model.FileEntity;
import bfi.admin_application.service.FileService;

@RestController
@CrossOrigin
@RequestMapping(path = "/file")
public class FileEntityController {
    

    @Autowired
    private FileService FS;

    @GetMapping
    public Iterable<FileEntity> findAll(){
        return FS.findAll();
    }

    @GetMapping(path = "/{id}")
    public Optional<FileEntity> findById(@PathVariable Integer id){
        return FS.findById(id);
    }

    @GetMapping(path = "/download/{id}")
    public byte[] downloadById(@PathVariable Integer id){
        return FS.downloadFile(id);
    }

    @PostMapping
    public ResponseEntity create(MultipartFile file)throws IOException{
        return FS.create(file);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity delete(@PathVariable Integer id){
        return FS.delete(id);
    }
}
