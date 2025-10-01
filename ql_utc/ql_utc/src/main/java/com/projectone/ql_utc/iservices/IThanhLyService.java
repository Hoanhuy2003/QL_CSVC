package com.projectone.ql_utc.iservices;

import com.projectone.ql_utc.dtos.ThanhLyDTO;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.models.ThanhLy;

import java.util.List;

public interface IThanhLyService {
    ThanhLy createThanhLy(ThanhLyDTO thanhLyDTO) throws DataNotFoundException;
    ThanhLy updateThanhLy(String maTL, ThanhLyDTO thanhLyDTO) throws DataNotFoundException;
    void deleteThanhLy(String maTL) throws DataNotFoundException;
    List<ThanhLy> getAllThanhLy();
    ThanhLy getThanhLyById(String maTL) throws DataNotFoundException;
}
