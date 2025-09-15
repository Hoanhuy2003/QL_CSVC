package com.projectone.ql_utc.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "phong")
public class Phong {
    @Id
    @Column(name = "MaPhong", length = 20)
    private String maPhong;

    @Column(name = "TenPhong", length = 50)
    private String tenPhong;

    @Column(name = "LoaiPhong", length = 30)
    private String loaiPhong;

    @Column(name = "SucChua")
    private Integer sucChua;

    @Column(name = "TrangThai")
    private Integer trangThai = 0;

    // getters & setters
}
