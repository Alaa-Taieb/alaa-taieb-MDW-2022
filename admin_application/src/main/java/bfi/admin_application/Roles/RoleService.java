package bfi.admin_application.Roles;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    
    @Autowired
    private RoleRepository roleRepository;

    public Iterable<Role> getAllRoles(){
        return roleRepository.findAll();
    }

    public Optional<Role> getRole(Integer id){
        return roleRepository.findById(id);
    }

    public ResponseEntity<Role> createRole(String name){
        Role role = new Role(name);
        roleRepository.save(role);
        return new ResponseEntity<>(role , HttpStatus.OK);
    }

    public String updateRole(Integer id , String name){
        Optional<Role> roleData = roleRepository.findById(id);

        if(roleData.isPresent()){
            Role newRole = roleData.get();
            newRole.setName(name);
            roleRepository.save(newRole);
            return "Role Updated!";
        }else{
            return "Role not found!";
        }
    }

    public String deleteRole(Integer id){
        roleRepository.deleteById(id);
        return "Role Deleted!";
    }

    public Role getRoleByName(String name){
        return roleRepository.findByName(name);
    }
}
