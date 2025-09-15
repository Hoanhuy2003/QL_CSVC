package com.projectone.ql_utc.models;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "phieumuon")
public class PhieuMuon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaPM")
    private Integer maPM;

    @ManyToOne
    @JoinColumn(name = "MaPhong", nullable = false)
    private Phong phong;

    @ManyToOne
    @JoinColumn(name = "MaLTC", nullable = false)
    private LopTinChi lopTinChi;

    @Column(name = "ThoiDiemMuon", nullable = false)
    private java.sql.Timestamp thoiDiemMuon;

    @Column(name = "HanTra", nullable = false)
    private java.sql.Timestamp hanTra;

    @Column(name = "ThoiDiemTra")
    private java.sql.Timestamp thoiDiemTra;

    @ManyToOne
    @JoinColumn(name = "NguoiLapPhieu")
    private NhanVien nhanVien;

    // getters & setters
}
