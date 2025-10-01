package com.projectone.ql_utc.iservices;

import com.projectone.ql_utc.dtos.BaoTriDTO;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.models.BaoTri;

import java.util.List;

public interface IBaoTriService {
    BaoTri createBaoTri(BaoTriDTO baoTriDTO) throws DataNotFoundException;
    List<BaoTri> getAllBaoTri();
    BaoTri updateBaoTri(String maBT, BaoTriDTO baoTriDTO) throws DataNotFoundException;
}
