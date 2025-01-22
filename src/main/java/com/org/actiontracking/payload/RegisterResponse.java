package com.org.actiontracking.payload;

import com.org.actiontracking.model.Utilisateur;
import java.util.Set;
import java.util.stream.Collectors;

public class RegisterResponse {
    private Long id;
    private String username;
    private String email;
    private String nom;
    private String prenom;
    private Long structureId;
    private Set<String> roles;

    public RegisterResponse(Utilisateur user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.nom = user.getNom();
        this.prenom = user.getPrenom();
        this.structureId = user.getStructureId();
        this.roles = user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toSet());
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Long getStructureId() {
        return structureId;
    }

    public Set<String> getRoles() {
        return roles;
    }
}
