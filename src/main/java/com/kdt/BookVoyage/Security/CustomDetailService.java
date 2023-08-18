//package com.finalproject.Security;
//
//import com.finalproject.Member.MemberDTO;
//import com.finalproject.Member.MemberEntity;
//import com.finalproject.Member.MemberRepository;
//import lombok.RequiredArgsConstructor;
//import org.modelmapper.ModelMapper;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Component;
//
//import javax.management.relation.Role;
//import java.util.ArrayList;
//import java.util.Collection;
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//@RequiredArgsConstructor
//@Component
//public class CustomDetailService implements UserDetailsService {
//
//    private final MemberRepository memberRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
//
//        List<Role> roles = new ArrayList<>();
//        Optional<MemberEntity> byUserId = memberRepository.findByUserId(userId);
//        ModelMapper modelMapper = new ModelMapper();
//
//        if(byUserId.isPresent()){
//
//            MemberDTO memberDTO = MemberDTO.EntityToDTO(byUserId.get());
//
//            roles.add(modelMapper.map(memberDTO.getUserRole(),Role.class));
//
//            return new User(memberDTO.getUserId(), memberDTO.getPassword(),  authorities(roles));
//        }
//        else throw new UsernameNotFoundException("해당하는 id가 없습니다.");
//    }
//
//    private Collection<GrantedAuthority> authorities(List<Role> roles) {
//        return roles.stream().map( role -> new SimpleGrantedAuthority(role.getRoleName())).collect(Collectors.toList());
//
//    }
//}
