package com.org.actiontracking.service;

import com.org.actiontracking.model.Action;
import com.org.actiontracking.repository.ActionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ActionService {
    
    @Autowired
    private ActionRepository actionRepository;
    
    public List<Action> getAllActions() {
        return actionRepository.findAll();
    }
    
    public List<Action> getActionsByStructure(Long structureId) {
        return actionRepository.findActionsByStructureAndChildren(structureId);
    }
    
    @Transactional
    public Action createAction(Action action) {
        action.setDateCreation(LocalDateTime.now());
        action.setTauxRealisation(0.0);
        action.setNbLivrablesRealises(0);
        return actionRepository.save(action);
    }
    
    @Transactional
    public Action updateTauxRealisation(Long id, int nbLivrablesRealises) {
        Action action = actionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Action non trouvée"));
            
        action.setNbLivrablesRealises(nbLivrablesRealises);
        double tauxRealisation = (double) nbLivrablesRealises / action.getNbLivrablesAttendus() * 100;
        action.setTauxRealisation(Math.min(100, tauxRealisation));
        
        return actionRepository.save(action);
    }
}
