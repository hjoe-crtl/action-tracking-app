package com.org.actiontracking.service;

import com.org.actiontracking.model.Structure;
import com.org.actiontracking.repository.StructureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StructureService {
    
    @Autowired
    private StructureRepository structureRepository;
    
    public List<Structure> getAllStructures() {
        return structureRepository.findAll();
    }
    
    public Structure getStructureById(Long id) {
        return structureRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Structure non trouvée"));
    }
    
    public List<Structure> getChildStructures(Long parentId) {
        return structureRepository.findByStructureParentId(parentId);
    }
    
    public Structure createStructure(Structure structure) {
        if (structure.getNiveau() == Structure.NiveauStructure.CENTRAL) {
            structure.setStructureParent(null);
        } else if (structure.getStructureParent() == null) {
            throw new RuntimeException("Une structure non centrale doit avoir une structure parente");
        }
        return structureRepository.save(structure);
    }
}
