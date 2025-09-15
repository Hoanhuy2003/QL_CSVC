package com.projectone.ql_utc.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

@Table(name = "taikhoan")
public class TaiKhoan {
    @Id
    @Column(name = "TenTaiKhoan", length = 30)
    private String tenTaiKhoan;

    @Column(name = "MatKhau", nullable = false, length = 100)
    private String matKhau;

    @Enumerated(EnumType.STRING)
    @Column(name = "VaiTro", nullable = false)
    private VaiTro vaiTro;

    @ManyToOne
    @JoinColumn(name = "MaSV")
    private SinhVien sinhVien;

    @ManyToOne
    @JoinColumn(name = "MaNV")
    private NhanVien nhanVien;

    public enum VaiTro { Admin, NhanVien, SinhVien }

    // getters & setters
}

