package com.projectone.ql_utc.responses;

import com.projectone.ql_utc.models.MuaMoi;
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
public class MuaMoiResponse {
    private String maMua;
    private String maTB;
    private String tenTB;
    private String loaiTB;
    private Date ngayMua;
    private String nhaCungCap;
    private Integer soLuong;
    private BigDecimal donGia;

    public static MuaMoiResponse fromMuaMoi(MuaMoi muaMoi){
        return MuaMoiResponse.builder()
                .maMua(muaMoi.getMaMua())
                .maTB(muaMoi.getThietBi().getMaTB())
                .tenTB(muaMoi.getThietBi().getTenTB())
                .loaiTB(muaMoi.getLoaiThietBi().getTenLoai())
                .ngayMua(muaMoi.getNgayMua())
                .nhaCungCap(muaMoi.getNhaCungCap())
                .soLuong(muaMoi.getSoLuong())
                .donGia(muaMoi.getDonGia())
                .build();

    }
}
