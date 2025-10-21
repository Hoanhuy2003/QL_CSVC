package com.projectone.ql_utc.models;

import com.projectone.ql_utc.enums.TinhTrangKhiTra;
import com.projectone.ql_utc.enums.TrangThaiCTPhieuMuon;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ct_phieu_muon")
@IdClass(CTPhieuMuonId.class)
public class CTPhieuMuon {

    @Id
    @ManyToOne
    @JoinColumn(name = "ma_pm", nullable = false)
    private PhieuMuon phieuMuon;

    @Id
    @ManyToOne
    @JoinColumn(name = "ma_tb", nullable = false)
    private ThietBi thietBi;

    // ===== TRẠNG THÁI =====
    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai", length = 15)
    @Builder.Default
    private TrangThaiCTPhieuMuon trangThai = TrangThaiCTPhieuMuon.CHO_LAY;

    // ===== THỜI GIAN CỤ THỂ =====
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "thoi_diem_lay", columnDefinition = "DATETIME(6)")
    private Date thoiDiemLay;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "thoi_diem_tra", columnDefinition = "DATETIME(6)")
    private Date thoiDiemTra;

    // ===== TÌNH TRẠNG KHI TRẢ =====
    @Enumerated(EnumType.STRING)
    @Column(name = "tinh_trang_khi_tra", length = 15)
    private TinhTrangKhiTra tinhTrangKhiTra;

    @Column(name = "mo_ta_hong", length = 500)
    private String moTaHong;

    @Column(name = "phi_boi_thuong", precision = 18, scale = 2)
    @Builder.Default
    private BigDecimal phiBoiThuong = BigDecimal.ZERO;

    @Column(name = "da_thanh_toan")
    @Builder.Default
    private Boolean daThanhToan = false;

    // ===== GHI CHÚ =====
    @Column(name = "ghi_chu", length = 500)
    private String ghiChu;

    // ===== SINH VIÊN PHỤ TRÁCH (nếu mượn theo lớp) =====
    @ManyToOne
    @JoinColumn(name = "ma_sv")
    private SinhVien sinhVien;

    // ===== HELPER METHODS =====

    /**
     * Kiểm tra thiết bị đã được lấy chưa
     */
    public boolean daLay() {
        return this.thoiDiemLay != null;
    }

    /**
     * Kiểm tra thiết bị đã được trả chưa
     */
    public boolean daTra() {
        return this.thoiDiemTra != null;
    }

    /**
     * Kiểm tra có phí bồi thường không
     */
    public boolean coPhiBoiThuong() {
        return this.phiBoiThuong != null && this.phiBoiThuong.compareTo(BigDecimal.ZERO) > 0;
    }

    /**
     * Kiểm tra thiết bị có bị hỏng/mất không
     */
    public boolean biHongHoacMat() {
        return TrangThaiCTPhieuMuon.HONG.equals(this.trangThai)
                || TrangThaiCTPhieuMuon.MAT.equals(this.trangThai);
    }
}
