package com.projectone.ql_utc.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "baotri")
public class BaoTri {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaBT")
    private Integer maBT;

    @ManyToOne
    @JoinColumn(name = "MaTB", nullable = false)
    private ThietBi thietBi;

    @Column(name = "NgayBT", nullable = false)
    private java.sql.Date ngayBT;

    @Column(name = "NoiDung", length = 200)
    private String noiDung;

    @ManyToOne
    @JoinColumn(name = "NhanVienPhuTrach")
    private NhanVien nhanVien;

    @Column(name = "ChiPhi", precision = 18, scale = 2)
    private Double chiPhi;

    // getters & setters
}

