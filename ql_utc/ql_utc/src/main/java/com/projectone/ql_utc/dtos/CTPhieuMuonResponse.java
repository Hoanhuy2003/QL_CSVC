package com.projectone.ql_utc.dtos;

import com.projectone.ql_utc.enums.TinhTrangKhiTra;
import com.projectone.ql_utc.enums.TrangThaiCTPhieuMuon;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CTPhieuMuonResponse {

    private String maTB;
    private String tenTB;
    private String tenLoai;

    private TrangThaiCTPhieuMuon trangThai;

    private Date thoiDiemLay;
    private Date thoiDiemTra;

    private TinhTrangKhiTra tinhTrangKhiTra;
    private String moTaHong;
    private BigDecimal phiBoiThuong;
    private Boolean daThanhToan;

    private String ghiChu;

    // Nếu mượn theo lớp
    private String maSV;
    private String tenSV;
}