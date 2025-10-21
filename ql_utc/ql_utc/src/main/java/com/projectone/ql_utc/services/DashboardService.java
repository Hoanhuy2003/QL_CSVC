package com.projectone.ql_utc.services;

import com.projectone.ql_utc.dtos.DashboardStatsResponse;
import com.projectone.ql_utc.dtos.RecentActivityResponse;
import com.projectone.ql_utc.enums.*;
import com.projectone.ql_utc.repositorys.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final PhieuMuonRepository phieuMuonRepository;
    private final BaoTriRepository baoTriRepository;
    private final ThietBiRepository thietBiRepository;
    private final NhanVienRepository nhanVienRepository;

    // ==========================================
    // THỐNG KÊ TỔNG QUAN
    // ==========================================

    public DashboardStatsResponse getStats() {
        // Thống kê phiếu mượn
        Long phieuChoDuyet = phieuMuonRepository.countByTrangThai(TrangThaiPhieuMuon.CHO_DUYET);
        Long phieuDaDuyet = phieuMuonRepository.countByTrangThai(TrangThaiPhieuMuon.DA_DUYET);
        Long phieuDangMuon = phieuMuonRepository.countByTrangThai(TrangThaiPhieuMuon.DANG_MUON);
        Long phieuDaTra = phieuMuonRepository.countByTrangThai(TrangThaiPhieuMuon.DA_TRA);

        // Thống kê bảo trì
        Long baoTriDang = baoTriRepository.countByTrangThai(TrangThaiBaoTri.DANG_THUC_HIEN);
        Long baoTriHoanThanh = baoTriRepository.countByTrangThai(TrangThaiBaoTri.HOAN_THANH);

        // Thống kê thiết bị
        Long thietBiSanSang = thietBiRepository.countByTinhTrang(TinhTrangThietBi.SAN_SANG);
        Long thietBiDangMuon = thietBiRepository.countByTinhTrang(TinhTrangThietBi.DANG_MUON);
        Long thietBiHong = thietBiRepository.countByTinhTrang(TinhTrangThietBi.HONG);

        // Tính hiệu suất (phiếu xử lý đúng hạn / tổng phiếu)
        String hieuSuat = calculateEfficiency();

        return DashboardStatsResponse.builder()
                .phieuChoDuyet(phieuChoDuyet != null ? phieuChoDuyet : 0L)
                .phieuDaDuyet(phieuDaDuyet != null ? phieuDaDuyet : 0L)
                .phieuDangMuon(phieuDangMuon != null ? phieuDangMuon : 0L)
                .phieuDaTra(phieuDaTra != null ? phieuDaTra : 0L)
                .baoTriDang(baoTriDang != null ? baoTriDang : 0L)
                .baoTriHoanThanh(baoTriHoanThanh != null ? baoTriHoanThanh : 0L)
                .thietBiSanSang(thietBiSanSang != null ? thietBiSanSang : 0L)
                .thietBiDangMuon(thietBiDangMuon != null ? thietBiDangMuon : 0L)
                .thietBiHong(thietBiHong != null ? thietBiHong : 0L)
                .hieuSuat(hieuSuat)
                .build();
    }

    // ==========================================
    // HOẠT ĐỘNG GẦN ĐÂY
    // ==========================================

    public List<RecentActivityResponse> getRecentActivities() {
        List<RecentActivityResponse> activities = new ArrayList<>();

        // Lấy 5 phiếu mượn mới nhất
        phieuMuonRepository.findTop5ByOrderByNgayTaoDesc()
                .forEach(pm -> {
                    String nguoiThucHien = "Hệ thống";
                    if (pm.getNguoiLapPhieu() != null) {
                        nguoiThucHien = pm.getNguoiLapPhieu().getTenNV();
                    }

                    String hanhDong = String.format(
                            "Tạo phiếu mượn %s - %s",
                            pm.getMaPM(),
                            pm.getLoaiPhieu() == LoaiPhieu.CA_NHAN ? "Cá nhân" : "Lớp học"
                    );

                    activities.add(RecentActivityResponse.builder()
                            .id(pm.getMaPM())
                            .loai("PHIEU_MUON")
                            .nguoiThucHien(nguoiThucHien)
                            .hanhDong(hanhDong)
                            .thoiGian(pm.getNgayTao())
                            .trangThai(pm.getTrangThai().name())
                            .build());
                });



        // Sắp xếp theo thời gian mới nhất
        return activities.stream()
                .sorted(Comparator.comparing(RecentActivityResponse::getThoiGian).reversed())
                .limit(10)
                .collect(Collectors.toList());
    }

    // ==========================================
    // HELPER METHODS
    // ==========================================

    private String calculateEfficiency() {
        try {
            Long total = phieuMuonRepository.count();
            if (total == 0) {
                return "0%";
            }

            // Đếm phiếu xử lý đúng hạn (duyệt trong vòng 24h)
            Long processed = phieuMuonRepository.countByTrangThaiIn(
                    List.of(
                            TrangThaiPhieuMuon.DA_DUYET,
                            TrangThaiPhieuMuon.DANG_MUON,
                            TrangThaiPhieuMuon.DA_TRA
                    )
            );

            double efficiency = ((double) processed / total) * 100;
            DecimalFormat df = new DecimalFormat("0.0");
            return df.format(efficiency) + "%";
        } catch (Exception e) {
            return "0%";
        }
    }

    private Date convertDateToDateTime(java.sql.Date date) {
        if (date == null) return new Date();
        return new Date(date.getTime());
    }
}