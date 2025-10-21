package com.projectone.ql_utc.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;


@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoaiTBDTO {
    @JsonProperty("ma_loai")
    private String maLoai;

    @JsonProperty("ten_loai")
    private String tenLoai;


}
