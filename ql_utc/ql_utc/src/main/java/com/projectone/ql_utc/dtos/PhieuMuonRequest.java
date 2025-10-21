package com.projectone.ql_utc.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.projectone.ql_utc.enums.LoaiPhieu;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PhieuMuonRequest {

    @NotNull(message = "Loại phiếu không được trống")
    private LoaiPhieu loaiPhieu;

    // Một trong hai phải có giá trị
    private String maSV;        // Nếu loaiPhieu = CA_NHAN
    private String maLTC;       // Nếu loaiPhieu = LOP_HOC

    @NotBlank(message = "Mã phòng không được trống")
    private String maPhong;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    @NotNull(message = "Thời điểm mượn không được trống")
    private Date thoiDiemMuon;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    @NotNull(message = "Hạn trả không được trống")
    private Date hanTra;

    private String mucDich;
    private String ghiChu;

    @NotNull(message = "Danh sách thiết bị không được trống")
    private List<ThietBiMuonRequest> danhSachThietBi;
}
