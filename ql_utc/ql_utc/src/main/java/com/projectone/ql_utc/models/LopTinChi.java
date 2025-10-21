package com.projectone.ql_utc.models;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "lop_tin_chi")
public class LopTinChi {
    @Id
    @Column(name = "ma_ltc")
    private String maLTC;

    @Column(name = "nien_khoa", nullable = false, length = 15)
    private String nienKhoa;

    @Column(name = "hoc_ky", nullable = false)
    private Byte hocKy;

    @Column(name = "mon_hoc", nullable = false, length = 50)
    private String monHoc;

    @Column(name = "nhom", nullable = false)
    private Byte nhom;

    // getters & setters
}
