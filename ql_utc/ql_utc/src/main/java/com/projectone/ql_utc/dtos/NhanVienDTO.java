package com.projectone.ql_utc.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
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
    @NotBlank(message = "Tên nhân viên không được để trống")
    private String tenNV;

    @JsonProperty("email")
    @Email(message = "Email không hợp lệ")
    private String email;

    @JsonProperty("sdt")
    private String sdt;

    @JsonProperty("dangLamViec")
    private Boolean dangLamViec;
}

// ==========================================
// Request DTO để cập nhật
// ==========================================

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
class NhanVienUpdateRequest {

    @NotBlank(message = "Tên nhân viên không được để trống")
    @JsonProperty("ten_nv")
    private String tenNV;

    @Email(message = "Email không hợp lệ")
    @JsonProperty("email")
    private String email;

    @JsonProperty("sdt")
    private String sdt;
}