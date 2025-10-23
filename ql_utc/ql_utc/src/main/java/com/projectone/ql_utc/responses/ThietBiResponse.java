package com.projectone.ql_utc.responses;

import com.projectone.ql_utc.enums.TinhTrangThietBi;
import com.projectone.ql_utc.models.ThietBi;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ThietBiResponse {
    private String maTB;
    private String tenTB;
    private String loai;
    private String phong;
    private Date ngayNhap;
    private TinhTrangThietBi tinhTrang;
    private BigDecimal giaTri;

    public static  ThietBiResponse fromThietBi (ThietBi thietBi){
        return ThietBiResponse.builder()
                .maTB(thietBi.getMaTB())
                .tenTB(thietBi.getTenTB())
                .loai(thietBi.getLoai().getTenLoai())
                .phong(thietBi.getPhong().getMaPhong())
                .ngayNhap(thietBi.getNgayNhap())
                .tinhTrang(thietBi.getTinhTrang())
                .giaTri(thietBi.getGiaTri())
                .build();
    }
}
