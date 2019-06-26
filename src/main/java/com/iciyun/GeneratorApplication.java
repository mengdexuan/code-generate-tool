package com.iciyun;

import com.iciyun.properties.DevtoolsProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

/**
 * @author LIQIU
 * @date 2018-3-13
 **/
@SpringBootApplication
@EnableConfigurationProperties(DevtoolsProperties.class)
@EnableAutoConfiguration
public class GeneratorApplication {

    public static void main(String[] args){
        SpringApplication.run(GeneratorApplication.class,args);
    }
}
