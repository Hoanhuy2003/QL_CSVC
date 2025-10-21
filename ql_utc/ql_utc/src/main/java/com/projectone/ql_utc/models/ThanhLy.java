package com.projectone.ql_utc.models;

import com.projectone.ql_utc.enums.TrangThaiThanhLy;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "thanh_ly")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ThanhLy {

    @Id
    @Column(name = "ma_tl", length = 255)
    private String maTL;

    // ===== NGÀY TẠO (THIẾU TRƯỜNG NÀY) =====
    @Column(name = "ngay_tao")
    @Temporal(TemporalType.TIMESTAMP)
    private Date ngayTao;

    // ===== THIẾT BỊ =====
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ma_tb", nullable = false)
    private ThietBi thietBi;

    // ===== THÔNG TIN THANH LÝ =====
    @Column(name = "ngay_thanh_ly", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date ngayThanhLy;

    @Column(name = "ly_do", length = 200)
    private String lyDo;

    @Column(name = "gia_tri_thu_hoi", precision = 18, scale = 2)
    private BigDecimal giaTriThuHoi;

    // ===== TRẠNG THÁI =====
    @Column(name = "trang_thai", length = 50)
    @Enumerated(EnumType.STRING)
    private TrangThaiThanhLy trangThai;

    // ===== THÔNG TIN DUYỆT =====
    @Column(name = "ngay_duyet")
    @Temporal(TemporalType.TIMESTAMP)
    private Date ngayDuyet;

    @Column(name = "ly_do_tu_choi", length = 300)
    private String lyDoTuChoi;

    // ===== NHÂN VIÊN (NẾU CẦN) =====
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ma_nv_de_xuat")
    private NhanVien nguoiDeXuat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ma_nv_duyet")
    private NhanVien nguoiDuyet;

    // ===== LIFECYCLE CALLBACKS =====
    @PrePersist
    private void prePersist() {
        if (ngayTao == null) {
            ngayTao = new Date();
        }
        if (trangThai == null) {
            trangThai = TrangThaiThanhLy.CHO_DUYET;
        }
        if (giaTriThuHoi == null) {
            giaTriThuHoi = BigDecimal.ZERO;
        }
    }
}