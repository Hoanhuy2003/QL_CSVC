package com.projectone.ql_utc.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

@Getter
public enum TrangThaiThanhLy {
    CHO_DUYET("Chờ duyệt"),
    DA_DUYET("Đã duyệt"),
    TU_CHOI("Từ chối"),
    DA_THANH_LY("Đã thanh lý");

    @JsonValue
    private final String displayName;

    TrangThaiThanhLy(String displayName) {
        this.displayName = displayName;
    }

    public static TrangThaiThanhLy fromString(String value) {
        if (value == null) return CHO_DUYET;

        for (TrangThaiThanhLy status : values()) {
            if (status.displayName.equalsIgnoreCase(value) ||
                    status.name().equalsIgnoreCase(value)) {
                return status;
            }
        }
        return CHO_DUYET;
    }
}