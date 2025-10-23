package com.projectone.ql_utc.services;

import com.projectone.ql_utc.dtos.PhongDTO;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.iservices.IPhongService;
import com.projectone.ql_utc.models.Phong;
import com.projectone.ql_utc.models.ThietBi;
import com.projectone.ql_utc.repositorys.PhongRepository;
import com.projectone.ql_utc.repositorys.ThietBiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class PhongService implements IPhongService {
    private final PhongRepository phongRepository;
    private final ThietBiRepository thietBiRepository;



    @Override
    public List<Phong> getAllPhong() {
        return phongRepository.findAll();
    }

    @Override
    public Phong createPhong(PhongDTO phongDTO) {
        Phong phong = Phong.builder()
                .maPhong(phongDTO.getMaPhong())
                .tenPhong(phongDTO.getTenPhong())
                .loaiPhong(phongDTO.getLoaiPhong())
                .sucChua(phongDTO.getSucChua())
                .trangThai(phongDTO.getTrangThai())
                .build();

        if(phongDTO.getThietBis() != null && !phongDTO.getThietBis().isEmpty()){
            List<ThietBi> thietBiList = phongDTO.getThietBis().stream()
                    .map(thietBiDTO -> {
                        ThietBi thietBi = thietBiRepository.findById(thietBiDTO.getMaTB())
                                .orElseThrow(()-> new DataNotFoundException("Khong tim thay thiet bi"+ thietBiDTO.getMaTB()));
                        thietBi.setPhong(phong);
                        return thietBi;
                    })
                    .collect(Collectors.toList());
            phong.setThietBis(thietBiList);
        }



        return phongRepository.save(phong);
    }

    @Override
    public Phong getPhongById(String maPhong) throws DataNotFoundException {
        return phongRepository.findById(maPhong)
                .orElseThrow(()-> new DataNotFoundException("Không tìm thấy phòng co mã: " + maPhong));
    }

    @Override
    public Phong updatePhong(String maPhong, PhongDTO phongDTO) throws DataNotFoundException {

        Phong existingPhong = phongRepository.findById(maPhong)
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy phòng có mã: " + maPhong));

        existingPhong.setTenPhong(phongDTO.getTenPhong());
        existingPhong.setLoaiPhong(phongDTO.getLoaiPhong());
        existingPhong.setSucChua(phongDTO.getSucChua());
        existingPhong.setTrangThai(phongDTO.getTrangThai());

        if (phongDTO.getThietBis() != null) {
            if (existingPhong.getThietBis() != null) {
                existingPhong.getThietBis().forEach(tb -> tb.setPhong(null));
            }


            List<ThietBi> newThietBi = phongDTO.getThietBis().stream()
                    .map(thietBiDTO -> {
                        ThietBi thietBi = thietBiRepository.findById(thietBiDTO.getMaTB())
                                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy TB có mã:" + thietBiDTO.getMaTB()));
                        thietBi.setPhong(existingPhong);
                        return thietBi;
                    })
                    .collect(Collectors.toList());
            existingPhong.setThietBis(newThietBi);

        }
        return phongRepository.save(existingPhong);
    }

    @Override
    public void deletePhong(String maPhong) throws DataNotFoundException {
        Phong phong = phongRepository.findById(maPhong)
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy phòng có mã: " + maPhong));

        if(phong.getThietBis() != null){
            phong.getThietBis().forEach(thietBi -> thietBi.setPhong(null));

        }
        phongRepository.delete(phong);

    }
}
