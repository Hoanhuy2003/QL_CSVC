package com.projectone.ql_utc.models;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "bao_tri")
public class BaoTri {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_bt")
    private String maBT;

    @ManyToOne
    @JoinColumn(name = "ma_tb", nullable = false)
    private ThietBi thietBi;

    @Column(name = "ngay_bt", nullable = false)
    private java.sql.Date ngayBT;

    @Column(name = "noi_dung", length = 200)
    private String noiDung;

    @ManyToOne
    @JoinColumn(name = "nhan_vien_phu_trach")
    private NhanVien nhanVien;

    @Column(name = "chi_phi", precision = 18, scale = 2)
    private BigDecimal chiPhi;

    // getters & setters
}

