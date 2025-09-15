package com.projectone.ql_utc.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "thietbi")
public class ThietBi {
    @Id
    @Column(name = "MaTB", length = 30)
    private String maTB;

    @Column(name = "TenTB", nullable = false, length = 100)
    private String tenTB;

    @ManyToOne
    @JoinColumn(name = "MaLoai", nullable = false)
    private LoaiThietBi loai;

    @Column(name = "NgayNhap", nullable = false)
    private Date ngayNhap;

    @Column(name = "TinhTrang", length = 30)
    private String tinhTrang = "Đang sử dụng";

    @Column(name = "GiaTri", precision = 18, scale = 2)
    private Double giaTri;
}
