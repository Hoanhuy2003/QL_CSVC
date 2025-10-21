package com.projectone.ql_utc.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import java.util.Date;

// ============================================
// DASHBOARD STATS RESPONSE
// ============================================
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {

    @JsonProperty("phieuChoDuyet")
    private Long phieuChoDuyet;

    @JsonProperty("phieuDaDuyet")
    private Long phieuDaDuyet;

    @JsonProperty("phieuDangMuon")
    private Long phieuDangMuon;

    @JsonProperty("phieuDaTra")
    private Long phieuDaTra;

    @JsonProperty("baoTriDang")
    private Long baoTriDang;

    @JsonProperty("baoTriHoanThanh")
    private Long baoTriHoanThanh;

    @JsonProperty("thietBiSanSang")
    private Long thietBiSanSang;

    @JsonProperty("thietBiDangMuon")
    private Long thietBiDangMuon;

    @JsonProperty("thietBiHong")
    private Long thietBiHong;

    @JsonProperty("hieuSuat")
    private String hieuSuat;  // Ví dụ: "85%"
}