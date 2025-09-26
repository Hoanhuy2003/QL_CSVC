package com.projectone.ql_utc.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum TinhTrangThietBi {
    DANG_MUON("Đang mượn"),
    SAN_SANG("Sẵn sàng"),
    HU_HONG("Hư hỏng");

    private final String label;

    TinhTrangThietBi(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public static TinhTrangThietBi fromLabel(String label) {
        for (TinhTrangThietBi e : values()) {
            if (e.getLabel().equalsIgnoreCase(label)) {
                return e;
            }
        }
        throw new IllegalArgumentException("Unknown label: " + label);
    }
}
