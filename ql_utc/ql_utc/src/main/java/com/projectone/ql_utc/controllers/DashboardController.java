package com.projectone.ql_utc.controllers;

import com.projectone.ql_utc.dtos.DashboardStatsResponse;
import com.projectone.ql_utc.dtos.RecentActivityResponse;
import com.projectone.ql_utc.services.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    /**
     * Lấy thống kê tổng quan cho dashboard
     * GET /api/dashboard/stats
     */
    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsResponse> getStats() {
        return ResponseEntity.ok(dashboardService.getStats());
    }

    /**
     * Lấy danh sách hoạt động gần đây
     * GET /api/dashboard/recent-activities
     */
    @GetMapping("/recent-activities")
    public ResponseEntity<List<RecentActivityResponse>> getRecentActivities() {
        return ResponseEntity.ok(dashboardService.getRecentActivities());
    }
}