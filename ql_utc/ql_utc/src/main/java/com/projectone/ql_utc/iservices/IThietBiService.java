package com.projectone.ql_utc.iservices;

import com.projectone.ql_utc.dtos.ThietBiDTO;
import com.projectone.ql_utc.models.ThietBi;

import java.util.List;

public interface IThietBiService {
    ThietBi createThietBi(ThietBiDTO thietBiDTO);
    List<ThietBi> getAllThietBi();
}
