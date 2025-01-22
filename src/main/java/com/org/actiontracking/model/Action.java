package com.org.actiontracking.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Le titre est obligatoire")
    private String titre;
    
    @NotBlank(message = "La description est obligatoire")
    private String description;
    
    @NotNull(message = "Le nombre de livrables attendus est obligatoire")
    @Min(value = 1, message = "Le nombre de livrables attendus doit être supérieur à 0")
    private Integer nbLivrablesAttendus;
    
    @Min(value = 0, message = "Le nombre de livrables réalisés ne peut pas être négatif")
    private Integer nbLivrablesRealises;
    
    private Double tauxRealisation;
    private LocalDateTime dateCreation;
    
    @ManyToOne
    @NotNull(message = "Le type d'action est obligatoire")
    private TypeAction typeAction;
    
    @ManyToOne
    @NotNull(message = "La structure est obligatoire")
    private Structure structure;
    
    @ManyToOne
    private Utilisateur creePar;
}
