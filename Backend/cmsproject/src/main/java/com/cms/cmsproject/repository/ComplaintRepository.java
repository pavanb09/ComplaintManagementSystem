package com.cms.cmsproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cms.cmsproject.entity.Complaint;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Integer> {

    // Get complaints by user (optional)
    List<Complaint> findByUserId(Integer userId);

    // Filter by status (optional)
    List<Complaint> findByStatus(String status);
}