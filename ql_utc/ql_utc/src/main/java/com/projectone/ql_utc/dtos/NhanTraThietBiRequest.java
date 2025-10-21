package com.projectone.ql_utc.dtos;

import com.projectone.ql_utc.enums.TinhTrangKhiTra;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NhanTraThietBiRequest {
    private String maNV;
    private TinhTrangKhiTra tinhTrang;
    private String moTaHong;
    private BigDecimal phiBoiThuong;
}