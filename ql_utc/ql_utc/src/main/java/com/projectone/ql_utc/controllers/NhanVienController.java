package com.projectone.ql_utc.controllers;

import com.projectone.ql_utc.dtos.NhanVienDTO;
import com.projectone.ql_utc.iservices.INhanVienService;
import com.projectone.ql_utc.models.NhanVien;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/nhan_vien")
@RequiredArgsConstructor
public class NhanVienController {
    private final INhanVienService nhanVienService;

    @PostMapping("")
    public ResponseEntity<NhanVien> createNhanVien(@RequestBody NhanVienDTO nhanVienDTO){
        return ResponseEntity.ok(nhanVienService.createNhanVien(nhanVienDTO));
    }

}
