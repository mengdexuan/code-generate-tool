package com.itangquan.gzhmake.biz.agent.abc.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.itangquan.gzhmake.biz.agent.abc.service.MbankBussLogService;
import com.itangquan.gzhmake.biz.agent.abc.entity.MbankBussLog;


import org.springframework.web.bind.annotation.RestController;
import com.iciyun.adi.framework.web.controller.BaseController;

/**
 * <p>
 * 任务变更或回退操作日志表 控制器
 * </p>
 *
 * @author adi
 * @since 2019-06-26
 */
@RestController
@RequestMapping("/abc/mbankBussLog")
@Api(tags = "任务变更或回退操作日志表 接口")
public class MbankBussLogController extends BaseController {

        @Autowired
        private MbankBussLogService mbankBussLogService;

        /**
         * 获取任务变更或回退操作日志表列表
         */
        @GetMapping(value = "/list")
        @ApiOperation("获取任务变更或回退操作日志表列表")
        public Result<List<MbankBussLog>> list() {
            return this.success(mbankBussLogService.findAll());
        }

        /**
         * 新增任务变更或回退操作日志表
         */
        @PostMapping(value = "/add")
        @ApiOperation("新增任务变更或回退操作日志表")
        public Result<String> add(MbankBussLog mbankBussLog) {
            mbankBussLogService.save(mbankBussLog);
            return this.success();
        }

        /**
         * 删除任务变更或回退操作日志表
         */
        @PostMapping(value = "/delete/{id}")
        @ApiOperation("删除任务变更或回退操作日志表")
        public Result<String> delete(@PathVariable("id") Long id) {
            mbankBussLogService.delete(id);
            return this.success();
        }

        /**
         * 修改任务变更或回退操作日志表
         */
        @PostMapping(value = "/update")
        @ApiOperation("修改任务变更或回退操作日志表")
        public Result<String> update(MbankBussLog mbankBussLog) {
            mbankBussLogService.update(mbankBussLog);
            return this.success();
        }

        /**
         * 获取任务变更或回退操作日志表
         */
        @GetMapping(value = "/get/{id}")
        @ApiOperation("获取任务变更或回退操作日志表")
        public Result<MbankBussLog> get(@PathVariable("id") Long id) {
            return this.success(mbankBussLogService.get(id));
        }
}

