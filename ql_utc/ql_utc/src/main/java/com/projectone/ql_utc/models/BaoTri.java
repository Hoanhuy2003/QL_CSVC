package com.projectone.ql_utc.models;

import com.projectone.ql_utc.enums.TrangThaiBaoTri;
import lombok.*;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "bao_tri")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BaoTri {

    @Id
    @Column(name = "ma_bt", length = 255)
    private String maBT;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ma_tb", nullable = false)
    private ThietBi thietBi;

    @Column(name = "ngay_bt", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date ngayBT;

    @Column(name = "noi_dung", length = 200)
    private String noiDung;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nhan_vien_phu_trach")
    private NhanVien nhanVienPhuTrach;

    @Column(name = "chi_phi", precision = 18, scale = 2)
    private BigDecimal chiPhi;

    // QUAN TRỌNG: Map đúng với database
    @Column(name = "trang_thai", length = 50)
    @Enumerated(EnumType.STRING)
    private TrangThaiBaoTri trangThai;

    @Column(name = "ghi_chu", length = 500)
    private String ghiChu;

    // Constructor helper
    @PrePersist
    protected void onCreate() {
        if (this.chiPhi == null) {
            this.chiPhi = BigDecimal.ZERO;
        }
        if (this.trangThai == null) {
            this.trangThai = TrangThaiBaoTri.DANG_THUC_HIEN;
        }
    }
}