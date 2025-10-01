package com.projectone.ql_utc.services;

import com.projectone.ql_utc.dtos.BaoTriDTO;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.iservices.IBaoTriService;
import com.projectone.ql_utc.models.BaoTri;
import com.projectone.ql_utc.models.NhanVien;
import com.projectone.ql_utc.models.ThietBi;
import com.projectone.ql_utc.repositorys.BaoTriRepository;
import com.projectone.ql_utc.repositorys.NhanVienRepository;
import com.projectone.ql_utc.repositorys.ThietBiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class BaoTriService implements IBaoTriService {

    private final BaoTriRepository baoTriRepository;
    private final NhanVienRepository nhanVienRepository;
    private final ThietBiRepository thietBiRepository;

    @Override
    public BaoTri createBaoTri(BaoTriDTO baoTriDTO) throws DataNotFoundException {
          ThietBi thietBi = thietBiRepository.findById(baoTriDTO.getMaTB())
                  .orElseThrow(() -> new DataNotFoundException("Khong có thiết bị này"));
          NhanVien nhanVien = nhanVienRepository.findById(baoTriDTO.getNhanVienPhuTrach())
                  .orElseThrow(()->new DataNotFoundException("Khong có NV nào phụ trách"));

          BaoTri baoTri = BaoTri.builder()
                  .maBT(baoTriDTO.getMaBT())
                  .thietBi(thietBi)
                  .ngayBT(baoTriDTO.getNgayBT())
                  .noiDung(baoTriDTO.getNoiDung())
                  .nhanVien(nhanVien)
                  .chiPhi(baoTriDTO.getChiPhi())
                  .build();
          return baoTriRepository.save(baoTri);
    }

    @Override
    public List<BaoTri> getAllBaoTri() {
        return baoTriRepository.findAll();
    }

    @Override
    public BaoTri updateBaoTri(String maBT, BaoTriDTO baoTriDTO) throws DataNotFoundException {
        BaoTri baoTri = baoTriRepository.findById(maBT)
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy bảo trì: " + maBT));

        ThietBi thietBi = thietBiRepository.findById(baoTriDTO.getMaTB())
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy thiết bị: " + baoTriDTO.getMaTB()));
        NhanVien nhanVien = nhanVienRepository.findById(baoTriDTO.getNhanVienPhuTrach())
                .orElseThrow(()->new DataNotFoundException("Khong có NV nào phụ trách"));

            baoTri.setThietBi(thietBi);
            baoTri.setNgayBT(baoTriDTO.getNgayBT());
            baoTri.setNoiDung(baoTriDTO.getNoiDung());
            baoTri.setNhanVien(nhanVien);
            baoTri.setChiPhi(baoTriDTO.getChiPhi());



        return baoTriRepository.save(baoTri);
    }
}
