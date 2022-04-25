package bfi.admin_application.Material;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/Material")
public class MaterialController {
    
    @Autowired
    private MaterialService materialService;


    @GetMapping
    public ResponseEntity getAll(){
        return materialService.findAll();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity getById(@PathVariable Integer id){
        return materialService.findById(id);
    }

    @PostMapping
    public ResponseEntity create(String name ,
                                @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date_acq,
                                String moyen_acq ,
                                Integer type_id ,
                                String state , 
                                String serial_number ,
                                Integer Qte
                                )
    {
        System.out.println(serial_number);
        System.out.println(date_acq);
        return materialService.create(name, date_acq, moyen_acq, type_id, state, serial_number, Qte);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity update(String name ,
                                @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date_acq,
                                String moyen_acq ,
                                Integer type_id ,
                                String state , 
                                String serial_number , 
                                @PathVariable Integer id)
    {
        return materialService.update(id, name, date_acq, moyen_acq, type_id, state, serial_number);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity delete(@PathVariable Integer id){
        return materialService.delete(id);
    }
}
