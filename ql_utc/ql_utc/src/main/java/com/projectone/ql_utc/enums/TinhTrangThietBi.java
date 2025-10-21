package com.projectone.ql_utc.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

@Getter
public enum TinhTrangThietBi {
    SAN_SANG("Sẵn sàng"),
    DANG_SU_DUNG("Đang sử dụng"),
    DANG_MUON("Đang mượn"),
    DANG_BAO_TRI("Đang bảo trì"),
    HONG("Hỏng"),
    MAT("Mất"),
    DA_THANH_LY("Đã thanh lý");

    @JsonValue
    private final String displayName;

    TinhTrangThietBi(String displayName) {
        this.displayName = displayName;
    }

    // Convert từ String sang Enum
    public static TinhTrangThietBi fromCode(String code) {
        if (code == null || code.trim().isEmpty()) {
            return SAN_SANG; // Default
        }

        // Chuẩn hóa input
        String normalized = code.trim();

        // Thử match với displayName trước
        for (TinhTrangThietBi status : values()) {
            if (status.displayName.equalsIgnoreCase(normalized)) {
                return status;
            }
        }

        // Thử match với enum name
        for (TinhTrangThietBi status : values()) {
            if (status.name().equalsIgnoreCase(normalized)) {
                return status;
            }
        }

        // Một số mapping đặc biệt cho dữ liệu cũ
        switch (normalized.toLowerCase()) {
            case "san sang":
            case "sẵn sàng":
            case "available":
                return SAN_SANG;
            case "dang su dung":
            case "đang sử dụng":
            case "in use":
                return DANG_SU_DUNG;
            case "dang muon":
            case "đang mượn":
            case "borrowed":
                return DANG_MUON;
            case "dang bao tri":
            case "đang bảo trì":
            case "maintenance":
                return DANG_BAO_TRI;
            case "hong":
            case "hỏng":
            case "broken":
                return HONG;
            case "mat":
            case "mất":
            case "lost":
                return MAT;
            case "da thanh ly":
            case "đã thanh lý":
            case "disposed":
                return DA_THANH_LY;
            default:
                // Log warning và return default
                System.err.println("⚠️ Unknown TinhTrangThietBi code: " + code + " - Using SAN_SANG as default");
                return SAN_SANG;
        }
    }

    @Override
    public String toString() {
        return displayName;
    }
}