package com.projectone.ql_utc.services;

import com.projectone.ql_utc.dtos.*;
import com.projectone.ql_utc.enums.TrangThaiBaoTri;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.iservices.IBaoTriService;
import com.projectone.ql_utc.models.BaoTri;
import com.projectone.ql_utc.models.NhanVien;
import com.projectone.ql_utc.models.ThietBi;
import com.projectone.ql_utc.repositorys.*;
import com.projectone.ql_utc.responses.BaoTriResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BaoTriService implements IBaoTriService {

    private final BaoTriRepository baoTriRepository;
    private final ThietBiRepository thietBiRepository;
    private final NhanVienRepository nhanVienRepository;

    // ==========================================
    // LẤY DỮ LIỆU
    // ==========================================

    @Override
    @Transactional
    public BaoTri createBaoTri(BaoTriRequest baoTriDTO) throws DataNotFoundException {
        // Validate thiết bị
        ThietBi thietBi = thietBiRepository.findById(baoTriDTO.getMaTB())
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy thiết bị: " + baoTriDTO.getMaTB()));

        // Validate nhân viên
        NhanVien nhanVien = nhanVienRepository.findById(baoTriDTO.getMaNVPhuTrach())
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy nhân viên: " + baoTriDTO.getMaNVPhuTrach()));

        // Tạo mã bảo trì tự động
        String maBT = generateMaBaoTri();

        // Xử lý trạng thái
        TrangThaiBaoTri trangThai = TrangThaiBaoTri.DANG_THUC_HIEN;
        if (baoTriDTO.getTrangThai() != null && !baoTriDTO.getTrangThai().isEmpty()) {
            try {
                trangThai = TrangThaiBaoTri.fromString(baoTriDTO.getTrangThai());
            } catch (Exception e) {
                // Giữ giá trị mặc định nếu parse fail
            }
        }

        // Tạo entity
        BaoTri entity = BaoTri.builder()
                .maBT(maBT)
                .thietBi(thietBi)
                .ngayBT(baoTriDTO.getNgayBaoTri())
                .noiDung(baoTriDTO.getNoiDung())
                .nhanVienPhuTrach(nhanVien)
                .chiPhi(baoTriDTO.getChiPhi() != null ? baoTriDTO.getChiPhi() : BigDecimal.ZERO)
                .trangThai(trangThai)
                .ghiChu(baoTriDTO.getGhiChu())
                .build();

        return baoTriRepository.save(entity);
    }

    public List<BaoTriResponse> getAllBaoTri() {
        return baoTriRepository.findAll().stream()
                .map(this::convertToResponse)
                .sorted((a, b) -> b.getNgayBaoTri().compareTo(a.getNgayBaoTri()))  // FIX: Changed => to ->
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BaoTri updateBaoTri(String maBT, BaoTriRequest baoTriDTO) throws DataNotFoundException {
        // Tìm bảo trì cần cập nhật
        BaoTri entity = baoTriRepository.findById(maBT)
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy bảo trì: " + maBT));

        // Cập nhật thiết bị nếu thay đổi
        if (baoTriDTO.getMaTB() != null && !baoTriDTO.getMaTB().equals(entity.getThietBi().getMaTB())) {
            ThietBi thietBi = thietBiRepository.findById(baoTriDTO.getMaTB())
                    .orElseThrow(() -> new DataNotFoundException("Không tìm thấy thiết bị: " + baoTriDTO.getMaTB()));
            entity.setThietBi(thietBi);
        }

        // Cập nhật nhân viên nếu thay đổi
        if (baoTriDTO.getMaNVPhuTrach() != null) {
            NhanVien nhanVien = nhanVienRepository.findById(baoTriDTO.getMaNVPhuTrach())
                    .orElseThrow(() -> new DataNotFoundException("Không tìm thấy nhân viên: " + baoTriDTO.getMaNVPhuTrach()));
            entity.setNhanVienPhuTrach(nhanVien);
        }

        // Cập nhật các trường khác
        if (baoTriDTO.getNgayBaoTri() != null) {
            entity.setNgayBT(baoTriDTO.getNgayBaoTri());
        }
        if (baoTriDTO.getNoiDung() != null) {
            entity.setNoiDung(baoTriDTO.getNoiDung());
        }
        if (baoTriDTO.getChiPhi() != null) {
            entity.setChiPhi(baoTriDTO.getChiPhi());
        }
        if (baoTriDTO.getTrangThai() != null && !baoTriDTO.getTrangThai().isEmpty()) {
            try {
                entity.setTrangThai(TrangThaiBaoTri.fromString(baoTriDTO.getTrangThai()));
            } catch (Exception e) {
                // Giữ nguyên giá trị cũ nếu parse fail
            }
        }
        if (baoTriDTO.getGhiChu() != null) {
            entity.setGhiChu(baoTriDTO.getGhiChu());
        }

        return baoTriRepository.save(entity);
    }

    public BaoTriResponse getBaoTriById(String maBT) {
        BaoTri entity = baoTriRepository.findById(maBT)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bảo trì: " + maBT));
        return convertToResponse(entity);
    }

    public List<BaoTriResponse> getBaoTriByThietBi(String maTB) {
        return baoTriRepository.findByThietBi_MaTB(maTB).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<BaoTriResponse> getBaoTriByNhanVien(String maNV) {
        return baoTriRepository.findByNhanVienPhuTrach_MaNV(maNV).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<BaoTriResponse> getBaoTriByTrangThai(String trangThai) {
        TrangThaiBaoTri status = TrangThaiBaoTri.fromString(trangThai);
        return baoTriRepository.findByTrangThai(status).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<BaoTriResponse> searchBaoTri(String maTB, String trangThai, Date tuNgay, Date denNgay) {
        TrangThaiBaoTri status = trangThai != null ? TrangThaiBaoTri.fromString(trangThai) : null;
        return baoTriRepository.searchBaoTri(maTB, status, tuNgay, denNgay).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // THÊM/SỬA/XÓA
    // ==========================================

    @Transactional
    public BaoTriResponse themBaoTri(BaoTriRequest request) {
        // Validate thiết bị
        ThietBi thietBi = thietBiRepository.findById(request.getMaTB())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thiết bị: " + request.getMaTB()));

        // Validate nhân viên
        NhanVien nhanVien = nhanVienRepository.findById(request.getMaNVPhuTrach())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên: " + request.getMaNVPhuTrach()));

        // Tạo mã bảo trì tự động
        String maBT = generateMaBaoTri();

        // Tạo entity
        BaoTri entity = BaoTri.builder()
                .maBT(maBT)
                .thietBi(thietBi)
                .ngayBT(request.getNgayBaoTri())
                .noiDung(request.getNoiDung())
                .nhanVienPhuTrach(nhanVien)
                .chiPhi(request.getChiPhi() != null ? request.getChiPhi() : BigDecimal.ZERO)
                .trangThai(request.getTrangThai() != null ?
                        TrangThaiBaoTri.fromString(request.getTrangThai()) :
                        TrangThaiBaoTri.DANG_THUC_HIEN)
                .ghiChu(request.getGhiChu())
                .build();

        baoTriRepository.save(entity);
        return convertToResponse(entity);
    }

    @Transactional
    public BaoTriResponse capNhatBaoTri(String maBT, BaoTriRequest request) {
        BaoTri entity = baoTriRepository.findById(maBT)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bảo trì: " + maBT));

        // Cập nhật các trường
        if (request.getNgayBaoTri() != null) {
            entity.setNgayBT(request.getNgayBaoTri());
        }
        if (request.getNoiDung() != null) {
            entity.setNoiDung(request.getNoiDung());
        }
        if (request.getChiPhi() != null) {
            entity.setChiPhi(request.getChiPhi());
        }
        if (request.getTrangThai() != null) {
            entity.setTrangThai(TrangThaiBaoTri.fromString(request.getTrangThai()));
        }
        if (request.getGhiChu() != null) {
            entity.setGhiChu(request.getGhiChu());
        }
        if (request.getMaNVPhuTrach() != null) {
            NhanVien nhanVien = nhanVienRepository.findById(request.getMaNVPhuTrach())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên"));
            entity.setNhanVienPhuTrach(nhanVien);
        }

        baoTriRepository.save(entity);
        return convertToResponse(entity);
    }

    @Transactional
    public void xoaBaoTri(String maBT) {
        if (!baoTriRepository.existsById(maBT)) {
            throw new RuntimeException("Không tìm thấy bảo trì: " + maBT);
        }
        baoTriRepository.deleteById(maBT);
    }

    // ==========================================
    // THỐNG KÊ
    // ==========================================

    public BaoTriThongKeResponse getThongKe() {
        long tongSoBaoTri = baoTriRepository.count();
        long dangThucHien = baoTriRepository.countByTrangThai(TrangThaiBaoTri.DANG_THUC_HIEN);
        long hoanThanh = baoTriRepository.countByTrangThai(TrangThaiBaoTri.HOAN_THANH);
        long tamDung = baoTriRepository.countByTrangThai(TrangThaiBaoTri.TAM_DUNG);

        Double tongChiPhi = baoTriRepository.sumAllChiPhi();
        BigDecimal tongChiPhiBD = BigDecimal.valueOf(tongChiPhi != null ? tongChiPhi : 0);

        BigDecimal chiPhiTrungBinh = tongSoBaoTri > 0 ?
                tongChiPhiBD.divide(BigDecimal.valueOf(tongSoBaoTri), 2, BigDecimal.ROUND_HALF_UP) :
                BigDecimal.ZERO;

        return BaoTriThongKeResponse.builder()
                .tongSoBaoTri(tongSoBaoTri)
                .dangThucHien(dangThucHien)
                .hoanThanh(hoanThanh)
                .tamDung(tamDung)
                .tongChiPhi(tongChiPhiBD)
                .chiPhiTrungBinh(chiPhiTrungBinh)
                .build();
    }

    public Map<String, Long> thongKeTrangThai() {
        Map<String, Long> result = new LinkedHashMap<>();
        result.put("TONG_SO", baoTriRepository.count());
        result.put("DANG_THUC_HIEN", baoTriRepository.countByTrangThai(TrangThaiBaoTri.DANG_THUC_HIEN));
        result.put("HOAN_THANH", baoTriRepository.countByTrangThai(TrangThaiBaoTri.HOAN_THANH));
        result.put("TAM_DUNG", baoTriRepository.countByTrangThai(TrangThaiBaoTri.TAM_DUNG));
        result.put("HUY_BO", baoTriRepository.countByTrangThai(TrangThaiBaoTri.HUY_BO));
        return result;
    }

    // ==========================================
    // HELPER METHODS
    // ==========================================

    private BaoTriResponse convertToResponse(BaoTri entity) {
        NumberFormat formatter = NumberFormat.getCurrencyInstance(new Locale("vi", "VN"));

        return BaoTriResponse.builder()
                .maBT(entity.getMaBT())
                .maTB(entity.getThietBi().getMaTB())
                .tenTB(entity.getThietBi().getTenTB())
                .loaiTB(entity.getThietBi().getLoai() != null ?
                        entity.getThietBi().getLoai().getTenLoai() : null)
                .ngayBaoTri(entity.getNgayBT())
                .noiDung(entity.getNoiDung())
                .maNVPhuTrach(entity.getThietBi() != null ?
                        entity.getNhanVienPhuTrach().getMaNV() : null)
                .tenNVPhuTrach(entity.getNhanVienPhuTrach() != null ?
                        entity.getNhanVienPhuTrach().getTenNV() : null)  // FIX: Changed getNhanVien() to getNhanVienPhuTrach()
                .chiPhi(entity.getChiPhi())
                .chiPhiText(entity.getChiPhi() != null && entity.getChiPhi().compareTo(BigDecimal.ZERO) > 0 ?
                        formatter.format(entity.getChiPhi()) : "Miễn phí")
                .trangThai(entity.getTrangThai())  // FIX: Changed getTrangThaiMuon() to getTrangThai()
                .ghiChu(entity.getGhiChu())
                .build();
    }

    private String generateMaBaoTri() {
        long count = baoTriRepository.count();
        return String.format("BT_%03d", count + 1);
    }
}