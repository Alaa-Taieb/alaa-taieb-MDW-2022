package bfi.admin_application.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import bfi.admin_application.model.User;
import bfi.admin_application.model.UserPrincipal;
import bfi.admin_application.repository.UserRepository;

@Service
public class UserPrincipalDetailsService implements UserDetailsService {

    private UserRepository userRepository;
    


    public UserPrincipalDetailsService(UserRepository userRepository){
        this.userRepository = userRepository; 
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByLogin(username);
        UserPrincipal userPrincipal = new UserPrincipal(user);
        
        return userPrincipal;
    }
    
}
