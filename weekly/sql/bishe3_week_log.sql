create table week_log
(
    week_id          int auto_increment
        primary key,
    week_user_id     int          not null,
    week_summery     varchar(512) null,
    week_next_week   varchar(512) null,
    week_read_status varchar(2)   not null,
    week_create_time datetime     not null,
    constraint week_log_ibfk_1
        foreign key (week_user_id) references user (user_id)
            on update cascade on delete cascade
);

create index week_user_id
    on week_log (week_user_id);

INSERT INTO bishe3.week_log (week_id, week_user_id, week_summery, week_next_week, week_read_status, week_create_time) VALUES (10, 10010, '<h1>星期二</h1><p><br></p><h1><strong>今天是周二</strong></h1><p>总结：</p><p><br></p><ol><li>代码复盘</li><li>bug修复</li><li>模块添加</li><li>自己测试</li></ol>', '<ol><li><strong>完成没有完成的测试</strong></li><li><strong>完成新的需求</strong></li></ol>', '0', '2020-05-26 01:36:12');
INSERT INTO bishe3.week_log (week_id, week_user_id, week_summery, week_next_week, week_read_status, week_create_time) VALUES (11, 10011, '<h1>星期二</h1><p><br></p><h2><strong>今日总结</strong></h2><ol><li>bug修复</li><li>完成文档阅读</li><li>完成个人中心模块</li><li>组件封装</li></ol>', '<p><span class="ql-size-huge" style="background-color: rgb(250, 204, 204);">优化webAPP打开速度</span></p>', '0', '2020-05-26 01:39:11');
INSERT INTO bishe3.week_log (week_id, week_user_id, week_summery, week_next_week, week_read_status, week_create_time) VALUES (12, 10012, '<h1>星期二</h1><p><br></p><h3 class="ql-align-justify">家长朋友们平时上班都比较忙，没有太多的时间去陪伴孩子学习，有时候心有余而力不足，请家长朋友们珍惜并利用这段特殊的亲子时光来陪伴，引导孩子学习，也请家长朋友们重视起来，积极配合老师，一起分享宝贝们的成长！</h3>', '<p><span style="color: rgb(51, 51, 51);">1、修改了定时任务选择对象实现方式，现在可以支持部门、群组、专变用户、公变用户</span></p><p><span style="color: rgb(51, 51, 51);">2、跟彭放交待电网对象实现方式与作法</span></p><p><span style="color: rgb(51, 51, 51);">3、修改了定时任务中对象类型表示方法 由原来的数字1234表达，改为 部门、群组、专变用户、公变用户</span></p>', '0', '2020-05-26 01:40:14');
INSERT INTO bishe3.week_log (week_id, week_user_id, week_summery, week_next_week, week_read_status, week_create_time) VALUES (13, 10013, '<h1>星期二</h1><p><br></p><p><strong class="ql-size-large" style="color: rgb(102, 102, 102);">班主任工作日志范文 一、基本情况 本班有男生 19 人，女生 30 人，共 49。全班各科平均分：语文 76.5，数学 57，英语 57，总的来说，这个班的学业成绩是比较低 的，而且也不及 1 班的学业成绩好。 但是这个班很多学生的家庭背景都是比较好的，从小就参加艺术 培训，到目前为止很多学生都是艺术特长生，非常有才华，而且要 经常在父母的陪同</strong></p>', '<p>没有</p>', '0', '2020-05-26 01:41:17');
INSERT INTO bishe3.week_log (week_id, week_user_id, week_summery, week_next_week, week_read_status, week_create_time) VALUES (14, 10014, '<h1>星期二</h1><p><br></p><ol><li><span class="ql-size-large" style="color: rgb(230, 0, 0);">办公室人员工作日志 姓名：宋海龙 部门： 综合办公室 岗位：劳资员、文书 本周工作总结 项目名称 时间段： 计划完成时间 实际完成时间 工作内容 备注 已完成工作 未完成工作 下周工作计划 序号 1 2 3 4 时间段： 计划完成时间 项目名称 工作内容 备注 记录日期 今日要 务/计划 工作记 录 时间段 工作类别 工作内容&nbsp;</span></li></ol>', '<p><span style="color: rgb(102, 102, 102);">办公室人员工作日志 姓名：宋海龙 部门： 综合办公室 岗位：劳资员、文书 本周工作总结 项目名称 时间段： 计划完成时间 实际完成时间 工作内容 备注 已完成工作 未完成工作 下周工作计划 序号 1 2 3 4 时间段： 计划完成时间 项目名称 工作内容 备注 记录日期 今日要 务/计划 工作记 录 时间段 工作类别 工作内容&nbsp;</span></p>', '0', '2020-05-26 01:41:51');
INSERT INTO bishe3.week_log (week_id, week_user_id, week_summery, week_next_week, week_read_status, week_create_time) VALUES (15, 10004, '<h1>星期二</h1><p><br></p><h1><span style="color: rgb(102, 102, 102);">安保处）工作日志 2018 年 3 月 3 日 星期六 项 目 工 姓 名 吴永强 1、 2、 3、 发放安全目标责任书； 校园安全巡逻； 检查学生报道情况 作 任 务 备 注 （安保处）工作日志 2018 年 3 月 4 日 星期日 项 目 工 姓 名 吴永强 1、 2、 3、 检查学生宿舍； 印制晨午检及消毒记录表册 校园安全巡逻。 作&nbsp;</span></h1>', '<p><span style="color: rgb(102, 102, 102);">安保处）工作日志 2018 年 3 月 3 日 星期六 项 目 工 姓 名 吴永强 1、 2、 3、 发放安全目标责任书； 校园安全巡逻； 检查学生报道情况 作 任 务 备 注 （安保处）工作日志 2018 年 3 月 4 日 星期日 项 目 工 姓 名 吴永强 1、 2、 3、 检查学生宿舍； 印制晨午检及消毒记录表册 校园安全巡逻。 作&nbsp;</span></p>', '1', '2020-05-26 01:43:30');
INSERT INTO bishe3.week_log (week_id, week_user_id, week_summery, week_next_week, week_read_status, week_create_time) VALUES (16, 10006, '<h1>星期二</h1><p><br></p><h2><span style="background-color: rgb(0, 0, 0); color: rgb(255, 255, 255);">全球化的缺点： ? 经济上，发展中国家的劳动力被剥削，资源被取用，而产品却不能够进 人发达国家，国内产业受到外商和外企的冲击； ?社会上，外国的产品流人 一个国家， 会改变人们的生活习惯和购买习惯； 年轻人比较喜欢外同产品， 比如说食品、衣服、电子产品和娱乐方式； ? 文化上，本土文化会被削弱，本土语言会受到威胁，文</span></h2>', '<h3><span style="color: rgb(255, 255, 255); background-color: rgb(102, 163, 224);">全球化的缺点： ? 经济上，发展中国家的劳动力被剥削，资源被取用，而产品却不能够进 人发达国家，国内产业受到外商和外企的冲击； ?社会上，外国的产品流人 一个国家， 会改变人们的生活习惯和购买习惯； 年轻人比较喜欢外同产品， 比如说食品、衣服、电子产品和娱乐方式； ? 文化上，本土文化会被削弱，本土语言会受到威胁，文全球化的缺点： ? 经济上，发展中国家的劳动力被剥削，资源被取用，而产品却不能够进 人发达国家，国内产业受到外商和外企的冲击； ?社会上，外国的产品流人 一个国家， 会改变人们的生活习惯和购买习惯； 年轻人比较喜欢外同产品， 比如说食品、衣服、电子产品和娱乐方式； ? 文化上，本土文化会被削弱，本土语言会受到威胁，文</span></h3>', '1', '2020-05-26 01:44:20');
INSERT INTO bishe3.week_log (week_id, week_user_id, week_summery, week_next_week, week_read_status, week_create_time) VALUES (18, 10005, '<h1>星期日</h1><p><br></p><p>测试</p>', '<p>测试</p>', '0', '2020-06-07 11:12:23');
INSERT INTO bishe3.week_log (week_id, week_user_id, week_summery, week_next_week, week_read_status, week_create_time) VALUES (19, 10011, '<h1>星期日</h1><p><br></p><p>测试</p>', '<p>测试测试测试</p>', '1', '2020-06-07 11:13:24');