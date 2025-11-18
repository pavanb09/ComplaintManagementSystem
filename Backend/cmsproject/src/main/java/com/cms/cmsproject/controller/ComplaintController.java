package com.cms.cmsproject.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cms.cmsproject.dto.StatusDto;
import com.cms.cmsproject.entity.Complaint;
import com.cms.cmsproject.service.ComplaintService;
  

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin("*")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @PostMapping
    public Complaint createComplaint(@RequestBody Complaint complaint) {
        return complaintService.createComplaint(complaint);
    }

    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintService.getAllComplaints();
    }

    @GetMapping("/{id}")
    public Complaint getComplaintById(@PathVariable Integer id) {
        return complaintService.getComplaintById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Complaint> getByUser(@PathVariable Integer userId) {
        return complaintService.getComplaintsByUserId(userId);
    }

    @GetMapping("/status/{status}")
    public List<Complaint> getByStatus(@PathVariable String status) {
   
        return complaintService.getComplaintsByStatus(status);
    }

    @PutMapping("/{id}")
    public Complaint updateComplaint(@PathVariable Integer id, @RequestBody Complaint complaint) {
        return complaintService.updateComplaint(id, complaint);
    }

    @PatchMapping("/{id}/status")
    public Complaint updateStatus(@PathVariable Integer id, @RequestBody StatusDto statusDto) {
    	System.out.println(id);
    	System.out.println(statusDto.getStatus());
        return complaintService.updateStatus(id, statusDto.getStatus());
    }

    @DeleteMapping("/{id}")
    public String deleteComplaint(@PathVariable Integer id) {
        complaintService.deleteComplaint(id);
        return "Complaint deleted with ID: " + id;
    }
}