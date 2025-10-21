package com.projectone.ql_utc.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaiKhoanDTO {

    @JsonProperty("ten_tai_khoan")
    private String tenTaiKhoan;

    @JsonProperty("mat_khau")
    private String matKhau;

    @JsonProperty("vai_tro")
    private String vaiTro;

    @JsonProperty("ma_sv")
    private String maSV;

    @JsonProperty("ma_nv")
    private String maNV;
}
