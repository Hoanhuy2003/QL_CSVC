package com.projectone.ql_utc.controllers;

import com.projectone.ql_utc.dtos.LoaiTBDTO;
import com.projectone.ql_utc.iservices.ILoaiThietBiService;
import com.projectone.ql_utc.models.LoaiThietBi;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/loai")
@RequiredArgsConstructor
public class LoaiThietBiController {
    private final ILoaiThietBiService loaiThietBiService;

    @PostMapping("")
    public ResponseEntity<LoaiThietBi> creareLoaiThietBi(@RequestBody LoaiTBDTO loaiTBDTO){
        return ResponseEntity.ok(loaiThietBiService.createLoaiThietBi(loaiTBDTO));
    }
}
