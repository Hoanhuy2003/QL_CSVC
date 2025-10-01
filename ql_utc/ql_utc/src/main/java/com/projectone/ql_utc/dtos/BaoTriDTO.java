package com.projectone.ql_utc.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BaoTriDTO {

    @JsonProperty("ma_bt")
    private String maBT;

    @JsonProperty("ma_tb")
    private String maTB;

    @JsonProperty("ngay_bt")
    private Date ngayBT;

    @JsonProperty("noi_dung")
    private String noiDung;

    @JsonProperty("nhan_vien_phu_trach")
    private String nhanVienPhuTrach;

    @JsonProperty("chi_phi")
    private BigDecimal chiPhi;
}
