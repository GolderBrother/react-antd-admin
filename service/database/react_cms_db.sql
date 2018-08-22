/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : react_cms_db

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2018-08-22 23:56:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `c_user`
-- ----------------------------
DROP TABLE IF EXISTS `c_user`;
CREATE TABLE `c_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(20) NOT NULL COMMENT '用户名',
  `password` varchar(50) DEFAULT '123' COMMENT '密码',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `u⁯id` varchar(20) DEFAULT NULL COMMENT '用户id',
  `telephone` varchar(50) DEFAULT NULL COMMENT '手机号',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of c_user
-- ----------------------------
INSERT INTO `c_user` VALUES ('1', 'james', 'a34462b26a0d9dd8288c278411f75ca2', '2018-05-12 16:08:02', '2018-07-06 22:08:37', null, '18450087586');
INSERT INTO `c_user` VALUES ('7', 'test', '4087168f0e188bf4f3c09d116cd35820', '2018-05-12 16:08:48', '2018-08-12 22:19:52', null, '18450087586');
INSERT INTO `c_user` VALUES ('8', 'robin', 'd772395d080e0c94558f1ad13dcd8aac', '2018-05-12 16:14:24', '2018-05-12 16:14:24', null, '18450087586');
INSERT INTO `c_user` VALUES ('9', 'admin', '6ff7a30292d84352262c1c8a44c9f2b0', '2018-07-05 23:25:06', '2018-07-05 23:25:06', null, '18450087580');
INSERT INTO `c_user` VALUES ('10', 'test123', '6c3341e8f4683feecfa7c7a362724dab', '2018-08-12 22:08:28', '2018-08-12 22:08:28', null, '155555555555');
INSERT INTO `c_user` VALUES ('11', 'guest', '0e9e28eea5f75d63f63beb9b4264c2ba', '2018-08-12 22:21:50', '2018-08-12 22:21:50', null, '18450087585');

-- ----------------------------
-- Event structure for `changePwd`
-- ----------------------------
DROP EVENT IF EXISTS `changePwd`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` EVENT `changePwd` ON SCHEDULE AT '2018-05-13 00:03:16' ON COMPLETION NOT PRESERVE ENABLE DO update c_user set password = 'd772395d080e0c94558f1ad13dcd8aac' where username = 'james'
;;
DELIMITER ;
