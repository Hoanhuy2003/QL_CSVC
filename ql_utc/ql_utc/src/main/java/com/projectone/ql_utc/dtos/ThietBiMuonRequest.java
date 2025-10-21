package com.projectone.ql_utc.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ThietBiMuonRequest {

    @NotBlank(message = "Mã thiết bị không được trống")
    private String maTB;

    // Chỉ dùng khi loaiPhieu = LOP_HOC
    private String maSV;        // Sinh viên phụ trách thiết bị này

    private String ghiChu;
}