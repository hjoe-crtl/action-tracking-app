package com.org.actiontracking.controller;

import com.org.actiontracking.model.Action;
import com.org.actiontracking.service.ActionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/actions")
@CrossOrigin(origins = "http://localhost:4200")
public class ActionController {

    @Autowired
    private ActionService actionService;

    @GetMapping
    public List<Action> getAllActions() {
        return actionService.getAllActions();
    }

    @GetMapping("/structure/{structureId}")
    public List<Action> getActionsByStructure(@PathVariable Long structureId) {
        return actionService.getActionsByStructure(structureId);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Action> createAction(@Valid @RequestBody Action action) {
        Action newAction = actionService.createAction(action);
        return ResponseEntity.ok(newAction);
    }

    @PatchMapping("/{id}/taux-realisation")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Action> updateTauxRealisation(
            @PathVariable Long id,
            @RequestParam int nbLivrablesRealises) {
        Action updatedAction = actionService.updateTauxRealisation(id, nbLivrablesRealises);
        return ResponseEntity.ok(updatedAction);
    }
}
