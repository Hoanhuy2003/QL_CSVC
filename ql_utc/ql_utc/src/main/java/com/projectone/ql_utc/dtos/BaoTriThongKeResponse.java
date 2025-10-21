package com.projectone.ql_utc.dtos;

import lombok.*;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BaoTriThongKeResponse {
    private Long tongSoBaoTri;
    private Long dangThucHien;
    private Long hoanThanh;
    private Long tamDung;
    private BigDecimal tongChiPhi;
    private BigDecimal chiPhiTrungBinh;

    // Thống kê thanh lý
    private Long tongDeXuatThanhLy;
    private Long choDuyet;
    private Long daDuyet;
    private Long tuChoi;
}