package com.projectone.ql_utc.models;

import com.projectone.ql_utc.enums.TrangThaiPhong;
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
    @Column(name = "ma_phong", length = 20)
    private String maPhong;

    @Column(name = "ten_phong", length = 50)
    private String tenPhong;

    @Column(name = "loai_phong", length = 30)
    private String loaiPhong;

    @Column(name = "suc_chua")
    private Integer sucChua;

    @Column(name = "trang_thai")
    private TrangThaiPhong trangThai;

    // getters & setters
}
