package com.projectone.ql_utc.repositorys;

import com.projectone.ql_utc.enums.TrangThaiBaoTri;
import com.projectone.ql_utc.models.BaoTri;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BaoTriRepository extends JpaRepository<BaoTri, String> {

    // Tìm theo thiết bị
    List<BaoTri> findByThietBi_MaTB(String maTB);

    // Tìm theo nhân viên
    List<BaoTri> findByNhanVienPhuTrach_MaNV(String maNV);

    // Tìm theo trạng thái
    List<BaoTri> findByTrangThai(TrangThaiBaoTri trangThai);

    // Tìm theo khoảng thời gian
    @Query("SELECT b FROM BaoTri b WHERE b.ngayBT BETWEEN :tuNgay AND :denNgay")
    List<BaoTri> findByNgayBTBetween(@Param("tuNgay") Date tuNgay, @Param("denNgay") Date denNgay);

    // Đếm theo trạng thái
    Long countByTrangThai(TrangThaiBaoTri trangThai);

    // Tính tổng chi phí theo trạng thái
    // FIX: Changed b.trangThaiMuon to b.trangThai
    @Query("SELECT COALESCE(SUM(b.chiPhi), 0) FROM BaoTri b WHERE b.trangThai = :trangThai")
    Double sumChiPhiByTrangThai(@Param("trangThai") TrangThaiBaoTri trangThai);

    // Tính tổng chi phí tất cả
    @Query("SELECT COALESCE(SUM(b.chiPhi), 0) FROM BaoTri b")
    Double sumAllChiPhi();

    // Tìm bảo trì gần đây
    @Query("SELECT b FROM BaoTri b ORDER BY b.ngayBT DESC")
    List<BaoTri> findRecentMaintenance();

    // Tìm theo nhiều điều kiện
    // FIX: Changed b.trangThaiMuon to b.trangThai
    @Query("SELECT b FROM BaoTri b WHERE " +
            "(:maTB IS NULL OR b.thietBi.maTB = :maTB) AND " +
            "(:trangThai IS NULL OR b.trangThai = :trangThai) AND " +
            "(:tuNgay IS NULL OR b.ngayBT >= :tuNgay) AND " +
            "(:denNgay IS NULL OR b.ngayBT <= :denNgay)")
    List<BaoTri> searchBaoTri(
            @Param("maTB") String maTB,
            @Param("trangThai") TrangThaiBaoTri trangThai,
            @Param("tuNgay") Date tuNgay,
            @Param("denNgay") Date denNgay
    );
}