package com.projectone.ql_utc.dtos;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import java.util.Date;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecentActivityResponse {

    @JsonProperty("id")
    private String id;

    @JsonProperty("loai")
    private String loai;  // BAO_TRI, PHIEU_MUON, THIET_BI

    @JsonProperty("nguoi_thuc_hien")
    private String nguoiThucHien;

    @JsonProperty("hanh_dong")
    private String hanhDong;

    @JsonProperty("thoi_gian")
    private Date thoiGian;

    @JsonProperty("trang_thai")
    private String trangThai;
}
