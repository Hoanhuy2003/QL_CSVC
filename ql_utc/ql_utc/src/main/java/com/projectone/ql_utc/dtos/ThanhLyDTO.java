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
public class ThanhLyDTO {
    @JsonProperty("ma_tl")
    private String maTL;

    @JsonProperty("ma_tb")
    private String maTB;

    @JsonProperty("ngay_thanh_ly")
    private Date ngayThanhLy;

    @JsonProperty("ly_do")
    private String lyDo;

    @JsonProperty("gia_tri_thu_hoi")
    private BigDecimal giaTriThuHoi;
}
