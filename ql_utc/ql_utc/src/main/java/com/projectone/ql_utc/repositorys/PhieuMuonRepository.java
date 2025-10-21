package com.projectone.ql_utc.repositorys;

import com.projectone.ql_utc.enums.LoaiPhieu;
import com.projectone.ql_utc.enums.TrangThaiPhieuMuon;
import com.projectone.ql_utc.models.PhieuMuon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PhieuMuonRepository extends JpaRepository<PhieuMuon, String> {

    // ==========================================
    // ĐẾM SỐ LƯỢNG
    // ==========================================

    // Đếm theo trạng thái
    Long countByTrangThai(TrangThaiPhieuMuon trangThai);

    // Đếm theo loại phiếu
    Long countByLoaiPhieu(LoaiPhieu loaiPhieu);

    // ✅ THÊM: Đếm theo nhiều trạng thái (cho Dashboard efficiency)
    Long countByTrangThaiIn(List<TrangThaiPhieuMuon> trangThais);

    // ==========================================
    // TÌM KIẾM CƠ BẢN
    // ==========================================

    // Tìm theo trạng thái
    List<PhieuMuon> findByTrangThai(TrangThaiPhieuMuon trangThai);

    // Tìm theo loại phiếu
    List<PhieuMuon> findByLoaiPhieu(LoaiPhieu loaiPhieu);

    // Tìm theo sinh viên
    List<PhieuMuon> findBySinhVien_MaSV(String maSV);

    // Tìm theo lớp tín chỉ
    List<PhieuMuon> findByLopTinChi_MaLTC(String maLTC);

    // Tìm theo nhân viên duyệt
    List<PhieuMuon> findByNguoiDuyet_MaNV(String maNV);

    // Tìm theo phòng
    List<PhieuMuon> findByPhong_MaPhong(String maPhong);

    // ==========================================
    // TÌM KIẾM ĐẶC BIỆT
    // ==========================================

    // Tìm phiếu quá hạn
    @Query("SELECT p FROM PhieuMuon p WHERE p.hanTra < :now AND p.trangThai IN ('DANG_MUON', 'DA_DUYET')")
    List<PhieuMuon> findPhieuQuaHan(@Param("now") Date now);

    // Tìm phiếu có phí bồi thường
    @Query("SELECT p FROM PhieuMuon p WHERE p.tongPhiBoiThuong > 0")
    List<PhieuMuon> findPhieuCoPhiBoiThuong();

    // ✅ THÊM: Tìm phiếu quá hạn theo trạng thái cụ thể
    List<PhieuMuon> findByTrangThaiAndHanTraBefore(TrangThaiPhieuMuon trangThai, Date now);

    // ==========================================
    // CHO DASHBOARD (HOẠT ĐỘNG GẦN ĐÂY)
    // ==========================================

    // ✅ THÊM: Lấy 5 phiếu mới nhất (sắp xếp theo ngày tạo)
    List<PhieuMuon> findTop5ByOrderByNgayTaoDesc();

    // ✅ THÊM: Lấy 10 phiếu mới nhất
    List<PhieuMuon> findTop10ByOrderByNgayTaoDesc();

    // ✅ THÊM: Lấy phiếu theo khoảng thời gian
    @Query("SELECT p FROM PhieuMuon p WHERE p.ngayTao BETWEEN :start AND :end ORDER BY p.ngayTao DESC")
    List<PhieuMuon> findByNgayTaoBetween(@Param("start") Date start, @Param("end") Date end);
}