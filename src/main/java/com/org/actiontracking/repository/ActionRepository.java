package com.org.actiontracking.repository;

import com.org.actiontracking.model.Action;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ActionRepository extends JpaRepository<Action, Long> {
    List<Action> findByStructureId(Long structureId);
    
    @Query("SELECT a FROM Action a WHERE a.structure.id IN " +
           "(SELECT s.id FROM Structure s WHERE s.id = :structureId OR s.structureParent.id = :structureId)")
    List<Action> findActionsByStructureAndChildren(@Param("structureId") Long structureId);
}
