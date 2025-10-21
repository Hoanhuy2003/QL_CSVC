package com.projectone.ql_utc.repositorys;

import com.projectone.ql_utc.models.LopTinChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LopTinChiRepository extends JpaRepository<LopTinChi, String> {
    Optional<LopTinChi> findByMaLTC(String maLTC);
    List<LopTinChi> findByNienKhoa(String nienKhoa);
    List<LopTinChi> findByHocKy(Integer hocKy);
}