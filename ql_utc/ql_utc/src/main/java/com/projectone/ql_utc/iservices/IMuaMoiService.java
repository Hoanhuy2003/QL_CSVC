package com.projectone.ql_utc.iservices;

import com.projectone.ql_utc.dtos.MuaMoiDTO;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.models.MuaMoi;

import java.util.List;

public interface IMuaMoiService {
    MuaMoi createMua(MuaMoiDTO muaMoiDTO) throws DataNotFoundException;
    List<MuaMoi> getAllMua();


}
