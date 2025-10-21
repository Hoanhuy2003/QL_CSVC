package com.projectone.ql_utc.services;

import com.projectone.ql_utc.dtos.LoaiTBDTO;
import com.projectone.ql_utc.iservices.ILoaiThietBiService;
import com.projectone.ql_utc.models.LoaiThietBi;
import com.projectone.ql_utc.repositorys.LoaiThietBiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoaiThietBiService implements ILoaiThietBiService {
    private final LoaiThietBiRepository loaiThietBiRepository;


    @Override
    public LoaiThietBi createLoaiThietBi(LoaiTBDTO loaiTBDTO) {
        LoaiThietBi loaiThietBi = new LoaiThietBi();
        loaiThietBi.setMaLoai(loaiTBDTO.getMaLoai());
        loaiThietBi.setTenLoai(loaiTBDTO.getTenLoai());
        return loaiThietBiRepository.save(loaiThietBi);
    }
}
