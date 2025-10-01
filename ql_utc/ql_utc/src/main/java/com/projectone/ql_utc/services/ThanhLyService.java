package com.projectone.ql_utc.services;

import com.projectone.ql_utc.dtos.ThanhLyDTO;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.iservices.IThanhLyService;
import com.projectone.ql_utc.models.ThanhLy;
import com.projectone.ql_utc.models.ThietBi;
import com.projectone.ql_utc.repositorys.ThanhLyRepository;
import com.projectone.ql_utc.repositorys.ThietBiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ThanhLyService implements IThanhLyService {
    private final ThanhLyRepository thanhLyRepository;
    private final ThietBiRepository thietBiRepository;

    @Override
    public ThanhLy createThanhLy(ThanhLyDTO dto) throws DataNotFoundException {
        ThietBi thietBi = thietBiRepository.findById(dto.getMaTB())
                .orElseThrow(() -> new DataNotFoundException("Không có thiết bị này"));

        ThanhLy thanhLy = ThanhLy.builder()
                .maTL(dto.getMaTL())
                .thietBi(thietBi)
                .ngayThanhLy(dto.getNgayThanhLy())
                .lyDo(dto.getLyDo())
                .giaTriThuHoi(dto.getGiaTriThuHoi())
                .build();

        return thanhLyRepository.save(thanhLy);
    }

    @Override
    public ThanhLy updateThanhLy(String maTL, ThanhLyDTO dto) throws DataNotFoundException {
        ThanhLy thanhLy = thanhLyRepository.findById(maTL)
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy bản ghi thanh lý"));

        ThietBi thietBi = thietBiRepository.findById(dto.getMaTB())
                .orElseThrow(() -> new DataNotFoundException("Không có thiết bị này"));

        thanhLy.setThietBi(thietBi);
        thanhLy.setNgayThanhLy(dto.getNgayThanhLy());
        thanhLy.setLyDo(dto.getLyDo());
        thanhLy.setGiaTriThuHoi(dto.getGiaTriThuHoi());

        return thanhLyRepository.save(thanhLy);
    }

    @Override
    public void deleteThanhLy(String maTL) throws DataNotFoundException {
        ThanhLy thanhLy = thanhLyRepository.findById(maTL)
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy bản ghi thanh lý"));
        thanhLyRepository.delete(thanhLy);
    }

    @Override
    public List<ThanhLy> getAllThanhLy() {
        return thanhLyRepository.findAll();
    }

    @Override
    public ThanhLy getThanhLyById(String maTL) throws DataNotFoundException {
        return thanhLyRepository.findById(maTL)
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy bản ghi thanh lý"));
    }
}
