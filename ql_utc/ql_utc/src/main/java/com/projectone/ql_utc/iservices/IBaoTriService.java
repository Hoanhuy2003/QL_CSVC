package com.projectone.ql_utc.iservices;

import com.projectone.ql_utc.dtos.BaoTriDTO;
import com.projectone.ql_utc.dtos.BaoTriRequest;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.models.BaoTri;
import com.projectone.ql_utc.responses.BaoTriResponse;

import java.util.List;

public interface IBaoTriService {
    BaoTri createBaoTri(BaoTriRequest baoTriDTO) throws DataNotFoundException;
    List<BaoTriResponse> getAllBaoTri();
    BaoTri updateBaoTri(String maBT, BaoTriRequest baoTriDTO) throws DataNotFoundException;
}
