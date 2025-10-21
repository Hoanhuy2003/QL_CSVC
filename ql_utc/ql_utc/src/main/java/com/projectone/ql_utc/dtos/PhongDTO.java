package com.projectone.ql_utc.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PhongDTO {

    @JsonProperty("ma_phong")
    private String maPhong;

    @JsonProperty("ten_phong")
    private String tenPhong;

    @JsonProperty("loai_phong")
    private String loaiPhong;

    @JsonProperty("suc_chua")
    private Integer sucChua;

    @JsonProperty("trang_thai")
    private Integer trangThai;
}
