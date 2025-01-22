package com.org.actiontracking.service;

import com.org.actiontracking.model.Utilisateur;
import com.org.actiontracking.model.ERole;
import com.org.actiontracking.model.Role;
import com.org.actiontracking.repository.UtilisateurRepository;
import com.org.actiontracking.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Utilisateur createUser(Utilisateur user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRoles() == null || user.getRoles().isEmpty()) {
            user.setRoles(new HashSet<>());
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role USER is not found."));
            user.getRoles().add(userRole);
        }
        return utilisateurRepository.save(user);
    }

    public boolean existsByUsername(String username) {
        return utilisateurRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return utilisateurRepository.existsByEmail(email);
    }
}
