package com.kdt.BookVoyage.Admin;

import com.kdt.BookVoyage.Member.MemberDTO;
import com.kdt.BookVoyage.Member.MemberEntity;
import com.kdt.BookVoyage.Order.OrderDTO;
import com.kdt.BookVoyage.Order.OrderEntity;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class AdminDTO {
    private String adminId;
    private String password;


    public static List<MemberDTO> EntityToDTO(List<MemberEntity> memberEntityList) {
        List<MemberDTO> result = new ArrayList<>();
        ModelMapper modelMapper = new ModelMapper();

        for (MemberEntity memberEntity : memberEntityList) {

            MemberDTO memberDTO = modelMapper.map(memberEntity, MemberDTO.class);

            result.add(memberDTO);
        }

        return result;
    }
}
