package com.kdt.BookVoyage.Order;

import com.kdt.BookVoyage.Member.MemberEntity;
import lombok.Builder;
import lombok.Getter;

import java.util.List;


@Getter
//@Setter
@Builder
public class OrderDetailDTO {

   private String orderNumber;

   private String orderName;

   private String orderState;

   private String orderStart;

   private String orderEnd;

   private String deliveryDiscount;

   private String deliveryAddress;

   private String receiverName;

   private String receiverAddress;

   private String receiverTel;

   private String payTotal;

   private String payMethod;

   private String deliveryPay;

   private String deliveryPayDiscount;

   private String memberDiscount;

   private String couponDiscount;

   private String finalPay;

   private String customerId;

   private String customerName;

   private String customerEmail;

   private String customerTel;

   private List<OrderProductDTO> orderProductDTOList;

   public static OrderDetailDTO getOrderDetailDTO(MemberEntity memberEntity, List<OrderProductEntity> orderProductEntity, OrderEntity orderEntity) {
      return OrderDetailDTO.builder()
              .orderNumber(orderEntity.getOrderNumber())
              .orderName(orderEntity.getOrderName())
              .orderState(orderEntity.getOrderState())
              .receiverAddress(orderEntity.getUserAddress())
              .orderStart(orderEntity.getDeliveryStart().split("T")[0])
              .orderEnd(orderEntity.getDeliveryEnd().split("T")[0])
              .deliveryDiscount("0")
              .deliveryAddress(memberEntity.getUserAddress())
              .receiverName(memberEntity.getUsername())
              .receiverTel(memberEntity.getUserTel())
              .payTotal(orderEntity.getTotalPrice())
              .payMethod("신용카드")
              .deliveryPay("0")
              .deliveryPayDiscount("0")
              .memberDiscount("0")
              .couponDiscount("0")
              .finalPay(orderEntity.getTotalPrice())
              .customerId(memberEntity.getUserId())
              .customerName(memberEntity.getUsername())
              .customerTel(memberEntity.getUserTel())
              .customerEmail(memberEntity.getUserEmail())
              .orderProductDTOList(OrderProductDTO.EntityToDTO(orderProductEntity))
              .build();
   }

}
