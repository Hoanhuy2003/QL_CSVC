package com.projectone.ql_utc.services;

import com.projectone.ql_utc.dtos.NhanVienDTO;
import com.projectone.ql_utc.models.NhanVien;
import com.projectone.ql_utc.repositorys.NhanVienRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NhanVienService {

    private final NhanVienRepository repository;

    public NhanVienService(NhanVienRepository repository) {
        this.repository = repository;
    }

    // ==========================================
    // LẤY DỮ LIỆU
    // ==========================================

    /**
     * Lấy tất cả nhân viên
     */
    public List<NhanVienDTO> getAllNhanVien() {
        return repository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Lấy thông tin nhân viên theo mã
     */
    public NhanVienDTO getNhanVienById(String maNV) {
        NhanVien entity = repository.findById(maNV)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên với mã: " + maNV));
        return convertToDTO(entity);
    }

    /**
     * Lấy nhân viên theo email
     */
    public NhanVienDTO getNhanVienByEmail(String email) {
        NhanVien entity = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên với email: " + email));
        return convertToDTO(entity);
    }

    /**
     * Lấy danh sách nhân viên đang làm việc
     */
    public List<NhanVienDTO> getNhanVienDangLamViec() {
        return repository.findByDangLamViec(true).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Tìm kiếm nhân viên theo tên
     */
    public List<NhanVienDTO> searchNhanVienByName(String keyword) {
        return repository.searchByName(keyword).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // ==========================================
    // CẬP NHẬT THÔNG TIN
    // ==========================================

    /**
     * Cập nhật thông tin nhân viên
     */
    @Transactional
    public NhanVienDTO updateNhanVien(String maNV, NhanVienDTO dto) {
        NhanVien entity = repository.findById(maNV)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên"));

        // Kiểm tra email trùng
        if (dto.getEmail() != null && !dto.getEmail().equals(entity.getEmail())) {
            if (repository.existsByEmailAndNotMaNV(dto.getEmail(), maNV)) {
                throw new RuntimeException("Email đã được sử dụng bởi nhân viên khác");
            }
        }

        // Kiểm tra số điện thoại trùng
        if (dto.getSdt() != null && !dto.getSdt().equals(entity.getSdt())) {
            if (repository.existsBySdtAndNotMaNV(dto.getSdt(), maNV)) {
                throw new RuntimeException("Số điện thoại đã được sử dụng bởi nhân viên khác");
            }
        }

        // Cập nhật thông tin
        if (dto.getTenNV() != null && !dto.getTenNV().trim().isEmpty()) {
            entity.setTenNV(dto.getTenNV());
        }
        if (dto.getEmail() != null) {
            entity.setEmail(dto.getEmail());
        }
        if (dto.getSdt() != null) {
            entity.setSdt(dto.getSdt());
        }

        repository.save(entity);
        return convertToDTO(entity);
    }

    /**
     * Cập nhật trạng thái làm việc
     */
    @Transactional
    public NhanVienDTO updateTrangThaiLamViec(String maNV, Boolean dangLamViec) {
        NhanVien entity = repository.findById(maNV)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên"));

        entity.setDangLamViec(dangLamViec);
        repository.save(entity);
        return convertToDTO(entity);
    }

    // ==========================================
    // TẠO MỚI & XÓA
    // ==========================================

    /**
     * Tạo nhân viên mới
     */
    @Transactional
    public NhanVienDTO createNhanVien(NhanVienDTO dto) {
        // Kiểm tra mã nhân viên đã tồn tại
        if (repository.existsById(dto.getMaNV())) {
            throw new RuntimeException("Mã nhân viên đã tồn tại");
        }

        // Kiểm tra email trùng
        if (dto.getEmail() != null && repository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email đã được sử dụng");
        }

        // Kiểm tra số điện thoại trùng
        if (dto.getSdt() != null && repository.findBySdt(dto.getSdt()).isPresent()) {
            throw new RuntimeException("Số điện thoại đã được sử dụng");
        }

        NhanVien entity = new NhanVien();
        entity.setMaNV(dto.getMaNV());
        entity.setTenNV(dto.getTenNV());
        entity.setEmail(dto.getEmail());
        entity.setSdt(dto.getSdt());
        entity.setDangLamViec(dto.getDangLamViec() != null ? dto.getDangLamViec() : true);

        repository.save(entity);
        return convertToDTO(entity);
    }

    /**
     * Xóa nhân viên (soft delete - chuyển trạng thái)
     */
    @Transactional
    public void deleteNhanVien(String maNV) {
        NhanVien entity = repository.findById(maNV)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên"));

        entity.setDangLamViec(false);
        repository.save(entity);
    }

    /**
     * Xóa nhân viên vĩnh viễn
     */
    @Transactional
    public void hardDeleteNhanVien(String maNV) {
        if (!repository.existsById(maNV)) {
            throw new RuntimeException("Không tìm thấy nhân viên");
        }
        repository.deleteById(maNV);
    }

    // ==========================================
    // THỐNG KÊ
    // ==========================================

    public long countNhanVienDangLamViec() {
        return repository.countByDangLamViec(true);
    }

    public long countNhanVienDaNghi() {
        return repository.countByDangLamViec(false);
    }

    // ==========================================
    // HELPER - CONVERT
    // ==========================================

    private NhanVienDTO convertToDTO(NhanVien entity) {
        NhanVienDTO dto = new NhanVienDTO();
        dto.setMaNV(entity.getMaNV());
        dto.setTenNV(entity.getTenNV());
        dto.setEmail(entity.getEmail());
        dto.setSdt(entity.getSdt());
        dto.setDangLamViec(entity.getDangLamViec());
        return dto;
    }
}