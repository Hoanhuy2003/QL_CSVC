package com.projectone.ql_utc.repositorys;

import com.projectone.ql_utc.models.CTPhieuMuon;
import com.projectone.ql_utc.models.CTPhieuMuonId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CTPhieuMuonRepository extends JpaRepository<CTPhieuMuon, CTPhieuMuonId> {
    List<CTPhieuMuon> findByPhieuMuon_MaPM(String maPM);
    List<CTPhieuMuon> findByThietBi_MaTB(String maTB);
    List<CTPhieuMuon> findBySinhVien_MaSV(String maSV);
}