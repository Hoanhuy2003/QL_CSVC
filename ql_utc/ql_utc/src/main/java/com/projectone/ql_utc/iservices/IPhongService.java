package com.projectone.ql_utc.iservices;

import com.projectone.ql_utc.dtos.PhongDTO;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.models.Phong;


import java.util.List;

public interface IPhongService {

    List<Phong> getAllPhong();
    Phong createPhong(PhongDTO phongDTO);
    Phong getPhongById(String maPhong) throws DataNotFoundException;
    Phong updatePhong(String maPhong, PhongDTO phongDTO) throws DataNotFoundException;
    void deletePhong(String maPhong) throws DataNotFoundException;
}
