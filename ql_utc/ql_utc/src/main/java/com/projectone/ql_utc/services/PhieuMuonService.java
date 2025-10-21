package com.projectone.ql_utc.services;

import com.projectone.ql_utc.dtos.CTPhieuMuonResponse;
import com.projectone.ql_utc.dtos.PhieuMuonRequest;
import com.projectone.ql_utc.dtos.PhieuMuonResponse;
import com.projectone.ql_utc.enums.LoaiPhieu;
import com.projectone.ql_utc.enums.TrangThaiPhieuMuon;
import com.projectone.ql_utc.models.PhieuMuon;
import com.projectone.ql_utc.repositorys.LopTinChiRepository;
import com.projectone.ql_utc.repositorys.PhieuMuonRepository;
import com.projectone.ql_utc.repositorys.PhongRepository;
import com.projectone.ql_utc.repositorys.SinhVienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PhieuMuonService {

    private final PhieuMuonRepository repository;
    private final PhongRepository phongRepository;
    @Autowired
    private PhieuMuonRepository phieuMuonRepository;

    @Autowired
    private SinhVienRepository sinhVienRepository;

    @Autowired
    private LopTinChiRepository lopTinChiRepository;

    public PhieuMuonService(PhieuMuonRepository repository, PhongRepository phongRepository) {
        this.repository = repository;
        this.phongRepository = phongRepository;
    }

    // ==========================================
    // LẤY DỮ LIỆU
    // ==========================================

    public List<PhieuMuonResponse> getAllPhieuMuon() {
        return repository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public PhieuMuonResponse getPhieuMuonById(String maPM) {
        PhieuMuon entity = repository.findById(maPM)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu mượn"));
        return convertToResponse(entity);
    }

    public List<PhieuMuonResponse> getPhieuMuonByTrangThai(TrangThaiPhieuMuon trangThai) {
        return repository.findByTrangThai(trangThai).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<PhieuMuonResponse> getPhieuMuonBySinhVien(String maSV) {
        return repository.findBySinhVien_MaSV(maSV).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<PhieuMuonResponse> getPhieuMuonQuaHan() {
        return repository.findPhieuQuaHan(new Date()).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // THAO TÁC PHIẾU MƯỢN
    // ==========================================

    public PhieuMuonResponse taoPhieuMuon(PhieuMuonRequest request) {
        PhieuMuon entity = new PhieuMuon();

        // Tạo mã phiếu tự động
        String prefix = request.getLoaiPhieu() == LoaiPhieu.CA_NHAN ? "PM_CN_" : "PM_LH_";
        entity.setMaPM(prefix + String.format("%03d", repository.count() + 1));

        entity.setLoaiPhieu(request.getLoaiPhieu());
        entity.setThoiDiemMuon(request.getThoiDiemMuon());
        entity.setHanTra(request.getHanTra());
        entity.setMucDich(request.getMucDich());
        entity.setGhiChu(request.getGhiChu());
        entity.setNgayTao(new Date());
        entity.setTrangThai(TrangThaiPhieuMuon.CHO_DUYET);

        // Set phòng
        entity.setPhong(phongRepository.findById(request.getMaPhong())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phòng")));

        // Set người hoặc lớp mượn
        if (request.getLoaiPhieu() == LoaiPhieu.CA_NHAN) {
            entity.setSinhVien(sinhVienRepository.findByMaSV(request.getMaSV())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sinh viên")));
        } else {
            entity.setLopTinChi(lopTinChiRepository.findById(request.getMaLTC())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy lớp tín chỉ")));
        }

        repository.save(entity);
        return convertToResponse(entity);
    }

    public void huyPhieuMuon(String maPM) {
        PhieuMuon entity = repository.findById(maPM)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu mượn"));
        repository.delete(entity);
    }

    // ==========================================
    // THỐNG KÊ
    // ==========================================

    public long countPhieuMuonByStatus(TrangThaiPhieuMuon status) {
        return (status == null) ? repository.count() : repository.countByTrangThai(status);
    }

    public Map<String, Long> countAllStatuses() {
        Map<String, Long> result = new LinkedHashMap<>();
        for (TrangThaiPhieuMuon t : TrangThaiPhieuMuon.values()) {
            result.put(t.name(), repository.countByTrangThai(t));
        }
        result.put("TAT_CA", repository.count());
        return result;
    }

    public Map<String, Long> countByLoaiPhieu() {
        Map<String, Long> result = new LinkedHashMap<>();
        for (LoaiPhieu lp : LoaiPhieu.values()) {
            result.put(lp.name(), repository.countByLoaiPhieu(lp));
        }
        return result;
    }

    // ==========================================
    // CHUYỂN ĐỔI ENTITY -> RESPONSE
    // ==========================================

    private PhieuMuonResponse convertToResponse(PhieuMuon entity) {
        PhieuMuonResponse response = new PhieuMuonResponse();

        response.setMaPM(entity.getMaPM());
        response.setLoaiPhieu(entity.getLoaiPhieu());
        response.setNgayTao(entity.getNgayTao());
        response.setHanTra(entity.getHanTra());
        response.setThoiDiemMuon(entity.getThoiDiemMuon());
        response.setThoiDiemTra(entity.getThoiDiemTra());
        response.setTrangThai(entity.getTrangThai());
        response.setTongPhiBoiThuong(entity.getTongPhiBoiThuong());
        response.setDaQuaHan(entity.getHanTra() != null && entity.getHanTra().before(new Date()));

        // ====== Thông tin phòng ======
        if (entity.getPhong() != null) {
            response.setMaPhong(entity.getPhong().getMaPhong());
            response.setTenPhong(entity.getPhong().getTenPhong());
        }

        // ====== Người hoặc lớp mượn ======
        if (entity.getLoaiPhieu() == LoaiPhieu.CA_NHAN && entity.getSinhVien() != null) {
            response.setTenNguoiMuon(entity.getSinhVien().getTenSV());
        } else if (entity.getLoaiPhieu() == LoaiPhieu.LOP_HOC && entity.getLopTinChi() != null) {
            response.setTenNguoiMuon(entity.getLopTinChi().getMonHoc());
        }

        // ====== Danh sách thiết bị ======
        if (entity.getChiTietPhieuMuons() != null) {
            List<CTPhieuMuonResponse> ds = entity.getChiTietPhieuMuons().stream()
                    .map(ct -> CTPhieuMuonResponse.builder()
                            .maTB(ct.getThietBi().getMaTB())
                            .tenTB(ct.getThietBi().getTenTB())
                            .trangThai(ct.getTrangThai())
                            .tinhTrangKhiTra(ct.getTinhTrangKhiTra())
                            .phiBoiThuong(ct.getPhiBoiThuong())
                            .thoiDiemLay(ct.getThoiDiemLay())
                            .thoiDiemTra(ct.getThoiDiemTra())
                            .build())
                    .collect(Collectors.toList());

            response.setDanhSachThietBi(ds);
            response.setSoThietBi(ds.size());
            response.setSoThietBiDaTra((int) ds.stream()
                    .filter(ct -> ct.getThoiDiemTra() != null)
                    .count());
        }

        return response;
    }


}
