package com.projectone.ql_utc.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "nhan_vien")
public class NhanVien {
    @Id
    @Column(name = "ma_nv", length = 20)
    private String maNV;

    @Column(name = "ten_nv", nullable = false, length = 50)
    private String tenNV;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "sdt", length = 20)
    private String sdt;

    @Column(name = "dang_lam_viec")
    private Boolean dangLamViec = true;

    // getters & setters
}

