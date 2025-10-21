package com.projectone.ql_utc.dtos;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BaoTriRequest {

    @NotBlank(message = "Mã thiết bị không được để trống")
    private String maTB;

    @NotNull(message = "Ngày bảo trì không được để trống")
    private Date ngayBaoTri;

    @NotBlank(message = "Nội dung bảo trì không được để trống")
    @Size(max = 200, message = "Nội dung không quá 200 ký tự")
    private String noiDung;

    @NotBlank(message = "Nhân viên phụ trách không được để trống")
    private String maNVPhuTrach;

    @DecimalMin(value = "0.0", message = "Chi phí phải >= 0")
    private BigDecimal chiPhi;

    private String trangThai; // DANG_THUC_HIEN, HOAN_THANH, TAM_DUNG

    private String ghiChu;
}