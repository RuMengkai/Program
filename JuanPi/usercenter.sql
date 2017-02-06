/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : usercenter

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2017-02-06 10:16:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` char(20) NOT NULL,
  `mail` char(40) NOT NULL,
  `mobile` char(11) NOT NULL,
  `secret` char(20) NOT NULL,
  `name` char(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5948 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('5901', '18835113131', '874968552@qq.com', '18835113134', '18835113134', '茹孟凯2');
INSERT INTO `t_user` VALUES ('5902', '13535113134', '874968552@qq.com', '18835113134', '18835113134', '茹孟凯');
INSERT INTO `t_user` VALUES ('5945', '13800000000', '874968552@qq.com', '13800000000', '111111', '茹孟凯');
INSERT INTO `t_user` VALUES ('5946', '13870000000', '874968552@qq.com', '13870000000', '111111', '茹孟凯');
INSERT INTO `t_user` VALUES ('5947', '13811000000', '874968552@qq.com', '13811000000', '111111', '茹孟凯');
