CREATE DATABASE  IF NOT EXISTS `pocketponics` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `pocketponics`;
-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: localhost    Database: pocketponics
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `active_sessions`
--

LOCK TABLES `active_sessions` WRITE;
/*!40000 ALTER TABLE `active_sessions` DISABLE KEYS */;
INSERT INTO `active_sessions` VALUES ('+5y+kyqL6vANwTwSGccRU2B1TwOQajtkH3ABeBL86RI=','2020-01-27 23:20:39',19),('4+CzeAQ9Li9CYlQoR7QosrDysRONCwr6hNjTmXp7+Hk=','2020-01-27 23:53:12',19),('43jxeT1meDlpKZGZKgvNh0XVinDAZkx65Wif4zC4meM=','2020-01-27 23:45:57',19),('4kR1ucshoHCVxpkS86DfmVO1ikw0ZIEURZUahiNsckc=','2020-01-27 23:01:47',19),('8hUr9oGxI+rOJ9DjQ6Sb83Pn60all5SnNgOg1LLIj7s=','2020-01-27 23:22:48',19),('909BOyB16SaXM7MoF9sXIilPzm1Wymg/cHtL+sxxd8U=','2020-01-27 23:48:53',19),('A5f5JFmVXg7UVuVPq0YEeOLgYrSXIvNX6/hXdiMA9L0=','2020-01-27 23:21:55',19),('a5SIP+zh0KIiQBYA7WcFXCaAepuLF77QP5TJk1v0aCU=','2020-01-27 23:49:01',19),('Agbd4A5PT4DAI9rbtjBo1cmpCLqzMavnfz3dxvdpqAs=','2020-01-27 23:28:34',19),('aUylRTsenoYQD4Y7fKo4Skf99I70QjfQ6X1o0xwWQkk=','2020-01-27 23:57:58',19),('boXuPQnKJjstiq0c413UDgzmTX7Qr4avWZmrKWv2l1g=','2020-01-27 23:55:00',19),('c0dgDuQ1dQOosowaS4DlJH1Lgai5qvyKM//6EIm9RK0=','2020-01-29 21:42:37',19),('c2M2C4PA+YNNzuSUtEqY9w/v5gkjh0me2qlloA/qMII=','2020-01-28 00:10:36',19),('cUeMFxcRL5e6AuY0Q3LUKj8kZ+f/6Zl//x8zyQ8KL3Y=','2020-01-27 23:38:48',19),('diUftY7Axx1RE4E9jMKTSWO8Cf0K4NbydqnJtltP6WY=','2020-01-28 00:12:08',19),('dTkqTwsb3Co7/M/oT9OeZeH2GV5aiAmMK2y+2aQy21c=','2020-01-27 23:44:09',19),('EACOVmzNX8cOJxz7rdxwHMjaQ9HExzxgQfpta9xwsfM=','2020-01-27 23:44:30',19),('Eqoqi7qh8/6UFHHGI5M4KvbjpvlxUqJQf4RjMyC+tpY=','2020-01-27 23:46:46',19),('eqtkQFm5oQd2AdZUqVX14LZ/Yc6IToEapQcDWcUaORY=','2020-01-29 21:32:07',19),('fKZ2RnLy/k3fhe3sycc/zPS9jqzfebkk4IJ9ik8xnWg=','2020-01-27 23:19:00',19),('fzRzISS5RKzLi1btFnggp6JzJbm5OdnlobzAKZeR6Ug=','2020-01-27 23:26:49',19),('gje3tQfWyIg0NzYm4gwVrY056YI/gyE3bNqw4CzWp9s=','2020-01-27 23:42:49',19),('gXirGMyzAUkhXPw1CZLAAeQ5DcA5n50Ou2dJIU+L+8o=','2020-01-27 23:19:08',19),('HKXlSbtpYbezs2eevxG2bW/4krzRnADQOi/fct52dqA=','2020-01-27 23:15:45',19),('JMghL/n7YQR4usk6AaSowatpBDO55gqqghDe3tZpKgo=','2020-01-27 23:15:08',19),('K+5pVyNgG2nRX1ITrUZGK29LwMw8yYN2jK9RcATqGzc=','2020-01-29 21:39:07',19),('kmmX5FwjiPhDQrevEwd9Cl4yTKuJYauHNSLHSrjffno=','2020-01-27 23:54:43',19),('LHkNLMYvl13QCpv8rcXTImHl9y2TwoN1nJhr/+fqkJU=','2020-01-27 23:15:51',19),('LTmpu9GA19JrOvuyc+9U2LdaDZqv68FhVRvc3qFJkUE=','2020-01-27 23:02:37',19),('LWKMDscMPBWpN3bjPSdskTUdymtQIxsCeIncl+cGPjg=','2020-01-28 00:10:25',19),('NquzgHKdczFCBhC4F/GU3zIGwyNZ2OvK7ETTm52lslY=','2020-01-27 23:23:13',19),('ntMiZo6QyeOv27v5ZevrNHdnRci3GeTY8J3e3VJlCTw=','2020-01-28 00:18:05',19),('oAmMLYxsP9h/OyCQ+3KeJ5qe2Couo5hFZZqKz7EoPu0=','2020-01-28 00:17:48',19),('pE8s1zRtRK/jkEBUg0qZs8xv3dNZogMqzCUHgiYzzAU=','2020-01-27 23:40:07',19),('Q6bqGbA910VIOMPA/DAQTXIj3LvEJxsYfpUITszp2Qg=','2020-01-27 23:34:46',19),('q9jNiDqWBPdS0+XXdwvmzltdFyCyCqN0VhC+VY8Sg8U=','2020-01-27 22:53:58',18),('rWhqNv57zN3rIL+Hu0ZEsiY+bm3Lo3JKUweyiiJDUZo=','2020-01-27 23:03:45',19),('Sf0Ie8H9Bm46WtR06DHo3n3OA+XrymOSI9aLTLs709Q=','2020-01-27 23:03:22',19),('sV3eweV7in4EHBM/NenzQBfsnNFHdJ6MrsT53xVw9F4=','2020-01-27 23:51:07',19),('TZZceajHoVz5RViNVh//UhEonge2uIbPM3yKiQq30lU=','2020-01-29 21:39:46',19),('UgrbJiTxKfHoGKFg95BG06q2qUHK2Op6Y7AcJuJFiuE=','2020-01-27 23:22:18',19),('uiJAvP5dSDhk0uzTqkmlbQLlShhaF0EbWnQqBJvzoHA=','2020-01-27 23:16:59',19),('V6wBZGiVaZwndrVdnn+0llSAJTccxtgUOSvgCF3NGvY=','2020-01-27 22:57:22',19),('ViDtKKRUzFqYP6kte9C3nC+Cp4wC/LtF279GrILelWU=','2020-01-27 23:02:58',19),('woXLOZT+DMr0fdvWoYRtAPLSAY5Tr8hbA2Y99ru42eY=','2020-01-27 23:36:41',19),('wQe47h5651H5JXoSEokI7qOQFT7R7tDq88ZKNlBuSGU=','2020-01-27 22:44:24',17),('wUmT/8AcjBNwHXhzWeX6rC+vDRSUrrHB6sFn3oNwimY=','2020-01-27 23:21:15',19),('zeAnb+Mvu4bT1L3vIM5fdNwiQsVz3Ywh7XwY7i67+L4=','2020-01-27 23:44:56',19);
/*!40000 ALTER TABLE `active_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `greenhouse`
--

LOCK TABLES `greenhouse` WRITE;
/*!40000 ALTER TABLE `greenhouse` DISABLE KEYS */;
INSERT INTO `greenhouse` VALUES (1,'herewbanana',0.00,0.00,0.00,'2020-01-12',0,0.00,19);
/*!40000 ALTER TABLE `greenhouse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `historical_data`
--

LOCK TABLES `historical_data` WRITE;
/*!40000 ALTER TABLE `historical_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `historical_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `plant_ideal`
--

LOCK TABLES `plant_ideal` WRITE;
/*!40000 ALTER TABLE `plant_ideal` DISABLE KEYS */;
INSERT INTO `plant_ideal` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'empty',NULL,NULL,NULL,NULL,NULL),(2,6.00,2.00,0.00,65,6.50,4.00,0.00,'Green Beans',12,NULL,NULL,NULL,8),(3,5.50,1.80,0.00,60,6.60,2.30,0.00,'Spinach',10,NULL,NULL,NULL,18),(4,13.00,13.00,13.00,13,13.00,13.00,13.00,'what',13,'the quick brown, asdfasdf','https://www.google.com','234',0),(5,5.50,2.00,0.00,84,6.50,5.00,0.00,'Tomato',10,NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `plant_ideal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sensor_grid`
--

LOCK TABLES `sensor_grid` WRITE;
/*!40000 ALTER TABLE `sensor_grid` DISABLE KEYS */;
INSERT INTO `sensor_grid` VALUES ('19977991','$2b$10$5GX0WYujPSNLCwLJqLrxAOfrIhyDHWTi1alNqDZsAT.zvIj/8AYLS',19,1);
/*!40000 ALTER TABLE `sensor_grid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tiers`
--

LOCK TABLES `tiers` WRITE;
/*!40000 ALTER TABLE `tiers` DISABLE KEYS */;
INSERT INTO `tiers` VALUES (1,5,0.00,0.00,0.00,'2020-01-28',10,1,19),(2,2,0.00,0.00,0.00,'2020-01-28',10,1,19),(3,2,0.00,0.00,0.00,'2020-01-28',10,1,19),(4,4,0.00,0.00,0.00,'2020-01-28',10,1,19);
/*!40000 ALTER TABLE `tiers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (17,'rohanpatel5753@knights.ucf.edu','$2b$10$cfEDA/Heq.B20Yr1mPg17uM/s8GKoQ7OWsAV.dcSD1OXTKUgHRZRi',1),(18,'test@knights.ucf.edu','$2b$10$yFkEgHLeiZ9AdXkzxUUvROgylUQMt4VAMYBl5CmB3uoahr7yrkZ.a',0),(19,'test4@gmail.com','$2b$10$3vieOFJio7mI.xN1AwTs7uXE7cTW.rpsR.WLiOF5IJk9amFFUxiiW',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-29 16:18:17
