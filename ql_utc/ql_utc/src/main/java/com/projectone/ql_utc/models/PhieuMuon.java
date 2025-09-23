package com.projectone.ql_utc.models;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "phieu_muon")
public class PhieuMuon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_pm")
    private String maPM;

    @ManyToOne
    @JoinColumn(name = "ma_phong", nullable = false)
    private Phong phong;

    @ManyToOne
    @JoinColumn(name = "ma_ltc", nullable = false)
    private LopTinChi lopTinChi;

    @Column(name = "thoi_diem_muon", nullable = false)
    private Date thoiDiemMuon;

    @Column(name = "han_tra", nullable = false)
    private Date hanTra;

    @Column(name = "thoi_diem_tra")
    private Date thoiDiemTra;

    @ManyToOne
    @JoinColumn(name = "nguoi_lap_phieu")
    private NhanVien nhanVien;

    // getters & setters
}
