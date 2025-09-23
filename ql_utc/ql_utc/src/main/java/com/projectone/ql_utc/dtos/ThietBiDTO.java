package com.projectone.ql_utc.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.projectone.ql_utc.enums.TinhTrangThietBi;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ThietBiDTO {
    @JsonProperty("ma_tb")
    private String maTB;

    @JsonProperty("ten_tb")
    private String tenTB;

    @JsonProperty("ma_loai")
    private String maLoai;

    @JsonProperty("ngay_nhap")
    private Date ngayNhap;

    @JsonProperty("tinh_trang")
    private TinhTrangThietBi tinhTrang;

    @JsonProperty("gia_tri")
    private BigDecimal giaTri;
}
