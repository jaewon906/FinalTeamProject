package com.kdt.BookVoyage.Admin;

import com.kdt.BookVoyage.Member.MemberEntity;
import com.kdt.BookVoyage.Member.MemberRepository;
import com.kdt.BookVoyage.Member.MemberRepositoryTest;
import com.kdt.BookVoyage.Member.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestConstructor;


import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;


@SpringBootTest
@RequiredArgsConstructor
@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
@Slf4j
public class AdminServiceTest {


    private final MemberRepository memberRepository;
    private final MemberRepositoryTest memberRepositoryTest;

//    @Test
//    public void getTotalSummary() {
//
//        List<MemberEntity> all = memberRepository.findAll();
//
//        long eightDays = 8 * 24 * 3600 * 1000;
//        long oneDay = 24 * 3600 * 1000;
//
//        int a[] = new int[8];
//
//        long now = new Timestamp(System.currentTimeMillis()).getTime();
//        long sevenDaysAgo = now - eightDays; // 현재 기준 7일 전
//
//        String split = new Timestamp(sevenDaysAgo).toString().split(" ")[0];
//
//        long sevenDaysAgo_0Hour = Timestamp.valueOf(split + " " + "00:00:00").getTime(); // 현재 기준 7일 전 00시 00분 00초
//
//        for (int j =0; j < all.size()-1; j++) {
//
//            long signUpDate = all.get(j).getTimeBaseEntity().getCreatedTime().getTime();
//
//            for (int i = 1; i <= 8; i++) {
//                if (signUpDate >= i * oneDay + sevenDaysAgo_0Hour && signUpDate < (i+1) * oneDay + sevenDaysAgo_0Hour) {// 7일전 00시 00분 00초 ~ 23시 59분 59초
//                    a[i-1]++;
//                }
//            }
//        }
//
//        log.info("{}", Arrays.toString(a));
//
//        List<Integer> result = new ArrayList<>();
//        result.add(all.size());
//        result.add(a[0]);
//        result.add(a[1]);
//        result.add(a[2]);
//        result.add(a[3]);
//        result.add(a[4]);
//        result.add(a[5]);
//        result.add(a[6]);
//        result.add(a[7]);
//
//
//    }

/*    @Test
    public void 시간을_기준으로_멤버수_나누기() {
        List<MemberEntity> all = memberRepository.findAll();
        Map<String, Integer> result = new HashMap<>();

        long fifteenDays = 15 * 24 * 3600 * 1000;
        long oneDay = 24 * 3600 * 1000;

        int a[] = new int[15];

        long now = new Timestamp(System.currentTimeMillis()).getTime();
        long fifteenDaysAgo = now - fifteenDays; // 현재 기준 15일 전

        String split = new Timestamp(fifteenDaysAgo).toString().split(" ")[0];

        Timestamp fifteenDaysAgo_0Hour = Timestamp.valueOf(split + " " + "00:00:00");// 현재 기준 15일 전 00시 00분 00초


        for (int i = 1; i <= 15; i++) {
            LocalDateTime localDateTime = fifteenDaysAgo_0Hour.toLocalDateTime();
            List<MemberEntity> 멤버수찾기 = memberRepositoryTest.멤버수찾기(localDateTime, localDateTime.plusDays(i));
            a[i-1]=멤버수찾기.size();
        }

        assertEquals("",a);

//        memberRepositoryTest.멤버수찾기();

    }*/
}
