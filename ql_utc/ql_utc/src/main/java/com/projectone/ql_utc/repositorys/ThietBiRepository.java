package com.projectone.ql_utc.repositorys;

import com.projectone.ql_utc.enums.TinhTrangThietBi;
import com.projectone.ql_utc.models.ThietBi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Repository
public interface ThietBiRepository extends JpaRepository<ThietBi, String> {

    // ==========================================
    // TÌM KIẾM CƠ BẢN
    // ==========================================

    // Tìm thiết bị theo loại thiết bị (qua mã loại)
    List<ThietBi> findByLoai_MaLoai(String maLoai);

    // Tìm thiết bị theo tình trạng
    List<ThietBi> findByTinhTrang(TinhTrangThietBi tinhTrang);

    // Tìm thiết bị theo tên gần đúng (có chứa từ khóa)
    List<ThietBi> findByTenTBContainingIgnoreCase(String keyword);

    // ==========================================
    // ĐẾM SỐ LƯỢNG
    // ==========================================

    // Đếm số lượng thiết bị theo mã loại
    Long countByLoai_MaLoai(String maLoai);

    // ✅ THÊM: Đếm theo tình trạng (CHO DASHBOARD)
    Long countByTinhTrang(TinhTrangThietBi tinhTrang);

    // ==========================================
    // TÌM KIẾM NÂNG CAO
    // ==========================================

    // Tìm thiết bị có giá trị lớn hơn hoặc bằng giá trị chỉ định
    List<ThietBi> findByGiaTriGreaterThanEqual(BigDecimal giaTri);

    // Tìm thiết bị theo khoảng ngày nhập
    @Query("SELECT t FROM ThietBi t WHERE t.ngayNhap BETWEEN :start AND :end")
    List<ThietBi> findByNgayNhapBetween(@Param("start") Date start, @Param("end") Date end);

    // ✅ THÊM: Tìm thiết bị sẵn sàng để mượn
    @Query("SELECT t FROM ThietBi t WHERE t.tinhTrang = 'SAN_SANG' ORDER BY t.tenTB")
    List<ThietBi> findAvailableThietBi();

    // ✅ THÊM: Tìm thiết bị cần bảo trì (hỏng hoặc đang bảo trì)
    @Query("SELECT t FROM ThietBi t WHERE t.tinhTrang IN ('HONG', 'DANG_BAO_TRI')")
    List<ThietBi> findThietBiCanBaoTri();

    // ✅ THÊM: Tìm thiết bị theo nhiều tình trạng
    List<ThietBi> findByTinhTrangIn(List<TinhTrangThietBi> tinhTrangs);

    // ✅ THÊM: Thống kê thiết bị theo loại
    @Query("SELECT t.loai.tenLoai as loai, COUNT(t) as soLuong FROM ThietBi t GROUP BY t.loai.tenLoai")
    List<Object[]> thongKeTheoLoai();
}