package com.projectone.ql_utc.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LichSuTbDTO {

    @JsonProperty("ma_ls")
    private String maLS;

    @JsonProperty("ma_tb")
    private String maTB;

    @JsonProperty("ngay_cap_nhat")
    private LocalDateTime ngayCapNhat;

    @JsonProperty("tinh_trang_moi")
    private String tinhTrangMoi;

    @JsonProperty("nguoi_cap_nhat")
    private String nguoiCapNhat;

    @JsonProperty("ghi_chu")
    private String ghiChu;
}
