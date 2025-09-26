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
@Table(name = "lich_su_tb")
public class LichSuThietBi {
    @Id

    @Column(name = "ma_ls")
    private String maLS;

    @ManyToOne
    @JoinColumn(name = "ma_tb", nullable = false)
    private ThietBi thietBi;

    @Column(name = "ngay_cap_nhat", nullable = false)
    private java.sql.Timestamp ngayCapNhat;

    @Column(name = "tinh_trang_moi", nullable = false, length = 30)
    private String tinhTrangMoi;

    @ManyToOne
    @JoinColumn(name = "nguoi_cap_nhat")
    private NhanVien nhanVien;

    @Column(name = "ghi_chu", length = 200)
    private String ghiChu;

    // getters & setters
}

