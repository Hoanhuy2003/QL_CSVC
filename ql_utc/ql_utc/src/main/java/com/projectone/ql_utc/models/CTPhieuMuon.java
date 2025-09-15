package com.projectone.ql_utc.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ctphieumuon")
@IdClass(CTPhieuMuonId.class)
public class CTPhieuMuon {
    @Id
    @ManyToOne
    @JoinColumn(name = "MaPM")
    private PhieuMuon phieuMuon;

    @Id
    @ManyToOne
    @JoinColumn(name = "MaTB")
    private ThietBi thietBi;

    @ManyToOne
    @JoinColumn(name = "MaSV")
    private SinhVien sinhVien;

    @Column(name = "TrangThai")
    private Integer trangThai = 3;

    // getters & setters
}

