package com.projectone.ql_utc.controllers;

import com.projectone.ql_utc.dtos.NhanVienDTO;
import com.projectone.ql_utc.services.NhanVienService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/nhan_vien")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class NhanVienController {

    private final NhanVienService service;

    // ===============================
    // LẤY THÔNG TIN
    // ===============================

    /**
     * Lấy tất cả nhân viên
     * GET /api/nhan_vien/all
     */
    @GetMapping("/all")
    public ResponseEntity<List<NhanVienDTO>> getAllNhanVien() {
        return ResponseEntity.ok(service.getAllNhanVien());
    }

    /**
     * Lấy thông tin nhân viên theo mã
     * GET /api/nhan_vien/{maNV}
     */
    @GetMapping("/{maNV}")
    public ResponseEntity<NhanVienDTO> getNhanVienById(@PathVariable String maNV) {
        try {
            NhanVienDTO dto = service.getNhanVienById(maNV);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /**
     * Lấy nhân viên theo email
     * GET /api/nhan_vien/email/{email}
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<NhanVienDTO> getNhanVienByEmail(@PathVariable String email) {
        try {
            return ResponseEntity.ok(service.getNhanVienByEmail(email));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /**
     * Lấy danh sách nhân viên đang làm việc
     * GET /api/nhan_vien/dang-lam-viec
     */
    @GetMapping("/dang-lam-viec")
    public ResponseEntity<List<NhanVienDTO>> getNhanVienDangLamViec() {
        return ResponseEntity.ok(service.getNhanVienDangLamViec());
    }

    /**
     * Tìm kiếm nhân viên theo tên
     * GET /api/nhan_vien/search?keyword=...
     */
    @GetMapping("/search")
    public ResponseEntity<List<NhanVienDTO>> searchNhanVien(@RequestParam String keyword) {
        return ResponseEntity.ok(service.searchNhanVienByName(keyword));
    }

    // ===============================
    // CẬP NHẬT THÔNG TIN
    // ===============================

    /**
     * Cập nhật thông tin nhân viên
     * PUT /api/nhan_vien/{maNV}
     */
    @PutMapping("/{maNV}")
    public ResponseEntity<Map<String, Object>> updateNhanVien(
            @PathVariable String maNV,
            @Valid @RequestBody NhanVienDTO dto) {
        try {
            NhanVienDTO updated = service.updateNhanVien(maNV, dto);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Cập nhật thông tin thành công",
                    "data", updated
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    /**
     * Cập nhật trạng thái làm việc
     * PATCH /api/nhan_vien/{maNV}/trang-thai
     */
    @PatchMapping("/{maNV}/trang-thai")
    public ResponseEntity<Map<String, Object>> updateTrangThaiLamViec(
            @PathVariable String maNV,
            @RequestBody Map<String, Boolean> body) {
        try {
            Boolean dangLamViec = body.get("dangLamViec");
            NhanVienDTO updated = service.updateTrangThaiLamViec(maNV, dangLamViec);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Cập nhật trạng thái thành công",
                    "data", updated
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    // ===============================
    // TẠO MỚI & XÓA
    // ===============================

    /**
     * Tạo nhân viên mới
     * POST /api/nhan_vien
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> createNhanVien(@Valid @RequestBody NhanVienDTO dto) {
        try {
            NhanVienDTO created = service.createNhanVien(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "success", true,
                    "message", "Tạo nhân viên mới thành công",
                    "data", created
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    /**
     * Xóa nhân viên (soft delete)
     * DELETE /api/nhan_vien/{maNV}
     */
    @DeleteMapping("/{maNV}")
    public ResponseEntity<Map<String, Object>> deleteNhanVien(@PathVariable String maNV) {
        try {
            service.deleteNhanVien(maNV);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Đã chuyển nhân viên sang trạng thái nghỉ việc"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    /**
     * Xóa vĩnh viễn nhân viên
     * DELETE /api/nhan_vien/{maNV}/hard
     */
    @DeleteMapping("/{maNV}/hard")
    public ResponseEntity<Map<String, Object>> hardDeleteNhanVien(@PathVariable String maNV) {
        try {
            service.hardDeleteNhanVien(maNV);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Đã xóa nhân viên vĩnh viễn"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    // ===============================
    // THỐNG KÊ
    // ===============================

    /**
     * Thống kê nhân viên
     * GET /api/nhan_vien/thong-ke
     */
    @GetMapping("/thong-ke")
    public ResponseEntity<Map<String, Long>> thongKeNhanVien() {
        return ResponseEntity.ok(Map.of(
                "tongSo", service.getAllNhanVien().size() * 1L,
                "dangLamViec", service.countNhanVienDangLamViec(),
                "daNghi", service.countNhanVienDaNghi()
        ));
    }
}