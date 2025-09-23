package com.projectone.ql_utc.models;

import com.projectone.ql_utc.enums.TrangThai;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ct_phieu_muon")
@IdClass(CTPhieuMuonId.class)
public class CTPhieuMuon {
    @Id
    @ManyToOne
    @JoinColumn(name = "ma_pm")
    private PhieuMuon phieuMuon;

    @Id
    @ManyToOne
    @JoinColumn(name = "ma_tb")
    private ThietBi thietBi;

    @ManyToOne
    @JoinColumn(name = "ma_sv")
    private SinhVien sinhVien;

    @Column(name = "trang_thai")
    private TrangThai trangThai ;

    // getters & setters
}

