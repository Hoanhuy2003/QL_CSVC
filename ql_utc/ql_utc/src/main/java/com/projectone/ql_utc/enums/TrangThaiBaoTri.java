package com.projectone.ql_utc.enums;

import lombok.Getter;

@Getter
public enum TrangThaiBaoTri {
    DANG_THUC_HIEN("Đang thực hiện"),
    HOAN_THANH("Hoàn thành"),
    TAM_DUNG("Tạm dừng"),
    HUY_BO("Hủy bỏ");

    private final String moTa;

    TrangThaiBaoTri(String moTa) {
        this.moTa = moTa;
    }

    /**
     * Convert từ String sang Enum (case-insensitive)
     */
    public static TrangThaiBaoTri fromString(String text) {
        if (text == null || text.trim().isEmpty()) {
            return DANG_THUC_HIEN;
        }

        String normalized = text.trim().toUpperCase();

        try {
            return TrangThaiBaoTri.valueOf(normalized);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(
                    "Trạng thái bảo trì không hợp lệ: " + text +
                            ". Các giá trị cho phép: DANG_THUC_HIEN, HOAN_THANH, TAM_DUNG, HUY_BO"
            );
        }
    }

    /**
     * Kiểm tra có phải trạng thái hoàn thành không
     */
    public boolean isHoanThanh() {
        return this == HOAN_THANH;
    }

    /**
     * Kiểm tra có đang trong quá trình không
     */
    public boolean isDangThucHien() {
        return this == DANG_THUC_HIEN;
    }
}