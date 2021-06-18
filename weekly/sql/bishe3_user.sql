create table user
(
    user_id               int auto_increment
        primary key,
    user_name             varchar(20) not null,
    user_account          varchar(20) not null,
    user_phone            varchar(20) not null,
    user_sex              varchar(2)  not null,
    user_pwd              varchar(20) not null,
    user_up_department_id int         null,
    user_department_id    int         null,
    user_position_id      int         null,
    user_is_admin         int         not null,
    constraint user_account
        unique (user_account),
    constraint user_ibfk_1
        foreign key (user_up_department_id) references dept (dept_id)
            on update cascade on delete cascade,
    constraint user_ibfk_2
        foreign key (user_department_id) references dept (dept_id)
            on update cascade on delete cascade,
    constraint user_ibfk_3
        foreign key (user_position_id) references position (pos_id)
            on update cascade on delete cascade
);

create index user_position_id
    on user (user_position_id);

create index user_read_person_id
    on user (user_department_id);

create index user_role_id
    on user (user_up_department_id);

INSERT INTO bishe3.user (user_id, user_name, user_account, user_phone, user_sex, user_pwd, user_up_department_id, user_department_id, user_position_id, user_is_admin) VALUES (10000, 'super', 'admin', '000000', '男', '000000', null, 4, 8, 11);
INSERT INTO bishe3.user (user_id, user_name, user_account, user_phone, user_sex, user_pwd, user_up_department_id, user_department_id, user_position_id, user_is_admin) VALUES (10003, '黄霖', '1000', '15630175200', '男', '1000000', null, 16, 29, 1);
INSERT INTO bishe3.user (user_id, user_name, user_account, user_phone, user_sex, user_pwd, user_up_department_id, user_department_id, user_position_id, user_is_admin) VALUES (10004, '张佳楠', '2000', '15630175211', '女', '2000000', 16, 17, 15, 1);
INSERT INTO bishe3.user (user_id, user_name, user_account, user_phone, user_sex, user_pwd, user_up_department_id, user_department_id, user_position_id, user_is_admin) VALUES (10005, '孙延东', '3000', '15630175211', '男', '3000000', 16, 18, 18, 1);
INSERT INTO bishe3.user (user_id, user_name, user_account, user_phone, user_sex, user_pwd, user_up_department_id, user_department_id, user_position_id, user_is_admin) VALUES (10006, '杨子韦', '4000', '15630175211', '男', '4000000', 16, 19, 23, 1);
INSERT INTO bishe3.user (user_id, user_name, user_account, user_phone, user_sex, user_pwd, user_up_department_id, user_department_id, user_position_id, user_is_admin) VALUES (10007, '李新云', '5000', '15630175211', '女', '5000000', 16, 20, 27, 1);
INSERT INTO bishe3.user (user_id, user_name, user_account, user_phone, user_sex, user_pwd, user_up_department_id, user_department_id, user_position_id, user_is_admin) VALUES (10008, '吴艳梅', '2001', '15630175211', '女', '200001', null, 17, 15, 0);
INSERT INTO bishe3.user (user_id, user_name, user_account, user_phone, user_sex, user_pwd, user_up_department_id, user_department_id, user_position_id, user_is_admin) VALUES (10009, '贾琪琪', '2002', '15630175211', '女', '200001', null, 17, 17, 0);
INSERT INTO bishe3.user (user_id, user_name, user_account, user_phone, user_sex, user_pwd, user_up_department_id, user_department_id, user_position_id, user_is_admin) VALUES (10010, '李伟兵', '3001', '15630175211', '男', '300001', null, 18, 19, 0);
INSERT INTO bishe3.user (user_id, user_name, user_account, user_phone, user_sex, user_pwd, user_up_department_id, user_department_id, user_position_id, user_is_admin) VALUES (10011, 'melon', '3002', '15630175211', '男', '300001', null, 18, 20, 0);
INSERT INTO bishe3.user (user_id, user_name, user_account, user_phone, user_sex, user_pwd, user_up_department_id, user_department_id, user_position_id, user_is_admin) VALUES (10012, '杨博', '3003', '15630175211', '男', '300001', null, 18, 20, 0);
INSERT INTO bishe3.user (user_id, user_name, user_account, user_phone, user_sex, user_pwd, user_up_department_id, user_department_id, user_position_id, user_is_admin) VALUES (10013, '黄璐璐', '3004', '15630175211', '女', '300001', null, 18, 21, 0);
INSERT INTO bishe3.user (user_id, user_name, user_account, user_phone, user_sex, user_pwd, user_up_department_id, user_department_id, user_position_id, user_is_admin) VALUES (10014, '赵占银', '3005', '15630175211', '男', '300001', null, 18, 22, 0);
INSERT INTO bishe3.user (user_id, user_name, user_account, user_phone, user_sex, user_pwd, user_up_department_id, user_department_id, user_position_id, user_is_admin) VALUES (10015, '艾凡青', '4001', '15630175211', '女', '400001', null, 19, 24, 0);
INSERT INTO bishe3.user (user_id, user_name, user_account, user_phone, user_sex, user_pwd, user_up_department_id, user_department_id, user_position_id, user_is_admin) VALUES (10016, '杨红', '4002', '15630175211', '女', '400001', null, 19, 25, 0);
INSERT INTO bishe3.user (user_id, user_name, user_account, user_phone, user_sex, user_pwd, user_up_department_id, user_department_id, user_position_id, user_is_admin) VALUES (10017, '王瑛琦', '4003', '15630175211', '女', '400001', null, 19, 26, 0);
INSERT INTO bishe3.user (user_id, user_name, user_account, user_phone, user_sex, user_pwd, user_up_department_id, user_department_id, user_position_id, user_is_admin) VALUES (10018, '李润庭', '5001', '15630175211', '女', '500001', null, 20, 28, 0);
INSERT INTO bishe3.user (user_id, user_name, user_account, user_phone, user_sex, user_pwd, user_up_department_id, user_department_id, user_position_id, user_is_admin) VALUES (10019, '李海红', '5002', '15630175211', '女', '500001', null, 20, 28, 0);