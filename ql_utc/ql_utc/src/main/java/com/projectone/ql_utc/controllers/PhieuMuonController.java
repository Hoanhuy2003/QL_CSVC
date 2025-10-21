package com.projectone.ql_utc.controllers;

import com.projectone.ql_utc.dtos.PhieuMuonRequest;
import com.projectone.ql_utc.dtos.PhieuMuonResponse;
import com.projectone.ql_utc.enums.LoaiPhieu;
import com.projectone.ql_utc.enums.TrangThaiPhieuMuon;
import com.projectone.ql_utc.services.PhieuMuonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/phieu-muon")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class PhieuMuonController {

    private final PhieuMuonService service;

    // ===============================
    // LẤY DỮ LIỆU
    // ===============================

    @GetMapping("/all")
    public ResponseEntity<List<PhieuMuonResponse>> getAllPhieuMuon() {
        return ResponseEntity.ok(service.getAllPhieuMuon());
    }

    @GetMapping("/{maPM}")
    public ResponseEntity<PhieuMuonResponse> getPhieuMuonById(@PathVariable String maPM) {
        return ResponseEntity.ok(service.getPhieuMuonById(maPM));
    }

    @GetMapping("/trang-thai/{trangThai}")
    public ResponseEntity<List<PhieuMuonResponse>> getPhieuMuonByTrangThai(
            @PathVariable TrangThaiPhieuMuon trangThai) {
        return ResponseEntity.ok(service.getPhieuMuonByTrangThai(trangThai));
    }

    @GetMapping("/sinh-vien/{maSV}")
    public ResponseEntity<List<PhieuMuonResponse>> getPhieuMuonBySinhVien(@PathVariable String maSV) {
        return ResponseEntity.ok(service.getPhieuMuonBySinhVien(maSV));
    }

    @GetMapping("/qua-han")
    public ResponseEntity<List<PhieuMuonResponse>> getPhieuMuonQuaHan() {
        return ResponseEntity.ok(service.getPhieuMuonQuaHan());
    }

    // ===============================
    // TẠO & HỦY PHIẾU
    // ===============================

    @PostMapping("/tao")
    public ResponseEntity<PhieuMuonResponse> taoPhieuMuon(@Valid @RequestBody PhieuMuonRequest request) {
        PhieuMuonResponse response = service.taoPhieuMuon(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{maPM}")
    public ResponseEntity<String> huyPhieuMuon(@PathVariable String maPM) {
        service.huyPhieuMuon(maPM);
        return ResponseEntity.ok("Đã hủy phiếu mượn thành công");
    }

    // ===============================
    // THỐNG KÊ
    // ===============================

    @GetMapping("/thong-ke/trang-thai")
    public ResponseEntity<Map<String, Long>> thongKeTrangThai() {
        return ResponseEntity.ok(service.countAllStatuses());
    }

    @GetMapping("/thong-ke/loai-phieu")
    public ResponseEntity<Map<String, Long>> thongKeLoaiPhieu() {
        return ResponseEntity.ok(service.countByLoaiPhieu());
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countByStatus(
            @RequestParam(name = "status", required = false) TrangThaiPhieuMuon status) {
        return ResponseEntity.ok(service.countPhieuMuonByStatus(status));
    }
}
