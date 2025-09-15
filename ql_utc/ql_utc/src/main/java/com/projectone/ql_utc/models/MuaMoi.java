package com.projectone.ql_utc.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "muamoi")
public class MuaMoi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaMua")
    private Integer maMua;

    @ManyToOne
    @JoinColumn(name = "MaTB", nullable = false)
    private ThietBi thietBi;

    @Column(name = "NgayMua", nullable = false)
    private java.sql.Date ngayMua;

    @Column(name = "NhaCungCap", length = 100)
    private String nhaCungCap;

    @Column(name = "SoLuong", nullable = false)
    private Integer soLuong;

    @Column(name = "DonGia", precision = 18, scale = 2)
    private Double donGia;

    // getters & setters
}

