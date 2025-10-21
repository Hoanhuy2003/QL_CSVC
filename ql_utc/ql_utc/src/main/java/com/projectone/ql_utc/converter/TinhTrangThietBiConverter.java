package com.projectone.ql_utc.converter;

import com.projectone.ql_utc.enums.TinhTrangThietBi;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class TinhTrangThietBiConverter implements AttributeConverter<TinhTrangThietBi, String> {

    @Override
    public String convertToDatabaseColumn(TinhTrangThietBi attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.getDisplayName();
    }

    @Override
    public TinhTrangThietBi convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.trim().isEmpty()) {
            return TinhTrangThietBi.SAN_SANG;
        }

        try {
            return TinhTrangThietBi.fromCode(dbData);
        } catch (Exception e) {
            System.err.println("❌ Error converting TinhTrangThietBi: " + dbData);
            e.printStackTrace();
            return TinhTrangThietBi.SAN_SANG; // Fallback
        }
    }
}