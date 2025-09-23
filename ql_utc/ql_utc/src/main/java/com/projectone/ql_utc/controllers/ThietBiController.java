package com.projectone.ql_utc.controllers;

import com.projectone.ql_utc.dtos.ThietBiDTO;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.iservices.IThietBiService;
import com.projectone.ql_utc.models.ThietBi;
import com.projectone.ql_utc.responses.ThietBiResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/thietbi")
public class ThietBiController {
    private IThietBiService thietBiService;


    @PostMapping("")
    public ResponseEntity<?> createThietBi(@Valid @RequestBody ThietBiDTO thietBiDTO){
        try {
            ThietBi newThietBi =  thietBiService.createThietBi(thietBiDTO);
            return ResponseEntity.ok().body(ThietBiResponse.fromThietBi(newThietBi));

        }catch (DataNotFoundException e){
          return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<ThietBi>> getAllThietBi() {
        return ResponseEntity.ok(thietBiService.getAllThietBi());
    }

}
