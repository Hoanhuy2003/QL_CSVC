package com.projectone.ql_utc.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "nhanvien")
public class NhanVien {
    @Id
    @Column(name = "MaNV", length = 20)
    private String maNV;

    @Column(name = "TenNV", nullable = false, length = 50)
    private String tenNV;

    @Column(name = "Email", length = 50)
    private String email;

    @Column(name = "SDT", length = 20)
    private String sdt;

    @Column(name = "DangLamViec")
    private Boolean dangLamViec = true;

    // getters & setters
}

