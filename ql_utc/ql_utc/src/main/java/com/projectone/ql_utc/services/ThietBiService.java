package com.projectone.ql_utc.services;

import com.projectone.ql_utc.dtos.LoaiTBDTO;
import com.projectone.ql_utc.dtos.ThietBiDTO;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.iservices.IThietBiService;
import com.projectone.ql_utc.models.LoaiThietBi;
import com.projectone.ql_utc.models.ThietBi;
import com.projectone.ql_utc.repositorys.LoaiThietBiRepository;
import com.projectone.ql_utc.repositorys.ThietBiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
@RequiredArgsConstructor
public class ThietBiService implements IThietBiService {

    private final ThietBiRepository thietBiRepository;
    private final LoaiThietBiRepository loaiThietBiRepository;

    @Override
    public ThietBi createThietBi(ThietBiDTO thietBiDTO) {
        LoaiThietBi loaiThietBi = loaiThietBiRepository.findById(thietBiDTO.getMaLoai())
                .orElseThrow(()-> new DataNotFoundException("Không có loại này"));
        ThietBi thietBi = ThietBi.builder()
                .maTB(thietBiDTO.getMaTB())
                .tenTB(thietBiDTO.getTenTB())
                .loai(loaiThietBi)
                .ngayNhap(thietBiDTO.getNgayNhap())
                .tinhTrang(thietBiDTO.getTinhTrang())
                .giaTri(thietBiDTO.getGiaTri())
                .build();
        return thietBiRepository.save(thietBi);
    }

    @Override
    public List<ThietBi> getAllThietBi() {
        return thietBiRepository.findAll();
    }

    @Override
    public ThietBi getThietBiById(String maTB) throws DataNotFoundException {
        return thietBiRepository.findById(maTB)
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy sản phẩm có max: "+ maTB));
    }

    @Override
    public ThietBi updateThietBi(String maTB, ThietBiDTO thietBiDTO) throws DataNotFoundException {
        ThietBi existing = getThietBiById(maTB);

        LoaiThietBi loaiThietBi = loaiThietBiRepository.findById(thietBiDTO.getMaLoai())
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy loại thieets bị này"));
        existing.setTenTB(thietBiDTO.getTenTB());
        existing.setLoai(loaiThietBi);
        existing.setNgayNhap(thietBiDTO.getNgayNhap());
        existing.setTinhTrang(thietBiDTO.getTinhTrang());
        existing.setGiaTri(thietBiDTO.getGiaTri());

        return thietBiRepository.save(existing);
    }

    @Override
    public void deleteThietBi(String maTB) throws DataNotFoundException {
        ThietBi existing = getThietBiById(maTB);
        thietBiRepository.delete(existing);

    }
}
