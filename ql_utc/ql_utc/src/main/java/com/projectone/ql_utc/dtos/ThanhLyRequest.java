package com.projectone.ql_utc.dtos;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ThanhLyRequest {

    @NotBlank(message = "Mã thiết bị không được để trống")
    private String maTB;

    @NotNull(message = "Ngày đề xuất thanh lý không được để trống")
    private Date ngayThanhLy;

    @NotBlank(message = "Lý do thanh lý không được để trống")
    @Size(max = 200, message = "Lý do không quá 200 ký tự")
    private String lyDo;

    @DecimalMin(value = "0.0", message = "Giá trị thu hồi phải >= 0")
    private BigDecimal giaTriThuHoi;

    private String maNVDeXuat;
}