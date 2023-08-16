package com.finalproject.Common;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean(name = "EmailExecutor")
    public Executor threadPoolTaskExecutor(){

        ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();

        int CORE_POOL_SIZE = 4;
        taskExecutor.setCorePoolSize(CORE_POOL_SIZE); // 최초 동작 시에 corePoolSize만큼 스레드가 생성하여 사용된다.
        int MAX_POOL_SIZE = 10;
        taskExecutor.setMaxPoolSize(MAX_POOL_SIZE);// Queue 사이즈 이상의 요청이 들어오게 될 경우, 스레드의 개수를 MaxPoolSize만큼 늘린다.
        int QUEUE_CAPACITY = 100_000;
        taskExecutor.setQueueCapacity(QUEUE_CAPACITY); //CorePoolSize 이상의 요청이 들어올 경우, LinkedBlockingQueue에서 대기하게 되는데 그 Queue의 사이즈를 지정해주는 것
        taskExecutor.setThreadNamePrefix("Executor-");

        return taskExecutor;
    }
}