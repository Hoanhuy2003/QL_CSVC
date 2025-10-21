package com.projectone.ql_utc.iservices;

import com.projectone.ql_utc.dtos.ThanhLyDTO;
import com.projectone.ql_utc.dtos.ThanhLyRequest;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.responses.ThanhLyResponse;
import java.util.List;

public interface IThanhLyService {
    ThanhLyResponse createThanhLy(ThanhLyRequest thanhLyDTO) throws DataNotFoundException;

    ThanhLyResponse updateThanhLy(String maTL, ThanhLyRequest thanhLyDTO) throws DataNotFoundException;

    void deleteThanhLy(String maTL) throws DataNotFoundException;

    List<ThanhLyResponse> getAllThanhLy();

    ThanhLyResponse getThanhLyById(String maTL);
}
