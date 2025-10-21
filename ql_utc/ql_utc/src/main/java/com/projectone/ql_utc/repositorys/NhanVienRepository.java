package com.projectone.ql_utc.repositorys;

import com.projectone.ql_utc.models.NhanVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NhanVienRepository extends JpaRepository<NhanVien, String> {

    // Tìm nhân viên theo email
    Optional<NhanVien> findByEmail(String email);

    // Tìm nhân viên theo số điện thoại
    Optional<NhanVien> findBySdt(String sdt);

    // Lấy danh sách nhân viên đang làm việc
    List<NhanVien> findByDangLamViec(Boolean dangLamViec);

    // Tìm kiếm nhân viên theo tên (LIKE)
    @Query("SELECT nv FROM NhanVien nv WHERE LOWER(nv.tenNV) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<NhanVien> searchByName(String keyword);

    // Đếm số nhân viên đang làm việc
    long countByDangLamViec(Boolean dangLamViec);

    // Kiểm tra email đã tồn tại (trừ mã nhân viên hiện tại)
    @Query("SELECT COUNT(nv) > 0 FROM NhanVien nv WHERE nv.email = :email AND nv.maNV != :maNV")
    boolean existsByEmailAndNotMaNV(String email, String maNV);

    // Kiểm tra số điện thoại đã tồn tại (trừ mã nhân viên hiện tại)
    @Query("SELECT COUNT(nv) > 0 FROM NhanVien nv WHERE nv.sdt = :sdt AND nv.maNV != :maNV")
    boolean existsBySdtAndNotMaNV(String sdt, String maNV);
}