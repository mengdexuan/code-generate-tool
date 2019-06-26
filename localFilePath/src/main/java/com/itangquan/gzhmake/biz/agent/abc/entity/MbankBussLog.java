package com.itangquan.gzhmake.biz.agent.abc.entity;

import lombok.Data;
import lombok.experimental.Accessors;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * <p>
 * 任务变更或回退操作日志表
 * </p>
 *
 * @author adi
 * @since 2019-06-26
 */
@Data
@Accessors(chain = true)
@Entity
@Table(name = "mbank_buss_log")
public class MbankBussLog {

    @Id
    @GeneratedValue
    private Long id;
    /**
     * 操作人ID
     */
    private Long operId;
    /**
     * 操作用户名
     */
    private String operName;
    /**
     * 任务编码
     */
    private String taskCode;
    /**
     * 任务状态
     */
    private String taskStatus;
    /**
     * 日志类型 10 任务变更 ， 20 任务回退
     */
    private Integer logType;
    /**
     * 日志内容
     */
    private String content;
    /**
     * 操作时间
     */
    private Date createTime;


}
