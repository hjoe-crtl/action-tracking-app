package com.org.actiontracking.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TypeAction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String libelle;
    private String description;
}
