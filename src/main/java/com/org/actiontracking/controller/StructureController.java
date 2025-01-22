package com.org.actiontracking.controller;

import com.org.actiontracking.model.Structure;
import com.org.actiontracking.service.StructureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/structures")
@CrossOrigin(origins = "http://localhost:4200")
public class StructureController {

    @Autowired
    private StructureService structureService;

    @GetMapping
    public List<Structure> getAllStructures() {
        return structureService.getAllStructures();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Structure> getStructureById(@PathVariable Long id) {
        Structure structure = structureService.getStructureById(id);
        return ResponseEntity.ok(structure);
    }

    @GetMapping("/{parentId}/children")
    public List<Structure> getChildStructures(@PathVariable Long parentId) {
        return structureService.getChildStructures(parentId);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Structure> createStructure(@Valid @RequestBody Structure structure) {
        Structure newStructure = structureService.createStructure(structure);
        return ResponseEntity.ok(newStructure);
    }
}
