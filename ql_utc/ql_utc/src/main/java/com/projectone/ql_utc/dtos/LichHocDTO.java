package com.projectone.ql_utc.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.Date;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LichHocDTO {

    @JsonProperty("ma_lich")
    private String maLich;

    @JsonProperty("ma_ltc")
    private String maLTC;

    @JsonProperty("ma_phong")
    private String maPhong;


    @JsonProperty("ma_nv")
    private String maNV;

    @JsonProperty("thoi_gian_bat_dau")
    private Date thoiGianBatDau;

    @JsonProperty("thoi_gian_ket_thuc")
    private Date thoiGianKetThuc;
}
