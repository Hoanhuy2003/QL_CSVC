package com.projectone.ql_utc.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.projectone.ql_utc.enums.TrangThai;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CTPhieuMuonDTO {

    @JsonProperty("ma_pm")
    private String maPM;

    @JsonProperty("ma_tb")
    private String maTB;

    @JsonProperty("ma_sv")
    private String maSV;

    @JsonProperty("trang_thai")
    private TrangThai trangThai;
}
