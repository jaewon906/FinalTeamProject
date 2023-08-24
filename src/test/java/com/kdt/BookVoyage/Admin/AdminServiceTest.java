package com.kdt.BookVoyage.Admin;

import com.kdt.BookVoyage.Member.MemberEntity;
import com.kdt.BookVoyage.Member.MemberRepository;
import com.kdt.BookVoyage.Member.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestConstructor;


import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@SpringBootTest
@RequiredArgsConstructor
@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
@Slf4j
public class AdminServiceTest {

    private final MemberServiceImpl memberService;
    private final MemberRepository memberRepository;

    @Test
    public void getTotalSummary() {

        List<MemberEntity> all = memberRepository.findAll();

        long eightDays = 8 * 24 * 3600 * 1000;
        long oneDay = 24 * 3600 * 1000;

        int a[] = new int[8];

        long now = new Timestamp(System.currentTimeMillis()).getTime();
        long sevenDaysAgo = now - eightDays; // 현재 기준 7일 전

        String split = new Timestamp(sevenDaysAgo).toString().split(" ")[0];

        long sevenDaysAgo_0Hour = Timestamp.valueOf(split + " " + "00:00:00").getTime(); // 현재 기준 7일 전 00시 00분 00초

        for (int j =0; j < all.size()-1; j++) {

            long signUpDate = all.get(j).getTimeBaseEntity().getCreatedTime().getTime();

            for (int i = 1; i <= 8; i++) {
                if (signUpDate >= i * oneDay + sevenDaysAgo_0Hour && signUpDate < (i+1) * oneDay + sevenDaysAgo_0Hour) {// 7일전 00시 00분 00초 ~ 23시 59분 59초
                    a[i-1]++;
                }
            }
        }

        log.info("{}", Arrays.toString(a));

        List<Integer> result = new ArrayList<>();
        result.add(all.size());
        result.add(a[0]);
        result.add(a[1]);
        result.add(a[2]);
        result.add(a[3]);
        result.add(a[4]);
        result.add(a[5]);
        result.add(a[6]);
        result.add(a[7]);


    }
}
