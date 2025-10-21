package com.projectone.ql_utc.dtos;

import com.projectone.ql_utc.enums.LoaiPhieu;
import com.projectone.ql_utc.enums.TrangThaiPhieuMuon;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PhieuMuonResponse {

    private String maPM;
    private LoaiPhieu loaiPhieu;

    private String tenNguoiMuon;
    private String maPhong;
    private String tenPhong;

    private Date ngayTao;
    private Date thoiDiemMuon;
    private Date hanTra;
    private Date thoiDiemTra;
    private Date ngayDuyet;

    private TrangThaiPhieuMuon trangThai;

    private String nguoiLapPhieu;
    private String nguoiDuyet;
    private String nguoiGiaoThietBi;
    private String nguoiNhanTra;

    private String mucDich;
    private String ghiChu;
    private String lyDoTuChoi;

    private BigDecimal tongPhiBoiThuong;

    private List<CTPhieuMuonResponse> danhSachThietBi;

    // Thông tin tính toán
    private Boolean daQuaHan;
    private Integer soThietBi;
    private Integer soThietBiDaTra;
}