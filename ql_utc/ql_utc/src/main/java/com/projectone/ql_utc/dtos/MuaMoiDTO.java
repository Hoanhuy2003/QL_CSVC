package com.projectone.ql_utc.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.sql.Date;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MuaMoiDTO {

    @JsonProperty("ma_mua")
    private String maMua;

    @JsonProperty("ma_tb")
    private String maTB;

    @JsonProperty("ma_loai")
    private String maLoai;

    @JsonProperty("ngay_mua")
    private Date ngayMua;

    @JsonProperty("nha_cung_cap")
    private String nhaCungCap;

    @JsonProperty("so_luong")
    private Integer soLuong;

    @JsonProperty("don_gia")
    private BigDecimal donGia;
}
