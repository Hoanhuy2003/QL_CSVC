package com.projectone.ql_utc.responses;

import com.projectone.ql_utc.models.Phong;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PhongResponse {

    private String maPhong;
    private String tenPhong;
    private String loaiPhong;
    private Integer sucChua;
    private String trangThai;

    private List<ThietBiResponse> thietBiCoDinh;

    public static PhongResponse fromPhong(Phong phong){
        return PhongResponse.builder()
                .maPhong(phong.getMaPhong())
                .tenPhong(phong.getTenPhong())
                .loaiPhong(phong.getLoaiPhong())
                .sucChua(phong.getSucChua())
                .trangThai(phong.getTrangThai().toString())
                .thietBiCoDinh(
                        phong.getThietBis() != null
                        ? phong.getThietBis().stream()
                                .map(ThietBiResponse:: fromThietBi)
                                .collect(Collectors.toList())
                                : null
                )


                .build();
    }

}
