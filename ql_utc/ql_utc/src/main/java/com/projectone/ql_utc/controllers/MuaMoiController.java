package com.projectone.ql_utc.controllers;

import com.projectone.ql_utc.dtos.MuaMoiDTO;
import com.projectone.ql_utc.exception.DataNotFoundException;
import com.projectone.ql_utc.iservices.IMuaMoiService;
import com.projectone.ql_utc.models.MuaMoi;
import com.projectone.ql_utc.responses.MuaMoiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mua_moi")
@RequiredArgsConstructor
public class MuaMoiController {
    private final IMuaMoiService muaMoiService;

    @PostMapping("")
    public ResponseEntity<?> createMua(@RequestBody MuaMoiDTO muaMoiDTO){
        try {
            MuaMoi muaMoi = muaMoiService.createMua(muaMoiDTO);
            return ResponseEntity.ok().body(MuaMoiResponse.fromMuaMoi(muaMoi));
        } catch (DataNotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());

        }


    }
}
