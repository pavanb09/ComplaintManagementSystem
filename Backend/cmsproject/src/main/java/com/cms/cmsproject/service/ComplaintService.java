package com.cms.cmsproject.service;

import java.util.List;
import com.cms.cmsproject.entity.Complaint;

public interface ComplaintService {
    Complaint createComplaint(Complaint complaint);
    List<Complaint> getAllComplaints();
    Complaint getComplaintById(Integer id);
    List<Complaint> getComplaintsByUserId(Integer userId);
    List<Complaint> getComplaintsByStatus(String status);
    Complaint updateComplaint(Integer id, Complaint complaint);
    Complaint updateStatus(Integer id, String status);
    void deleteComplaint(Integer id);
}