package com.projectone.ql_utc.models;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "loptinchi")
public class LopTinChi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaLTC")
    private Integer maLTC;

    @Column(name = "NienKhoa", nullable = false, length = 15)
    private String nienKhoa;

    @Column(name = "HocKy", nullable = false)
    private Byte hocKy;

    @Column(name = "MonHoc", nullable = false, length = 50)
    private String monHoc;

    @Column(name = "Nhom", nullable = false)
    private Byte nhom;

    // getters & setters
}
