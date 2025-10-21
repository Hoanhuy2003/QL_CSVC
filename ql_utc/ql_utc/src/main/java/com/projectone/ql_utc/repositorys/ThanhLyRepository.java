package com.projectone.ql_utc.repositorys;

import com.projectone.ql_utc.enums.TrangThaiThanhLy;
import com.projectone.ql_utc.models.ThanhLy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ThanhLyRepository extends JpaRepository<ThanhLy, String> {

    // Tìm theo thiết bị
    List<ThanhLy> findByThietBi_MaTB(String maTB);

    // Tìm theo trạng thái
    List<ThanhLy> findByTrangThai(TrangThaiThanhLy trangThai);

    // Đếm theo trạng thái
    Long countByTrangThai(TrangThaiThanhLy trangThai);

    // Tìm theo khoảng thời gian
    @Query("SELECT t FROM ThanhLy t WHERE t.ngayThanhLy BETWEEN :tuNgay AND :denNgay")
    List<ThanhLy> findByNgayThanhLyBetween(@Param("tuNgay") Date tuNgay, @Param("denNgay") Date denNgay);

    // Tính tổng giá trị thu hồi
    @Query("SELECT COALESCE(SUM(t.giaTriThuHoi), 0) FROM ThanhLy t WHERE t.trangThai = :trangThai")
    Double sumGiaTriThuHoiByTrangThai(@Param("trangThai") TrangThaiThanhLy trangThai);
}