package com.org.actiontracking.repository;

import com.org.actiontracking.model.Structure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StructureRepository extends JpaRepository<Structure, Long> {
    List<Structure> findByStructureParentId(Long parentId);
    
    @Query("SELECT s FROM Structure s WHERE s.id = :structureId OR s.structureParent.id = :structureId")
    List<Structure> findStructureAndChildren(@Param("structureId") Long structureId);
}
