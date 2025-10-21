package com.projectone.ql_utc.responses;

import com.projectone.ql_utc.enums.TrangThaiThanhLy;
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
    private String maTB;
    private String tenTB;
    private java.util.Date ngayDeXuat;
    private java.util.Date ngayThanhLy;
    private String lyDo;
    private BigDecimal giaTriThuHoi;
    private String giaTriThuHoiText;
    private TrangThaiThanhLy trangThai;
    private String maNVDeXuat;
    private String tenNVDeXuat;
    private String maNVDuyet;
    private String tenNVDuyet;
    private java.util.Date ngayDuyet;
    private String lyDoTuChoi;

    public static ThanhLyResponse fromThanhLy(ThanhLy thanhLy){
        return ThanhLyResponse.builder()
                .maTB(thanhLy.getThietBi().getMaTB())
                .tenTB(thanhLy.getThietBi().getTenTB())
                .ngayThanhLy((Date) thanhLy.getNgayThanhLy())
                .lyDo(thanhLy.getLyDo())
                .giaTriThuHoi(thanhLy.getGiaTriThuHoi())
                .build();
    }

}
