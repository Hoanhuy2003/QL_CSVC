package com.projectone.ql_utc.responses;

import com.projectone.ql_utc.enums.TrangThaiBaoTri;
import com.projectone.ql_utc.models.BaoTri;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BaoTriResponse {
    private String maBT;
    private String maTB;
    private String tenTB;
    private String loaiTB;
    private java.util.Date ngayBaoTri;
    private String noiDung;
    private String maNVPhuTrach;
    private String tenNVPhuTrach;
    private BigDecimal chiPhi;
    private String chiPhiText;
    private TrangThaiBaoTri trangThai;
    private String ghiChu;
    private java.util.Date ngayCapNhat;

    public static BaoTriResponse fromBaoTri(BaoTri baoTri) {
        if (baoTri == null) return null;

        return BaoTriResponse.builder()
                .maBT(baoTri.getMaBT())
                .maTB(baoTri.getThietBi() != null ? baoTri.getThietBi().getMaTB() : null)
                .tenTB(baoTri.getThietBi() != null ? baoTri.getThietBi().getTenTB() : null)
                .loaiTB(baoTri.getThietBi() != null && baoTri.getThietBi().getLoai() != null
                        ? baoTri.getThietBi().getLoai().getTenLoai()
                        : null)
                .ngayBaoTri(baoTri.getNgayBT())
                .noiDung(baoTri.getNoiDung())
                .maNVPhuTrach(baoTri.getNhanVienPhuTrach() != null ? baoTri.getNhanVienPhuTrach().getMaNV() : null)
                .tenNVPhuTrach(baoTri.getNhanVienPhuTrach() != null ? baoTri.getNhanVienPhuTrach().getTenNV() : null)
                .chiPhi(baoTri.getChiPhi())
                .chiPhiText(baoTri.getChiPhi() != null
                        ? baoTri.getChiPhi().toPlainString()
                        : "Miễn phí")
                .trangThai(baoTri.getTrangThai())
                .ghiChu(baoTri.getGhiChu())
                .build();
    }



}
