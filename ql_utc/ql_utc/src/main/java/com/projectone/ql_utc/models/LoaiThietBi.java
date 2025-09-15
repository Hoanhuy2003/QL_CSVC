package com.projectone.ql_utc.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "loaitb")
public class LoaiThietBi {
    @Id
    @Column(name = "MaLoai", length = 20)
    private String maLoai;

    @Column(name = "TenLoai", nullable = false, length = 50)
    private String tenLoai;

    @OneToMany(mappedBy = "loai")
    private List<ThietBi> thietBis;

    // getters & setters
}
