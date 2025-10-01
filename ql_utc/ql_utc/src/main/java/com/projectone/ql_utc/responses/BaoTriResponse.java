package com.projectone.ql_utc.responses;

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
    private Date ngayBT;
    private String noiDung;
    private String nhaVienPhuTrach;
    private BigDecimal chiPhi;

    public static BaoTriResponse fromBaoTri(BaoTri baoTri){
        return BaoTriResponse.builder()
                .maBT(baoTri.getMaBT())
                .maTB(baoTri.getThietBi().getMaTB())
                .tenTB(baoTri.getThietBi().getTenTB())
                .ngayBT(baoTri.getNgayBT())
                .noiDung(baoTri.getNoiDung())
                .nhaVienPhuTrach(baoTri.getNhanVien().getTenNV())
                .chiPhi(baoTri.getChiPhi())
                .build();
    }


}
