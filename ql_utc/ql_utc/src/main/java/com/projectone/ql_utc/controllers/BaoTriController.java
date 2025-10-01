package com.projectone.ql_utc.controllers;

import com.projectone.ql_utc.dtos.BaoTriDTO;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.iservices.IBaoTriService;
import com.projectone.ql_utc.models.BaoTri;
import com.projectone.ql_utc.responses.BaoTriResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bao_tri")
@RequiredArgsConstructor
public class BaoTriController {
    private  final IBaoTriService baoTriService;

    @PostMapping("")
    public ResponseEntity<?> createBaoTri(@RequestBody BaoTriDTO baoTriDTO){
        try {
            BaoTri baoTri = baoTriService.createBaoTri(baoTriDTO);
            return ResponseEntity.ok().body(BaoTriResponse.fromBaoTri(baoTri));
        }catch (DataNotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("")
    public ResponseEntity<List<BaoTriResponse>> getAllBaoTri(){
        List<BaoTriResponse> responses = baoTriService.getAllBaoTri()
                .stream()
                .map(BaoTriResponse::fromBaoTri)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }
    @PutMapping("/{maBT}")
    public ResponseEntity<?> updateBaotri(@PathVariable String maBT, @RequestBody BaoTriDTO baoTriDTO){
        try {
            BaoTri updatedBaoTri = baoTriService.updateBaoTri(maBT, baoTriDTO);
            return ResponseEntity.ok().body(BaoTriResponse.fromBaoTri(updatedBaoTri));
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
