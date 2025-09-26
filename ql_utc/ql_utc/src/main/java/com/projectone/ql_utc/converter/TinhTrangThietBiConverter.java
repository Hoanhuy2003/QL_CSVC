package com.projectone.ql_utc.converter;

import com.projectone.ql_utc.enums.TinhTrangThietBi;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class TinhTrangThietBiConverter implements AttributeConverter<TinhTrangThietBi, String> {
    @Override
    public String convertToDatabaseColumn(TinhTrangThietBi attribute) {
        return attribute != null ? attribute.getLabel() : null; // Lưu tiếng Việt vào DB
    }

    @Override
    public TinhTrangThietBi convertToEntityAttribute(String dbData) {
        return dbData != null ? TinhTrangThietBi.fromLabel(dbData) : null; // Đọc từ DB về enum
    }
}
