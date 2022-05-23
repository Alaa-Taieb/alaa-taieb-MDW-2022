package bfi.admin_application.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bfi.admin_application.repository.BulletinSRepository;
import bfi.admin_application.repository.UserRepository;

@Service
public class BulletinSService {
    @Autowired
    private BulletinSRepository BR;

    @Autowired 
    private UserRepository UR;

    
}
