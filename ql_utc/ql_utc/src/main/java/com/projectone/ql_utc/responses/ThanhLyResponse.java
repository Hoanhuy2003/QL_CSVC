package com.projectone.ql_utc.responses;

import com.projectone.ql_utc.models.ThanhLy;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Date;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ThanhLyResponse {
    private String maTL;
    private String thietBi;
    private Date ngayThanhLy;
    private String lyDo;
    private BigDecimal giaTriThuHoi;

    public static ThanhLyResponse fromThanhLy(ThanhLy thanhLy){
        return ThanhLyResponse.builder()
                .maTL(thanhLy.getMaTL())
                .thietBi(thanhLy.getThietBi().getTenTB())
                .ngayThanhLy(thanhLy.getNgayThanhLy())
                .lyDo(thanhLy.getLyDo())
                .giaTriThuHoi(thanhLy.getGiaTriThuHoi())
                .build();
    }

}
