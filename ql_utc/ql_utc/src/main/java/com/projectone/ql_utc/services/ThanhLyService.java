package com.projectone.ql_utc.services;

import com.projectone.ql_utc.dtos.*;
import com.projectone.ql_utc.enums.TrangThaiThanhLy;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.iservices.IThanhLyService;
import com.projectone.ql_utc.models.NhanVien;
import com.projectone.ql_utc.models.ThanhLy;
import com.projectone.ql_utc.models.ThietBi;
import com.projectone.ql_utc.repositorys.*;
import com.projectone.ql_utc.responses.ThanhLyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ThanhLyService implements IThanhLyService {

    private final ThanhLyRepository thanhLyRepository;
    private final ThietBiRepository thietBiRepository;
    private final NhanVienRepository nhanVienRepository;

    // ==========================================
    // CHUYỂN ĐỔI - QUAN TRỌNG: SỬA LẠI
    // ==========================================

    private ThanhLyResponse convertToResponse(ThanhLy entity) {
        NumberFormat formatter = NumberFormat.getCurrencyInstance(new Locale("vi", "VN"));

        return ThanhLyResponse.builder()
                .maTL(entity.getMaTL())
                .maTB(entity.getThietBi().getMaTB())
                .tenTB(entity.getThietBi().getTenTB())
                .ngayDeXuat(entity.getNgayTao()) // ✅ ĐÃ CÓ NGÀY TẠO
                .ngayThanhLy(entity.getNgayThanhLy())
                .lyDo(entity.getLyDo())
                .giaTriThuHoi(entity.getGiaTriThuHoi())
                .giaTriThuHoiText(entity.getGiaTriThuHoi() != null ?
                        formatter.format(entity.getGiaTriThuHoi()) : "0₫")
                .trangThai(entity.getTrangThai())
                .ngayDuyet(entity.getNgayDuyet())
                .lyDoTuChoi(entity.getLyDoTuChoi())
                .maNVDeXuat(entity.getNguoiDeXuat() != null ?
                        entity.getNguoiDeXuat().getMaNV() : null)
                .tenNVDeXuat(entity.getNguoiDeXuat() != null ?
                        entity.getNguoiDeXuat().getTenNV() : null)
                .maNVDuyet(entity.getNguoiDuyet() != null ?
                        entity.getNguoiDuyet().getMaNV() : null)
                .tenNVDuyet(entity.getNguoiDuyet() != null ?
                        entity.getNguoiDuyet().getTenNV() : null)
                .build();
    }

    // ==========================================
    // TẠO ĐỀ XUẤT THANH LÝ
    // ==========================================

    @Transactional
    public ThanhLyResponse createThanhLy(ThanhLyRequest request) {
        // Validate thiết bị
        ThietBi thietBi = thietBiRepository.findById(request.getMaTB())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thiết bị: " + request.getMaTB()));

        // Tạo mã thanh lý tự động
        String maTL = generateMaThanhLy();

        // Tạo entity
        ThanhLy.ThanhLyBuilder builder = ThanhLy.builder()
                .maTL(maTL)
                .thietBi(thietBi)
                .ngayThanhLy(request.getNgayThanhLy())
                .lyDo(request.getLyDo())
                .giaTriThuHoi(request.getGiaTriThuHoi() != null ?
                        request.getGiaTriThuHoi() : BigDecimal.ZERO)
                .trangThai(TrangThaiThanhLy.CHO_DUYET);

        // Thêm người đề xuất nếu có
        if (request.getMaNVDeXuat() != null) {
            NhanVien nv = nhanVienRepository.findById(request.getMaNVDeXuat())
                    .orElse(null);
            if (nv != null) {
                builder.nguoiDeXuat(nv);
            }
        }

        ThanhLy entity = builder.build();
        thanhLyRepository.save(entity);

        return convertToResponse(entity);
    }

    // ==========================================
    // DUYỆT ĐỀ XUẤT
    // ==========================================

    @Transactional
    public ThanhLyResponse duyetDeXuat(String maTL, String maNVDuyet,
                                       boolean choDuyet, String lyDoTuChoi) {
        ThanhLy entity = thanhLyRepository.findById(maTL)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đề xuất thanh lý: " + maTL));

        if (entity.getTrangThai() != TrangThaiThanhLy.CHO_DUYET) {
            throw new RuntimeException("Đề xuất này đã được xử lý");
        }

        NhanVien nvDuyet = nhanVienRepository.findById(maNVDuyet)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên: " + maNVDuyet));

        if (choDuyet) {
            entity.setTrangThai(TrangThaiThanhLy.DA_DUYET);
        } else {
            entity.setTrangThai(TrangThaiThanhLy.TU_CHOI);
            entity.setLyDoTuChoi(lyDoTuChoi);
        }

        entity.setNguoiDuyet(nvDuyet);
        entity.setNgayDuyet(new Date());

        thanhLyRepository.save(entity);
        return convertToResponse(entity);
    }

    // ==========================================
    // LẤY DỮ LIỆU
    // ==========================================


    @Override
    @Transactional
    public ThanhLyResponse updateThanhLy(String maTL, ThanhLyRequest dto) throws DataNotFoundException {
        // Tìm thanh lý
        ThanhLy entity = thanhLyRepository.findById(maTL)
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy thanh lý: " + maTL));

        // CHỈ CHO PHÉP CẬP NHẬT KHI CHỜ DUYỆT
        if (entity.getTrangThai() != TrangThaiThanhLy.CHO_DUYET) {
            throw new RuntimeException("Chỉ có thể cập nhật đề xuất đang chờ duyệt!");
        }

        // Cập nhật thiết bị nếu thay đổi
        if (dto.getMaTB() != null && !dto.getMaTB().equals(entity.getThietBi().getMaTB())) {
            ThietBi thietBi = thietBiRepository.findById(dto.getMaTB())
                    .orElseThrow(() -> new DataNotFoundException("Không tìm thấy thiết bị: " + dto.getMaTB()));
            entity.setThietBi(thietBi);
        }

        // Cập nhật các trường khác
        if (dto.getNgayThanhLy() != null) {
            entity.setNgayThanhLy(dto.getNgayThanhLy());
        }
        if (dto.getLyDo() != null) {
            entity.setLyDo(dto.getLyDo());
        }
        if (dto.getGiaTriThuHoi() != null) {
            entity.setGiaTriThuHoi(dto.getGiaTriThuHoi());
        }

        thanhLyRepository.save(entity);
        return convertToResponse(entity);
    }

    @Override
    public void deleteThanhLy(String maTL) throws DataNotFoundException {
        ThanhLy entity = thanhLyRepository.findById(maTL)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đề xuất thanh lý: " + maTL));

        if (entity.getTrangThai() != TrangThaiThanhLy.CHO_DUYET) {
            throw new RuntimeException("Chỉ có thể xóa đề xuất đang chờ duyệt");
        }

        thanhLyRepository.deleteById(maTL);
    }

    public List<ThanhLyResponse> getAllThanhLy() {
        return thanhLyRepository.findAll().stream()
                .map(this::convertToResponse)
                .sorted((a, b) -> {
                    if (a.getNgayDeXuat() == null) return 1;
                    if (b.getNgayDeXuat() == null) return -1;
                    return b.getNgayDeXuat().compareTo(a.getNgayDeXuat());
                })
                .collect(Collectors.toList());
    }

    public ThanhLyResponse getThanhLyById(String maTL) {
        ThanhLy entity = thanhLyRepository.findById(maTL)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đề xuất thanh lý: " + maTL));
        return convertToResponse(entity);
    }

    public List<ThanhLyResponse> getThanhLyByTrangThai(String trangThai) {
        TrangThaiThanhLy status = TrangThaiThanhLy.fromString(trangThai);
        return thanhLyRepository.findByTrangThai(status).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // XÓA ĐỀ XUẤT
    // ==========================================

    @Transactional
    public void xoaDeXuat(String maTL) {
        ThanhLy entity = thanhLyRepository.findById(maTL)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đề xuất thanh lý: " + maTL));

        if (entity.getTrangThai() != TrangThaiThanhLy.CHO_DUYET) {
            throw new RuntimeException("Chỉ có thể xóa đề xuất đang chờ duyệt");
        }

        thanhLyRepository.deleteById(maTL);
    }

    // ==========================================
    // THỐNG KÊ
    // ==========================================

    public Map<String, Long> thongKeTrangThai() {
        Map<String, Long> result = new LinkedHashMap<>();
        result.put("TONG_SO", thanhLyRepository.count());
        result.put("CHO_DUYET", thanhLyRepository.countByTrangThai(TrangThaiThanhLy.CHO_DUYET));
        result.put("DA_DUYET", thanhLyRepository.countByTrangThai(TrangThaiThanhLy.DA_DUYET));
        result.put("TU_CHOI", thanhLyRepository.countByTrangThai(TrangThaiThanhLy.TU_CHOI));
        result.put("DA_THANH_LY", thanhLyRepository.countByTrangThai(TrangThaiThanhLy.DA_THANH_LY));
        return result;
    }

    // ==========================================
    // HELPER
    // ==========================================

    private String generateMaThanhLy() {
        long count = thanhLyRepository.count();
        return String.format("TL_%03d", count + 1);
    }
}