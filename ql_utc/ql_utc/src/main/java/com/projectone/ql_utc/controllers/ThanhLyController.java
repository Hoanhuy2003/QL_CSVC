package com.projectone.ql_utc.controllers;

import com.projectone.ql_utc.dtos.ThanhLyDTO;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.iservices.IThanhLyService;
import com.projectone.ql_utc.models.ThanhLy;
import com.projectone.ql_utc.responses.ThanhLyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/thanh_ly")
@RequiredArgsConstructor
public class ThanhLyController {
    private final IThanhLyService thanhLyService;

    @PostMapping("")
    public ResponseEntity<?> createThanhLy(@RequestBody ThanhLyDTO dto) {
        try {
            ThanhLy thanhLy = thanhLyService.createThanhLy(dto);
            return ResponseEntity.ok(ThanhLyResponse.fromThanhLy(thanhLy));
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{maTL}")
    public ResponseEntity<?> updateThanhLy(@PathVariable String maTL, @RequestBody ThanhLyDTO dto) {
        try {
            ThanhLy thanhLy = thanhLyService.updateThanhLy(maTL, dto);
            return ResponseEntity.ok(ThanhLyResponse.fromThanhLy(thanhLy));
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{maTL}")
    public ResponseEntity<?> deleteThanhLy(@PathVariable String maTL) {
        try {
            thanhLyService.deleteThanhLy(maTL);
            return ResponseEntity.ok("Xóa thành công");
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("")
    public ResponseEntity<List<ThanhLyResponse>> getAllThanhLy() {
        List<ThanhLyResponse> responses = thanhLyService.getAllThanhLy()
                .stream()
                .map(ThanhLyResponse::fromThanhLy)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{maTL}")
    public ResponseEntity<?> getThanhLyById(@PathVariable String maTL) {
        try {
            ThanhLy thanhLy = thanhLyService.getThanhLyById(maTL);
            return ResponseEntity.ok(ThanhLyResponse.fromThanhLy(thanhLy));
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
