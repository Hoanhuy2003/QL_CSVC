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
@Table(name = "thanh_ly")
public class ThanhLy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_tl")
    private Integer maTL;

    @ManyToOne
    @JoinColumn(name = "ma_tb", nullable = false)
    private ThietBi thietBi;

    @Column(name = "ngay_thanh_ly", nullable = false)
    private java.sql.Date ngayThanhLy;

    @Column(name = "ly_do", length = 200)
    private String lyDo;

    @Column(name = "gia_tri_thu_hoi", precision = 18, scale = 2)
    private BigDecimal giaTriThuHoi;

    // getters & setters
}
