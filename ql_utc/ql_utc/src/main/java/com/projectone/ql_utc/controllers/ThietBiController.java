package com.projectone.ql_utc.controllers;

import com.projectone.ql_utc.dtos.ThietBiDTO;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.iservices.IThietBiService;
import com.projectone.ql_utc.models.ThietBi;
import com.projectone.ql_utc.responses.ThietBiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/thietbi")
@RequiredArgsConstructor
public class ThietBiController {
    private final IThietBiService thietBiService;


    @PostMapping("")
    public ResponseEntity<?> createThietBi(@Valid @RequestBody ThietBiDTO thietBiDTO){
        try {
            ThietBi newThietBi =  thietBiService.createThietBi(thietBiDTO);
            return ResponseEntity.ok().body(ThietBiResponse.fromThietBi(newThietBi));

        }catch (DataNotFoundException e){
          return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("")
    public ResponseEntity<List<ThietBiResponse>> getAllThietBi() {
        List<ThietBiResponse> responses = thietBiService.getAllThietBi()
                .stream()
                .map(ThietBiResponse::fromThietBi)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }
    @GetMapping("/{maTB}")
    public ResponseEntity<?> getThietBiById(@PathVariable String maTB){
        try {
            ThietBi thietBi = thietBiService.getThietBiById(maTB);
            return ResponseEntity.ok(ThietBiResponse.fromThietBi(thietBi));
        } catch (DataNotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{maTB}")
    public ResponseEntity<?> deleteThietBi(@PathVariable String maTB){
        try {
            thietBiService.deleteThietBi(maTB);
            return ResponseEntity.ok("Xoa thanh cong");

        }catch (DataNotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }






}
