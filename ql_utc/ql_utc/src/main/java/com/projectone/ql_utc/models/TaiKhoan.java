package com.projectone.ql_utc.models;

import com.projectone.ql_utc.enums.VaiTro;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

@Table(name = "tai_khoan")
public class TaiKhoan {
    @Id
    @Column(name = "ten_tai_khoan", length = 30)
    private String tenTaiKhoan;

    @Column(name = "mau_khau", nullable = false, length = 100)
    private String matKhau;

    @Enumerated(EnumType.STRING)
    @Column(name = "vai_tro", nullable = false)
    private VaiTro vaiTro;

    @ManyToOne
    @JoinColumn(name = "ma_sv")
    private SinhVien sinhVien;

    @ManyToOne
    @JoinColumn(name = "ma_nv")
    private NhanVien nhanVien;




    // getters & setters
}

