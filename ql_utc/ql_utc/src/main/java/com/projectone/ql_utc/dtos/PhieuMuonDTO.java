package com.projectone.ql_utc.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PhieuMuonDTO {

    @JsonProperty("ma_pm")
    private String maPM;

    @JsonProperty("ma_phong")
    private String maPhong;

    @JsonProperty("ma_ltc")
    private Integer maLTC;

    @JsonProperty("thoi_diem_muon")
    private LocalDateTime thoiDiemMuon;

    @JsonProperty("han_tra")
    private LocalDateTime hanTra;

    @JsonProperty("thoi_han_tra")
    private LocalDateTime thoiDiemTra;

    @JsonProperty("nguoi_lap_phieu")
    private String nguoiLapPhieu;
}
