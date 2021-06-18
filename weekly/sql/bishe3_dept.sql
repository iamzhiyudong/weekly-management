create table dept
(
    dept_id        int auto_increment
        primary key,
    dept_name      varchar(20) not null,
    dept_admin_id  int         null,
    dept_parent_id int         null,
    constraint dept_ibfk_1
        foreign key (dept_admin_id) references user (user_id)
            on update cascade on delete cascade
);

create index dept_admin_id
    on dept (dept_admin_id);

INSERT INTO bishe3.dept (dept_id, dept_name, dept_admin_id, dept_parent_id) VALUES (4, '管理员', 10000, 0);
INSERT INTO bishe3.dept (dept_id, dept_name, dept_admin_id, dept_parent_id) VALUES (16, 'XX公司总部', 10003, null);
INSERT INTO bishe3.dept (dept_id, dept_name, dept_admin_id, dept_parent_id) VALUES (17, '运营部', null, 16);
INSERT INTO bishe3.dept (dept_id, dept_name, dept_admin_id, dept_parent_id) VALUES (18, '技术部', null, 16);
INSERT INTO bishe3.dept (dept_id, dept_name, dept_admin_id, dept_parent_id) VALUES (19, '调研部', null, 16);
INSERT INTO bishe3.dept (dept_id, dept_name, dept_admin_id, dept_parent_id) VALUES (20, '产品部', null, 16);