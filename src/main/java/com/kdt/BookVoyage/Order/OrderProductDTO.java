package com.kdt.BookVoyage.Order;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class OrderProductDTO {

    private String title;

    private String author;

    private String pubDate;

    private String priceSales;

    private String priceStandard;

    private String publisher;

    private String isbn13;

    private String cover;

    private Integer amount;

    public static List<OrderProductDTO> EntityToDTO(List<OrderProductEntity> orderProductEntityList) {
        List<OrderProductDTO> result = new ArrayList<>();
        ModelMapper modelMapper = new ModelMapper();

        for (OrderProductEntity orderProductEntity : orderProductEntityList) {

            OrderProductDTO map = modelMapper.map(orderProductEntity, OrderProductDTO.class);
            result.add(map);
        }

        return result;
    }
}
