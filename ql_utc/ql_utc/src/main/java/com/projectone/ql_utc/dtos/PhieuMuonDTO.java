package com.projectone.ql_utc.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.projectone.ql_utc.enums.TrangThaiPhieuMuon;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
    private String maLTC;

    @JsonProperty("thoi_diem_muon")
    private LocalDateTime thoiDiemMuon;

    @JsonProperty("han_tra")
    private LocalDateTime hanTra;

    @JsonProperty("thoi_han_tra")
    private LocalDateTime thoiDiemTra;

    @JsonProperty("nguoi_lap_phieu")
    private String nguoiLapPhieu;

    @Enumerated(EnumType.STRING)
    @Column(name="trang_thai_muon")
    private TrangThaiPhieuMuon trangThaiMuon;
}
