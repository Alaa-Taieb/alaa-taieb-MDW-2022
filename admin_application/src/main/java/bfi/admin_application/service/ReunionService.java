package bfi.admin_application.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import bfi.admin_application.model.FileEntity;
import bfi.admin_application.model.Reunion;
import bfi.admin_application.model.User;
import bfi.admin_application.repository.FileRepository;
import bfi.admin_application.repository.ReunionRepository;
import bfi.admin_application.repository.UserRepository;

@Service
public class ReunionService {
    
    @Autowired
    private ReunionRepository RR;

    @Autowired 
    public FileRepository FR;

    @Autowired
    public UserRepository UR;

    public Iterable<Reunion> findAll(){
        return RR.findAll();
    }

    public Optional<Reunion> findById(Integer id){
        return RR.findById(id);
    }

    public Boolean checkDateAvailability(Long date , Integer reunion_id){
        List<Reunion> reunions = RR.findAll();
        Boolean valid = true;
        
        
        for(int i = 0 ; i < reunions.size() ; i++){
            if(!reunions.get(i).getId().equals(reunion_id)){
                
                Date reunion_date = reunions.get(i).getScheduled_date();
                Long reunion_minutes = reunion_date.getTime()/1000/60;
                Long date_minutes = date/1000/60;
                
                System.out.println("reunion date : " + reunion_date);
                System.out.println("new date : " + new Date(date));
                System.out.println("reunion time : " + reunion_minutes);
                System.out.println("new time : " + date_minutes);
                System.out.println("Time difference : " + Math.abs(reunion_minutes - date_minutes));
                if(Math.abs(reunion_minutes - date_minutes) < 120){
                    System.out.println("Current reunion : " + reunions.get(i).getId());
                    System.out.println("sent reunion : " + reunion_id);
                    System.out.println(reunions.get(i).getId() != reunion_id);
                    valid = false;
                    break;
                }
            }else{
                System.out.println("Current reunion : " + reunions.get(i).getId());
                System.out.println("sent reunion : " + reunion_id);
                System.out.println(reunions.get(i).getId() != reunion_id);
            }
        }
        return valid;
    }

    public ResponseEntity create(Date creation_date , Date scheduled_date , Integer[] invited , String sujet){
        Set<User> users = new HashSet<User>();
        for(int i = 0 ; i < invited.length ; i++){
            Optional<User> o_user = UR.findById(invited[i]);
            User user = o_user.get();
            users.add(user);
        }
        ArrayList<User> users_list = new ArrayList<User>(users);
        // System.out.println("Print in service : " + users_list.get(0));
        // System.out.println("Print in service : " + users_list.get(1));
        Reunion reunion = new Reunion(creation_date, scheduled_date, "Prévue", null, users_list, null , sujet);
        
        try{
            RR.save(reunion);
            return new ResponseEntity<>(reunion , HttpStatus.OK);
        }catch(Exception e){
            Map<String , String> body = new HashMap<>();
            body.put("Message", "An error occured while saving!");
            body.put("Error" , e.getMessage());
            return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity update(Integer id , Long scheduled_date , String sujet){
        Optional<Reunion> o_reunion = RR.findById(id);
        if(o_reunion.isPresent()){
            Reunion reunion = o_reunion.get();
            Date new_date = new Date(scheduled_date);
            reunion.setScheduled_date(new_date);
            reunion.setSujet(sujet);
            try{
                RR.save(reunion);
                return new ResponseEntity<>(reunion , HttpStatus.OK);
            }catch(Exception e){
                Map<String , String> body = new HashMap<>();
                body.put("Message", "An error occured while saving!");
                body.put("Error" , e.getMessage());
                return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }else{
            Map<String , String> body = new HashMap<>();
            body.put("Message", "An error occured while Fetching the reunion!");
            body.put("Error" , "Reunion with id "+id+" do not exist!");
            return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity updatePV(Integer id , Integer fileEntity_id){
        Optional<Reunion> o_reunion = RR.findById(id);
        Optional<FileEntity> o_file = FR.findById(fileEntity_id);
        if(o_reunion.isPresent() && o_file.isPresent()){
            Reunion reunion = o_reunion.get();
            FileEntity file = o_file.get();
            reunion.setPv(file);
            try{
                RR.save(reunion);
                return new ResponseEntity<>(reunion , HttpStatus.OK);
            }catch(Exception e){
                Map<String , String> body = new HashMap<>();
                body.put("Message", "An error occured while saving!");
                body.put("Error" , e.getMessage());
                return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }else{
            Map<String , String> body = new HashMap<>();
            body.put("Message", "An error occured while fetching data!");
            body.put("Error" , "Invalid arguments!");
            return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    public ResponseEntity updateInvited(Integer id , Integer[] invited){
        Optional<Reunion> o_reunion = RR.findById(id);
        if(o_reunion.isPresent()){
            Reunion reunion = o_reunion.get();
            Set<User> users = new HashSet<User>();
            for(int i = 0 ; i < invited.length ; i++){
                Optional<User> o_user = UR.findById(invited[i]);
                User user = o_user.get();
                users.add(user);
            }
            ArrayList<User> users_list = new ArrayList<User>(users);

            reunion.setReunion_invited(users_list);
            try{
                RR.save(reunion);
                return new ResponseEntity<>(reunion , HttpStatus.OK);
            }catch(Exception e){
                Map<String , String> body = new HashMap<>();
                body.put("Message", "An error occured while saving!");
                body.put("Error" , e.getMessage());
                return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }else{
            Map<String , String> body = new HashMap<>();
            body.put("Message", "An error occured while Fetching the reunion!");
            body.put("Error" , "Reunion with id "+id+" do not exist!");
            return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity updateAssisted(Integer id , Integer[] assisted){
        Optional<Reunion> o_reunion = RR.findById(id);
        if(o_reunion.isPresent()){
            Reunion reunion = o_reunion.get();
            Set<User> users = new HashSet<User>();
            ArrayList<User> users_list;
            if(assisted != null){
                for(int i = 0 ; i < assisted.length ; i++){
                    Optional<User> o_user = UR.findById(assisted[i]);
                    User user = o_user.get();
                    users.add(user);
                }
                users_list = new ArrayList<User>(users);
            }else{
                users_list = new ArrayList<User>();
            }
            

            reunion.setReunion_assisted(users_list);
            try{
                RR.save(reunion);
                return new ResponseEntity<>(reunion , HttpStatus.OK);
            }catch(Exception e){
                Map<String , String> body = new HashMap<>();
                body.put("Message", "An error occured while saving!");
                body.put("Error" , e.getMessage());
                return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }else{
            Map<String , String> body = new HashMap<>();
            body.put("Message", "An error occured while Fetching the reunion!");
            body.put("Error" , "Reunion with id "+id+" do not exist!");
            return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity updateState(Integer id , String state){
        Optional<Reunion> o_reunion = RR.findById(id);
        if(o_reunion.isPresent()){
            Reunion reunion = o_reunion.get();
            reunion.setState(state);
            try{
                RR.save(reunion);
                return new ResponseEntity<>(reunion , HttpStatus.OK);
            }catch(Exception e){
                Map<String , String> body = new HashMap<>();
                body.put("Message", "An error occured while saving!");
                body.put("Error" , e.getMessage());
                return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }else{
            Map<String , String> body = new HashMap<>();
            body.put("Message", "An error occured while Fetching the reunion!");
            body.put("Error" , "Reunion with id "+id+" do not exist!");
            return new ResponseEntity<>(body , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity delete(Integer id){
        RR.deleteById(id);
        Map<String , String> body = new HashMap<>();
        body.put("Message", "Item deleted!");
        return new ResponseEntity<>(body , HttpStatus.OK); 
    }
}
