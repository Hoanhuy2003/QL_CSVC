package com.projectone.ql_utc.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "lich_hoc")
public class LichHoc {

    @Id
    @Column(name= "ma_lich")
    private String maLich;

    @ManyToOne
    @JoinColumn(name = "ma_ltc")
    private LopTinChi lopTinChi;

    @ManyToOne
    @JoinColumn(name = "ma_phong")
    private Phong phong;

    @ManyToOne
    @JoinColumn(name = "ma_nv")
    private NhanVien nhanVien;

    @Column(name = "thoi_gian_bat_dau")
    private Date thoiGianBatDau;

    @Column(name = "thoi_gian_ket_thuc")
    private Date thoiGianKetThuc;

}
