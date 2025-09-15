package com.projectone.ql_utc.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "lich_su_tb")
public class LichSuThietBi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaLS")
    private Integer maLS;

    @ManyToOne
    @JoinColumn(name = "MaTB", nullable = false)
    private ThietBi thietBi;

    @Column(name = "NgayCapNhat", nullable = false)
    private java.sql.Timestamp ngayCapNhat;

    @Column(name = "TinhTrangMoi", nullable = false, length = 30)
    private String tinhTrangMoi;

    @ManyToOne
    @JoinColumn(name = "NguoiCapNhat")
    private NhanVien nhanVien;

    @Column(name = "GhiChu", length = 200)
    private String ghiChu;

    // getters & setters
}

