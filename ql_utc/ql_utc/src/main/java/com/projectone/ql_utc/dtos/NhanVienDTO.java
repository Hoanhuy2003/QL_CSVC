package com.projectone.ql_utc.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NhanVienDTO {

    @JsonProperty("ma_nv")
    private String maNV;

    @JsonProperty("ten_nv")
    private String tenNV;

    @JsonProperty("email")
    private String email;

    @JsonProperty("sdt")
    private String sdt;


    private Boolean dangLamViec;
}
