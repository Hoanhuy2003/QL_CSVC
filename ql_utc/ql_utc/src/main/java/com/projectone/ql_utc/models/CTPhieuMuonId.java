package com.projectone.ql_utc.models;

import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CTPhieuMuonId implements Serializable {
    private String phieuMuon;
    private String thietBi;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CTPhieuMuonId that = (CTPhieuMuonId) o;
        return Objects.equals(phieuMuon, that.phieuMuon) &&
                Objects.equals(thietBi, that.thietBi);
    }

    @Override
    public int hashCode() {
        return Objects.hash(phieuMuon, thietBi);
    }
}