package com.projectone.ql_utc.repositorys;

import com.projectone.ql_utc.models.SinhVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SinhVienRepository extends JpaRepository<SinhVien, String> {
    Optional<SinhVien> findByMaSV(String maSV);
    List<SinhVien> findByLop(String lop);
    List<SinhVien> findByTenSVContainingIgnoreCase(String tenSV);
}