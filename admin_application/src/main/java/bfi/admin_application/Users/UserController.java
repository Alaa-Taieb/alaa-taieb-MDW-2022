package bfi.admin_application.Users;


import java.util.Date;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import bfi.admin_application.Roles.Role;


@RestController
@RequestMapping(path = "/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping 
    public @ResponseBody Iterable<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity getUser(@PathVariable Integer id){
        return userService.getUser(id);
    }


    @GetMapping(path = "/username/{username}")
    public @ResponseBody User getUserByUsername(@PathVariable String username){

        return userService.getUserByUsername(username);
    }

    @PostMapping
    public ResponseEntity createUser(String name , 
                             String secondName , 
                             @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date birthday , 
                             String email ,
                             String phoneNumber , 
                             String login , 
                             String password , 
                             String role_id
                             ){
                                 
        return userService.createUser(name, secondName, birthday, email, phoneNumber, login, password , role_id);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity updateUser(@PathVariable Integer id ,
                             String name , 
                             String secondName , 
                             @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date birthday , 
                             String email ,
                             String phoneNumber , 
                             String login , 
                             String password , 
                             String role_id){
        return userService.updateUser(id, name, secondName, birthday, email, phoneNumber, login, password, role_id);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Map<String , String>> deleteUser(@PathVariable Integer id){
        return userService.deleteUser(id);
    }
}
