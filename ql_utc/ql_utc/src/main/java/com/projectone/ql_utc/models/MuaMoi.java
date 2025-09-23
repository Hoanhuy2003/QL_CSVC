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
@Table(name = "mua_moi")
public class MuaMoi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mua_moi")
    private String maMua;

    @ManyToOne
    @JoinColumn(name = "matb", nullable = false)
    private ThietBi thietBi;

    @Column(name = "ngay_mua", nullable = false)
    private java.sql.Date ngayMua;

    @Column(name = "nha_cung_cap", length = 100)
    private String nhaCungCap;

    @Column(name = "so_luong", nullable = false)
    private Integer soLuong;

    @Column(name = "don_gia", precision = 18, scale = 2)
    private BigDecimal donGia;

    // getters & setters
}

