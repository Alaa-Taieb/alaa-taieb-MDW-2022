package bfi.admin_application.Roles;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping(path = "/roles" , produces="application/json")
public class RoleController {
    @Autowired
    private RoleService roleService;

    @GetMapping
    public @ResponseBody Iterable<Role> getAllRoles(){
        return roleService.getAllRoles();
    }

    @GetMapping(path = "/{id}")
    public Optional<Role> getRole(@PathVariable Integer id){
        return roleService.getRole(id);
    }

    @PostMapping
    public ResponseEntity<Role> addNewRole(@RequestParam String name){
        return roleService.createRole(name);
    }

    @PutMapping(path = "/{id}")
    public String updateRole(@PathVariable Integer id , @RequestParam String name){
        return roleService.updateRole(id, name);
    }

    @DeleteMapping(path = "/{id}")
    public String deleteRole(@PathVariable Integer id){
        return roleService.deleteRole(id);
    }

    @GetMapping(path = "/byName/{name}")
    public Role getRoleByName(@PathVariable String name)
    {
        return roleService.getRoleByName(name);
    }
}
