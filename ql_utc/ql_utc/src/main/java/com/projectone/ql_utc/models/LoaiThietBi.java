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
@Table(name = "loai_tb")
public class LoaiThietBi {
    @Id
    @Column(name = "ma_loai", length = 20)
    private String maLoai;

    @Column(name = "ten_loai", nullable = false, length = 50)
    private String tenLoai;
//
//    @OneToMany(mappedBy = "loai")
//    private List<ThietBi> thietBi;

    // getters & setters
}
