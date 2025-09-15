package com.projectone.ql_utc.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SinhVien {
    @Id
    @Column(name = "MaSV", length = 15)
    private  String maSV;

    @Column(name = "TenSV", nullable = false, length = 50)
    private String tenSV;

    @Column(name = "Lop", length = 20)
    private String lop;

}
