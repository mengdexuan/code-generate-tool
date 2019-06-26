package com.iciyun.controller;

import com.iciyun.base.Result;
import com.iciyun.properties.DevtoolsProperties;
import com.iciyun.service.GenerateService;
import com.iciyun.service.TableService;
import com.iciyun.task.GenerateTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

/**
 * 代码生成控制器
 *
 * @author LIQIU
 * @Date 2017年11月30日16:39:19
 */
@RestController
@RequestMapping("/generator")
public class GeneratorController {

    @Autowired
    private TableService tableService;

    @Autowired
    private GenerateService generateService;

    @Autowired
    private DevtoolsProperties devtoolsProperties;

    /**
     * 获取环境信息
     */
    @GetMapping("/env")
    public Object blackboard() {
        HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("tables",tableService.getAllTables());
        hashMap.put("params",devtoolsProperties);
        Result result = Result.buildSuccess(hashMap);
        return result;
    }

    /**
     * 生成代码
     */
    @PostMapping("/generate")
    public Object generate(GenerateTask generateTask){
        generateService.generate(generateTask);
        return Result.buildSuccess("");
    }
}
