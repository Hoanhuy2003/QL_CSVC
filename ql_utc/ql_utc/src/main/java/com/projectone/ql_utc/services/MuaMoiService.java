package com.projectone.ql_utc.services;

import com.projectone.ql_utc.dtos.MuaMoiDTO;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.iservices.IMuaMoiService;
import com.projectone.ql_utc.models.LoaiThietBi;
import com.projectone.ql_utc.models.MuaMoi;
import com.projectone.ql_utc.models.ThietBi;
import com.projectone.ql_utc.repositorys.LoaiThietBiRepository;
import com.projectone.ql_utc.repositorys.MuaMoiRepository;
import com.projectone.ql_utc.repositorys.ThietBiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class MuaMoiService implements IMuaMoiService {
    private final MuaMoiRepository muaMoiRepository;
    private final ThietBiRepository thietBiRepository;
    private final LoaiThietBiRepository loaiThietBiRepository;


    @Override
    public MuaMoi createMua(MuaMoiDTO muaMoiDTO) throws DataNotFoundException {

        ThietBi thietBi = thietBiRepository.findById(muaMoiDTO.getMaTB())
                .orElseThrow(()-> new DataNotFoundException("Thiet bi khon ton tai"));
        LoaiThietBi loaiThietBi = loaiThietBiRepository.findById(muaMoiDTO.getMaLoai())
                .orElseThrow(() -> new DataNotFoundException("Loai nay khong ton tai"));
        MuaMoi muaMoi = MuaMoi.builder()
                .maMua(muaMoiDTO.getMaMua())
                .thietBi(thietBi)
                .loaiThietBi(loaiThietBi)
                .ngayMua(muaMoiDTO.getNgayMua())
                .nhaCungCap(muaMoiDTO.getNhaCungCap())
                .soLuong(muaMoiDTO.getSoLuong())
                .donGia(muaMoiDTO.getDonGia())
                .build();
        return muaMoiRepository.save(muaMoi);
    }

    @Override
    public List<MuaMoi> getAllMua() {
        return muaMoiRepository.findAll();
    }
}
