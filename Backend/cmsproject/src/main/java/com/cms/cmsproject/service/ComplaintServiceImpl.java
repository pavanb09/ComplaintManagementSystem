package com.cms.cmsproject.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.cmsproject.entity.Complaint;
import com.cms.cmsproject.exception.ResourceNotFoundException;
import com.cms.cmsproject.repository.ComplaintRepository;


@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Override
    public Complaint createComplaint(Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    @Override
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @Override
    public Complaint getComplaintById(Integer id) {
        return complaintRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Complaint not found with id: " + id));
    }

    @Override
    public List<Complaint> getComplaintsByUserId(Integer userId) {
        return complaintRepository.findByUserId(userId);
    }

    @Override
    public List<Complaint> getComplaintsByStatus(String status) {
        return complaintRepository.findByStatus(status);
    }

    @Override
    public Complaint updateComplaint(Integer id, Complaint complaint) {
        Complaint existing = getComplaintById(id);
        existing.setTitle(complaint.getTitle());
        existing.setCategory(complaint.getCategory());
        existing.setDescription(complaint.getDescription());
        existing.setStatus(complaint.getStatus());
        existing.setUserId(complaint.getUserId());
        return complaintRepository.save(existing);
    }

    @Override
    public Complaint updateStatus(Integer id, String status) {
        Complaint existing = getComplaintById(id);
        existing.setStatus(status);
        return complaintRepository.save(existing);
    }

    @Override
    public void deleteComplaint(Integer id) {
        Complaint existing = getComplaintById(id);
        complaintRepository.deleteById(existing.getId());
    }
}