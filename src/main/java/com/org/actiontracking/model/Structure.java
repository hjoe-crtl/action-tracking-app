package com.org.actiontracking.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Structure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom de la structure est obligatoire")
    private String nom;
    
    @NotNull(message = "Le niveau de la structure est obligatoire")
    @Enumerated(EnumType.STRING)
    private NiveauStructure niveau;
    
    @ManyToOne
    private Structure structureParent;
    
    @OneToMany(mappedBy = "structureParent")
    private List<Structure> structuresEnfants;
    
    public enum NiveauStructure {
        CENTRAL,
        REGIONAL,
        DEPARTEMENTAL,
        LOCAL
    }
}
