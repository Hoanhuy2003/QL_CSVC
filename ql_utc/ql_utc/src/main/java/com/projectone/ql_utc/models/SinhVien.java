package com.projectone.ql_utc.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "sinh_vien")
public class SinhVien {
    @Id
    @Column(name = "ma_sv", length = 15)
    private  String maSV;

    @Column(name = "ten_sv", nullable = false, length = 50)
    private String tenSV;

    @Column(name = "lop", length = 20)
    private String lop;

}
