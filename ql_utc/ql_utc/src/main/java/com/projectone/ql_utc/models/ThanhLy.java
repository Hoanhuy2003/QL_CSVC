package com.projectone.ql_utc.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "thanhly")
public class ThanhLy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaTL")
    private Integer maTL;

    @ManyToOne
    @JoinColumn(name = "MaTB", nullable = false)
    private ThietBi thietBi;

    @Column(name = "NgayThanhLy", nullable = false)
    private java.sql.Date ngayThanhLy;

    @Column(name = "LyDo", length = 200)
    private String lyDo;

    @Column(name = "GiaTriThuHoi", precision = 18, scale = 2)
    private Double giaTriThuHoi;

    // getters & setters
}
