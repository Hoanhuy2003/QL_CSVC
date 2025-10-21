package com.projectone.ql_utc.iservices;

import com.projectone.ql_utc.dtos.LoaiTBDTO;
import com.projectone.ql_utc.models.LoaiThietBi;

public interface ILoaiThietBiService {
    LoaiThietBi createLoaiThietBi(LoaiTBDTO loaiTBDTO);
}
