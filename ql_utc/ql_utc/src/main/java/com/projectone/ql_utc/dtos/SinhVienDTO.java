package com.projectone.ql_utc.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SinhVienDTO {
    @JsonProperty("ma_sv")
    private String maSV;

    @JsonProperty("ten_sv")
    private String tenSV;

    @JsonProperty("lop")
    private String lop;
}
