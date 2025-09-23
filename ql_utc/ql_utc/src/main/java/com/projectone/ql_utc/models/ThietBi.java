package com.projectone.ql_utc.models;

import com.projectone.ql_utc.enums.TinhTrangThietBi;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
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
@Table(name = "thiet_bi")
public class ThietBi {
    @Id
    @Column(name = "ma_tb", length = 30)
    private String maTB;

    @Column(name = "ten_tb", nullable = false, length = 100)
    private String tenTB;

    @ManyToOne
    @JoinColumn(name = "ma_loai", nullable = false)
    private LoaiThietBi loai;

    @Column(name = "ngay_nhap", nullable = false)
    private Date ngayNhap;

    @Column(name = "tinh_trang", length = 30)
    private TinhTrangThietBi tinhTrang;

    @Column(name = "gia_tri", precision = 18, scale = 2)
    private BigDecimal giaTri;
}
