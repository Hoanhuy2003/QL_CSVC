package com.projectone.ql_utc.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LopTinChiDTO {

    @JsonProperty("ma_ltc")
    private String maLTC;

    @JsonProperty("nien_khoa")
    private String nienKhoa;

    @JsonProperty("hoc_ky")
    private Byte hocKy;

    @JsonProperty("mon_hoc")
    private String monHoc;

    @JsonProperty("nhom")
    private Byte nhom;
}
