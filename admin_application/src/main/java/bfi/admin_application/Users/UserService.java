package bfi.admin_application.Users;


import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import bfi.admin_application.Roles.Role;
import bfi.admin_application.Roles.RoleRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Iterable<User> getAllUsers(){
        return userRepository.findAll();
    }

    public ResponseEntity getUser(Integer id){
        Optional<User> user = userRepository.findById(id);
        try{
            User realUser = user.get();
            return new ResponseEntity<>(user , HttpStatus.OK);
        }catch(Exception e){
            Map<String , String> body = new HashMap<>();
            body.put("Error", "User Not Found!");
            return new ResponseEntity<>(body,HttpStatus.NOT_FOUND);
        }
       
    }

    public User getUserByUsername(String username){
        
        return userRepository.findByLogin(username);
    }

    public ResponseEntity createUser(String name , 
                             String secondName , 
                             Date birthday , 
                             String email , 
                             String phoneNumber , 
                             String login , 
                             String password , 
                             String role_id 
                             ){
        password = passwordEncoder.encode(password);
        User user = new User(name , secondName , birthday , email , phoneNumber , login , password);
        Integer id = Integer.parseInt(role_id);
        Optional<Role> userRole = roleRepository.findById(id);
        Role realUserRole = userRole.get();
        
        user.setRole(realUserRole);
        
        try{
            userRepository.save(user);
            return new ResponseEntity<>(user , HttpStatus.CREATED);
        }catch(Exception e){
            Map<String , String> body = new HashMap<>();
            body.put("message", "Error occured while performing the opperation!");
            body.put("Error", e.getMessage());
            return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
        }
        
        
    }

    public ResponseEntity updateUser(Integer id , 
                             String name , 
                             String secondName , 
                             Date birthday , 
                             String email , 
                             String phoneNumber , 
                             String login , 
                             String password , 
                             String role_id){
       
        Optional<User> userData = userRepository.findById(id);
        password = passwordEncoder.encode(password);                       
        if(userData.isPresent()){
            User newUser = userData.get();
            Integer realRoleId = Integer.parseInt(role_id);
            Optional<Role> userRole = roleRepository.findById(realRoleId);
            Role realUserRole = userRole.get();
            newUser.setName(name);
            newUser.setSecondName(secondName);
            newUser.setBirthday(birthday);
            newUser.setEmail(email);
            newUser.setPhoneNumber(phoneNumber);
            newUser.setLogin(login);
            newUser.setPassword(password);
            newUser.setRole(realUserRole);
            userRepository.save(newUser);
            Map<String , String> body = new HashMap<>();
            body.put("message", "User updated Successfully!");
            return new ResponseEntity<>(body , HttpStatus.OK);
        }else{
            Map<String , String> body = new HashMap<>();
            body.put("error", "Unable to update User!");
            return new ResponseEntity<>(body , HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Map<String , String>> deleteUser(Integer id){
        userRepository.deleteById(id);
        Map<String, String> body = new HashMap<>();
        body.put("message", "User Deleted!");
        return new ResponseEntity<>(body , HttpStatus.OK);
    }



}
