package com.projectone.ql_utc.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DuyetPhieuMuonRequest {
    private String maNV;
    private Boolean choDuyet;
    private String lyDoTuChoi;
}