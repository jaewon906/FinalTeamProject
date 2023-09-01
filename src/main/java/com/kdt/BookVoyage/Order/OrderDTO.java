package com.kdt.BookVoyage.Order;

import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class OrderDTO {

    private Long id;

    private String orderNumber;

    private String orderName;

    private String username;

    private String userAddress;

    private String userTel;

    private String userEmail;

    private Integer totalPrice;

    public static List<OrderDTO> EntityToDTO(List<OrderEntity> orderEntityList) {
        List<OrderDTO> result = new ArrayList<>();
        ModelMapper modelMapper = new ModelMapper();

        for (OrderEntity orderEntity : orderEntityList) {

            OrderDTO orderDTO = modelMapper.map(orderEntity, OrderDTO.class);
            orderDTO.setOrderName(orderEntity.getOrderProductEntity().get(0).getTitle() + " 외" + " " + (orderEntity.getOrderProductEntity().size() - 1) + "건");
            result.add(orderDTO);
        }

        return result;
    }

}
