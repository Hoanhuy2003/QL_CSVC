package com.projectone.ql_utc.repositorys;

import com.projectone.ql_utc.models.Phong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhongRepository extends JpaRepository<Phong, String> {
}