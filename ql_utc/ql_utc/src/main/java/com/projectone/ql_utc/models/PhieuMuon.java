package com.projectone.ql_utc.models;

import com.projectone.ql_utc.enums.LoaiPhieu;
import com.projectone.ql_utc.enums.TrangThaiPhieuMuon;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "phieu_muon")
public class PhieuMuon {

    @Id
    @Column(name = "ma_pm", length = 255)
    private String maPM;

    // ===== LOẠI PHIẾU =====
    @Enumerated(EnumType.STRING)
    @Column(name = "loai_phieu", nullable = false, length = 10)
    private LoaiPhieu loaiPhieu;

    // ===== NGƯỜI/LỚP MƯỢN =====
    @ManyToOne
    @JoinColumn(name = "ma_sv")
    private SinhVien sinhVien;

    @ManyToOne
    @JoinColumn(name = "ma_ltc")
    private LopTinChi lopTinChi;

    // ===== NƠI MƯỢN =====
    @ManyToOne
    @JoinColumn(name = "ma_phong", nullable = false)
    private Phong phong;

    // ===== THỜI GIAN =====
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "ngay_tao", columnDefinition = "DATETIME(6)")
    private Date ngayTao;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "thoi_diem_muon", nullable = false, columnDefinition = "DATETIME(6)")
    private Date thoiDiemMuon;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "han_tra", nullable = false, columnDefinition = "DATETIME(6)")
    private Date hanTra;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "thoi_diem_tra", columnDefinition = "DATETIME(6)")
    private Date thoiDiemTra;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "ngay_duyet", columnDefinition = "DATETIME(6)")
    private Date ngayDuyet;

    // ===== TRẠNG THÁI =====
    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai", length = 15)
    @Builder.Default
    private TrangThaiPhieuMuon trangThai = TrangThaiPhieuMuon.CHO_DUYET;

    // ===== NGƯỜI XỬ LÝ =====
    @ManyToOne
    @JoinColumn(name = "nguoi_lap_phieu")
    private NhanVien nguoiLapPhieu;

    @ManyToOne
    @JoinColumn(name = "nguoi_duyet")
    private NhanVien nguoiDuyet;

    @ManyToOne
    @JoinColumn(name = "nguoi_giao_thiet_bi")
    private NhanVien nguoiGiaoThietBi;

    @ManyToOne
    @JoinColumn(name = "nguoi_nhan_tra")
    private NhanVien nguoiNhanTra;

    // ===== GHI CHÚ & PHÍ =====
    @Column(name = "muc_dich", length = 300)
    private String mucDich;

    @Column(name = "ghi_chu", length = 500)
    private String ghiChu;

    @Column(name = "ly_do_tu_choi", length = 300)
    private String lyDoTuChoi;

    @Column(name = "tong_phi_boi_thuong", precision = 18, scale = 2)
    @Builder.Default
    private BigDecimal tongPhiBoiThuong = BigDecimal.ZERO;

    // ===== QUAN HỆ =====
    @OneToMany(mappedBy = "phieuMuon", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CTPhieuMuon> chiTietPhieuMuon;

    @OneToMany(mappedBy = "phieuMuon", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<CTPhieuMuon> chiTietPhieuMuons = new ArrayList<>();


    // ===== HELPER METHODS =====

    /**
     * Kiểm tra phiếu mượn cá nhân
     */
    public boolean isCaNhan() {
        return LoaiPhieu.CA_NHAN.equals(this.loaiPhieu);
    }

    /**
     * Kiểm tra phiếu mượn lớp học
     */
    public boolean isLopHoc() {
        return LoaiPhieu.LOP_HOC.equals(this.loaiPhieu);
    }

    /**
     * Kiểm tra phiếu có thể duyệt không
     */
    public boolean coDuocDuyet() {
        return TrangThaiPhieuMuon.CHO_DUYET.equals(this.trangThai);
    }

    /**
     * Kiểm tra phiếu đã quá hạn chưa
     */
    public boolean daQuaHan() {
        return this.hanTra != null && new Date().after(this.hanTra)
                && !TrangThaiPhieuMuon.DA_TRA.equals(this.trangThai);
    }

    /**
     * Lấy tên người mượn
     */
    public String getTenNguoiMuon() {
        if (isCaNhan() && sinhVien != null) {
            return sinhVien.getTenSV();
        } else if (isLopHoc() && lopTinChi != null) {
            return lopTinChi.getMonHoc() + " - Nhóm " + lopTinChi.getNhom();
        }
        return "N/A";
    }
}