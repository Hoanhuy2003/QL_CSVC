package com.projectone.ql_utc.controllers;

import com.projectone.ql_utc.dtos.PhongDTO;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.iservices.IPhongService;
import com.projectone.ql_utc.models.Phong;
import com.projectone.ql_utc.responses.PhongResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/phong")
@RequiredArgsConstructor
public class PhongController {
    private final IPhongService phongService;

    @GetMapping("")
    public ResponseEntity<List<PhongResponse>> getAllPhong(){
        List<PhongResponse> responses = phongService.getAllPhong().stream()
                .map(PhongResponse::fromPhong)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);

    }

    @PostMapping("")
    public ResponseEntity<?> createPhong(@RequestBody PhongDTO phongDTO){
        try {
            Phong phong = phongService.createPhong(phongDTO);
            return ResponseEntity.ok(PhongResponse.fromPhong(phong));
        } catch (DataNotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{maPhong}")
    public ResponseEntity<?> getPhongById(@PathVariable("maPhong") String maPhong) {
        try {
            Phong phong = phongService.getPhongById(maPhong);
            return ResponseEntity.ok(PhongResponse.fromPhong(phong));
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PutMapping("/{maPhong}")
    public ResponseEntity<?> updatePhong(@PathVariable("maPhong") String maPhong, @RequestBody PhongDTO phongDTO) {
        try {
            Phong phong = phongService.updatePhong(maPhong, phongDTO);
            return ResponseEntity.ok(PhongResponse.fromPhong(phong));
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @DeleteMapping("/{maPhong}")
    public ResponseEntity<?> deletePhong(@PathVariable("maPhong") String maPhong) {
        try {
            phongService.deletePhong(maPhong);
            return ResponseEntity.ok("Đã xóa phòng có mã: " + maPhong);
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
