CREATE TABLE IF NOT EXISTS assets (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT references users(id),
    size INT COMMENT '资源大小',  
    type CHAR(20) COMMENT '资源类型',
    path CHAR(255) COMMENT '资源路径',
    create_date DATETIME COMMENT '添加时间',
    PRIMARY KEY (id)
);