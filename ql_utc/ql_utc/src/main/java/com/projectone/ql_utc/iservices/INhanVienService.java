package com.projectone.ql_utc.iservices;

import com.projectone.ql_utc.dtos.NhanVienDTO;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.models.NhanVien;

public interface INhanVienService {
    NhanVien createNhanVien(NhanVienDTO nhanVienDTO) throws DataNotFoundException;

}
