package com.projectone.ql_utc.services;

import com.projectone.ql_utc.dtos.NhanVienDTO;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.iservices.INhanVienService;
import com.projectone.ql_utc.models.NhanVien;
import com.projectone.ql_utc.repositorys.NhanVienRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NhanVienService implements INhanVienService {

    private final NhanVienRepository nhanVienRepository;

    @Override
    public NhanVien createNhanVien(NhanVienDTO nhanVienDTO) throws DataNotFoundException {
        NhanVien nhanVien = NhanVien.builder()
                .maNV(nhanVienDTO.getMaNV())
                .tenNV(nhanVienDTO.getTenNV())
                .email(nhanVienDTO.getEmail())
                .sdt(nhanVienDTO.getSdt())
                .dangLamViec(true)
                .build();
        return nhanVienRepository.save(nhanVien);
    }
}
