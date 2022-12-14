-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: eu-cdbr-west-03.cleardb.net    Database: heroku_9455676366be2ce
-- ------------------------------------------------------
-- Server version	5.6.50-log

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
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversations` (
  `conversationId` int(11) NOT NULL AUTO_INCREMENT,
  `senderId` varchar(90) NOT NULL,
  `receiverId` varchar(90) NOT NULL,
  `creationTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`conversationId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
INSERT INTO `conversations` VALUES (1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','wbNhjRdPvvtAnN7824QRarh0bAkBT8','2022-09-01 12:06:35'),(2,'YLaP2EH1GWeITV55qbQnAfttn6fdT5','y9teVKEjllkQt1OqCkeyA2tKCVxst4','2022-09-01 12:13:27');
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likesproduct`
--

DROP TABLE IF EXISTS `likesproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likesproduct` (
  `idlikesProduct` int(11) NOT NULL AUTO_INCREMENT,
  `key_id` varchar(90) NOT NULL,
  `product_id` int(11) NOT NULL,
  `likedislike` tinyint(4) NOT NULL DEFAULT '0',
  `creationTimestamp` datetime NOT NULL,
  PRIMARY KEY (`idlikesProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likesproduct`
--

LOCK TABLES `likesproduct` WRITE;
/*!40000 ALTER TABLE `likesproduct` DISABLE KEYS */;
INSERT INTO `likesproduct` VALUES (3,'y9teVKEjllkQt1OqCkeyA2tKCVxst4',65,1,'2022-09-07 11:37:43'),(5,'y9teVKEjllkQt1OqCkeyA2tKCVxst4',63,0,'2022-09-07 12:05:01'),(6,'y9teVKEjllkQt1OqCkeyA2tKCVxst',63,1,'2022-09-07 12:32:28'),(7,'wbNhjRdPvvtAnN7824QRarh0bAkBT8',65,1,'2022-09-07 15:19:04'),(8,'wbNhjRdPvvtAnN7824QRarh0bAkBT8',64,1,'2022-09-07 15:53:16'),(9,'wbNhjRdPvvtAnN7824QRarh0bAkBT8',63,0,'2022-09-07 16:59:19'),(10,'wbNhjRdPvvtAnN7824QRarh0bAkBT8',67,1,'2022-09-07 16:59:51'),(11,'wbNhjRdPvvtAnN7824QRarh0bAkBT8',66,0,'2022-09-07 17:00:15'),(12,'wbNhjRdPvvtAnN7824QRarh0bAkBT8',1,0,'2022-09-07 17:03:00'),(13,'y9teVKEjllkQt1OqCkeyA2tKCVxst4',64,0,'2022-09-08 10:12:58'),(14,'wbNhjRdPvvtAnN7824QRarh0bAkBT8',73,1,'2022-09-08 17:01:24'),(15,'rr1H3rwd8sgnTZCMeJ8in1rHA3cByO',65,1,'2022-10-04 10:40:28'),(16,'rr1H3rwd8sgnTZCMeJ8in1rHA3cByO',64,1,'2022-10-04 10:40:31'),(17,'rr1H3rwd8sgnTZCMeJ8in1rHA3cByO',66,0,'2022-10-04 10:40:36'),(18,'rr1H3rwd8sgnTZCMeJ8in1rHA3cByO',77,1,'2022-10-09 16:27:17'),(19,'wbNhjRdPvvtAnN7824QRarh0bAkBT8',77,1,'2022-10-09 21:34:12'),(21,'wbNhjRdPvvtAnN7824QRarh0bAkBT8',76,1,'2022-10-10 19:22:16'),(31,'wbNhjRdPvvtAnN7824QRarh0bAkBT8',75,1,'2022-10-10 19:22:29');
/*!40000 ALTER TABLE `likesproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `conversationId` int(11) NOT NULL,
  `senderId` varchar(60) NOT NULL,
  `text` text NOT NULL,
  `creationTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','hey Admin im noAdmin','2022-09-01 12:50:38'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','hey noAdmin im Admin','2022-09-01 12:52:20'),(2,'YLaP2EH1GWeITV55qbQnAfttn6fdT5','hey noAdmin im Samir','2022-09-01 12:54:58'),(2,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','hey Samir im noAdmin','2022-09-01 12:55:25'),(1,'PSjKTkT4rZxvwjCL8x2ehx1r02dtJl','hey im sam','2022-09-01 14:43:50'),(1,'PSjKTkT4rZxvwjCL8x2ehx1r02dtJl','my scd msg','2022-09-01 14:46:49'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','hello','2022-09-05 08:51:37'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','hello my name is admin','2022-09-05 08:53:40'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','hello my name is admin2','2022-09-05 08:55:47'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','hello my name is admin2','2022-09-05 08:55:52'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','tes from admin','2022-09-05 08:58:48'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','tes from admin2','2022-09-05 09:00:25'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','test again','2022-09-05 09:00:56'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','yes i do it','2022-09-05 09:08:56'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','anything admin','2022-09-05 09:16:35'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','anything admin','2022-09-05 09:17:25'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','anything admin','2022-09-05 09:18:48'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','anything adminmmm','2022-09-05 09:21:33'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','hshshshs','2022-09-05 09:24:53'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','hshshshs','2022-09-05 09:25:39'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','hshshshshhhh','2022-09-05 09:27:44'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','hshshshshhhh','2022-09-05 09:29:52'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','res /text','2022-09-05 09:31:15'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','response ;','2022-09-05 09:31:53'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','response use affect','2022-09-05 09:34:10'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','gsgsggs','2022-09-05 09:38:39'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','kkksss\n','2022-09-05 09:39:47'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','lqlqll88555','2022-09-05 09:41:23'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','message no admin','2022-09-05 09:47:42'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','yes here','2022-09-05 09:49:41'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','yes here','2022-09-05 09:50:16'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','kkksksks','2022-09-05 09:56:34'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','use this','2022-09-05 09:57:06'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','firfox','2022-09-05 10:23:47'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','d','2022-09-05 12:10:20'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','xx','2022-09-05 12:10:59'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','hhhhhh','2022-09-05 12:31:12'),(2,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','nnnn','2022-09-05 12:32:04'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','nice','2022-09-05 12:32:23'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','ccc','2022-09-05 12:34:38'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','sd','2022-09-05 12:35:23'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','dddd','2022-09-05 12:36:40'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','socket  no admin','2022-09-05 12:40:26'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','','2022-09-05 12:44:31'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','kksksks','2022-09-05 12:47:03'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','admin','2022-09-05 12:47:20'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','admin2','2022-09-05 12:48:04'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','to no admin','2022-09-05 12:52:45'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','to non admin 2','2022-09-05 12:53:27'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','last test','2022-09-05 15:20:56'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','nnn','2022-09-05 15:21:14'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','hh','2022-09-06 07:31:14'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','hello','2022-09-06 07:53:04'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','hi','2022-09-06 07:53:27'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','ddd','2022-09-06 07:53:42'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','yes','2022-09-06 08:10:32'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','let receiver','2022-09-06 08:21:53'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','log data','2022-09-06 08:23:52'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','yes','2022-09-06 08:24:17'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','it works','2022-09-06 08:26:12'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','it work i said','2022-09-06 08:26:35'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','yes','2022-09-06 08:26:56'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','no   ddbbdbdbd','2022-09-06 08:28:25'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','makadama','2022-09-06 08:29:02'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','arrival message','2022-09-06 08:33:15'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','arrival message','2022-09-06 08:36:27'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','hhhh','2022-09-06 09:07:31'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','jjjjd','2022-09-06 09:08:39'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','let me','2022-09-06 09:09:16'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','arrivkkkk','2022-09-06 09:11:22'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','hygtfr','2022-09-06 09:11:47'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','yes','2022-09-06 09:12:49'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','jhjh','2022-09-06 09:16:12'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','mm;m','2022-09-06 09:16:33'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','lala','2022-09-06 09:17:38'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','mama','2022-09-06 09:20:07'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','lala','2022-09-06 09:20:23'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','ppppa','2022-09-06 09:23:23'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','nnn','2022-09-06 09:24:03'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','xxxxx','2022-09-06 09:26:33'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','mqmqmq','2022-09-06 09:26:48'),(2,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','nnnnnnd','2022-09-06 09:28:06'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','samir','2022-09-06 09:29:23'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','admin','2022-09-06 09:29:41'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','hj\n','2022-09-06 09:51:38'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','llls','2022-09-06 09:59:56'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','jjjs','2022-09-06 10:00:08'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','21ml','2022-09-06 10:07:04'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','lll','2022-09-06 10:08:12'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','51mllm','2022-09-06 10:09:45'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','jh','2022-09-06 10:11:08'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','ll','2022-09-06 10:22:59'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','lkn','2022-09-06 10:23:27'),(2,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','hbb','2022-09-06 10:23:45'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','test','2022-09-06 10:24:29'),(1,'y9teVKEjllkQt1OqCkeyA2tKCVxst4','re test','2022-09-06 10:24:47'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','Hello \n','2022-09-10 12:54:45'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','nnnnnnnnnnnnn','2022-10-09 12:39:28'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','jjjjj','2022-10-09 12:42:59'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','new message yes','2022-10-09 12:45:55'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','hello','2022-10-09 13:28:33'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','تستستتستتس','2022-10-09 13:28:49'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','السلام عليكم ','2022-10-09 13:29:32'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','','2022-10-09 19:36:34'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','nnnnnnn','2022-10-09 19:37:08'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','xxxxxx','2022-10-09 19:40:13'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','kkkkk','2022-10-09 19:41:09'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','jjj','2022-10-09 19:42:20'),(1,'wbNhjRdPvvtAnN7824QRarh0bAkBT8','last message','2022-10-09 19:43:45');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetails` (
  `orderdetail_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(19,2) NOT NULL DEFAULT '0.00',
  `total` decimal(19,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`orderdetail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=221 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES (167,11275,65,2,17.00,34.00),(168,11275,64,2,14.20,28.40),(169,11275,67,5,16.00,80.00),(170,11276,63,2,16.50,33.00),(171,11276,65,2,16.20,32.40),(172,11277,64,2,14.20,28.40),(173,11278,64,1,14.20,14.20),(174,11279,65,2,15.00,30.00),(175,11279,75,1,16.90,16.90),(176,11280,76,2,12.00,24.00),(177,11280,67,1,18.00,18.00),(178,11281,76,2,12.00,24.00),(179,11281,64,2,10.05,20.10),(180,11281,65,1,14.00,14.00),(181,11291,65,5,14.00,70.00),(191,11291,64,2,10.05,20.10),(201,11291,63,1,17.20,17.20),(211,11291,66,1,17.00,17.00);
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(90) NOT NULL,
  `totalAmount` decimal(19,2) NOT NULL DEFAULT '0.00',
  `creationTimestamp` datetime NOT NULL,
  `method` varchar(10) NOT NULL DEFAULT 'paid',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11301 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (11275,'wbNhjRdPvvtAnN7824QRarh0bAkBT8',142.40,'2022-08-29 10:47:20','payed',2),(11276,'wbNhjRdPvvtAnN7824QRarh0bAkBT8',65.40,'2022-08-29 11:34:42','payed',2),(11277,'wbNhjRdPvvtAnN7824QRarh0bAkBT8',28.40,'2022-09-05 17:24:36','payed',1),(11278,'wbNhjRdPvvtAnN7824QRarh0bAkBT8',14.20,'2022-09-14 11:23:54','payed',1),(11279,'wbNhjRdPvvtAnN7824QRarh0bAkBT8',46.90,'2022-10-05 09:13:07','payed',0),(11280,'wbNhjRdPvvtAnN7824QRarh0bAkBT8',42.00,'2022-10-05 09:25:08','payed',3),(11281,'wbNhjRdPvvtAnN7824QRarh0bAkBT8',58.10,'2022-10-09 07:36:33','payed',2),(11291,'wbNhjRdPvvtAnN7824QRarh0bAkBT8',128.30,'2022-10-12 10:03:32','payed',1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `desc` text NOT NULL,
  `price1` decimal(19,2) NOT NULL DEFAULT '0.00',
  `price2` decimal(19,2) NOT NULL DEFAULT '0.00',
  `price3` decimal(19,2) NOT NULL DEFAULT '0.00',
  `photo` varchar(255) NOT NULL,
  `creationTimestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isTopOfTheWeek` tinyint(4) DEFAULT '0',
  `isDietetic` tinyint(4) DEFAULT '0',
  `isPizza` tinyint(4) DEFAULT '0',
  `delivery1` decimal(19,2) DEFAULT '0.00',
  `delivery2` decimal(19,2) DEFAULT '0.00',
  `delivery3` decimal(19,2) DEFAULT '0.00',
  `extra1` varchar(45) NOT NULL,
  `extra2` varchar(45) NOT NULL,
  `extra3` varchar(45) NOT NULL,
  `extra4` varchar(45) NOT NULL,
  `extra1_price` decimal(19,2) NOT NULL DEFAULT '0.00',
  `extra2_price` decimal(19,2) NOT NULL DEFAULT '0.00',
  `extra3_price` decimal(19,2) NOT NULL DEFAULT '0.00',
  `extra4_price` decimal(19,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (63,'Margherita','La pizza è la mia insaziabile energia, il pane è la semplicità',12.00,13.00,15.20,'http://res.cloudinary.com/dwngcjnoo/image/upload/v1660817577/uploads/fozet08cmamyjxamyzbf.png','2022-08-18 12:12:58',0,0,1,0.00,2.00,3.30,'Double ingredient','Cheese','spicy','juice',2.00,2.00,1.30,2.10),(64,'Seafood pasta','Stir up some heroku sizzling seafood and fish pasta recipes, from classic shellfish spaghetti and prawn linguine to new twists',10.05,16.30,18.40,'http://res.cloudinary.com/dwngcjnoo/image/upload/v1660817741/uploads/ueujk067mm8crdhxhbmu.png','2022-08-18 12:15:41',1,0,0,0.10,2.00,3.00,'Double Chips','soda','Spicy','bread',1.00,1.20,3.00,5.00),(65,'Napolitana','La pizza è la mia herokuu insaziabile energia, il pane è la semplicità',15.00,16.00,17.00,'http://res.cloudinary.com/dwngcjnoo/image/upload/v1660817868/uploads/z8mxjkuce26mietop2lg.jpg','2022-08-18 12:17:48',0,0,1,0.20,2.00,4.00,'Double ingredient','Cheese','Spicy','soda',1.00,1.00,1.20,3.20),(66,'Margherita Di Bufala','La pizza è la mia insaziabile energia, il pane è la semplicità',14.00,19.30,36.00,'http://res.cloudinary.com/dwngcjnoo/image/upload/v1662730075/uploads/onz3boqyw2xz8bsqu4ao.png','2022-08-18 12:20:02',1,1,1,0.00,1.00,3.00,'Double Cheese','Ice Cream','juce','spicy',0.10,1.00,2.00,0.10),(67,'Citrusy tilapia','Citrusy tilapia, served with a cheesy but light pasta.',17.00,18.00,20.00,'http://res.cloudinary.com/dwngcjnoo/image/upload/v1660818158/uploads/hnmphfkqjw99rqtu8skj.png','2022-08-18 12:22:38',0,0,0,0.00,0.20,0.40,'Potatos','chesse','salde','tomatos',5.00,2.00,2.00,2.10),(75,'Rice & Chicken','A delicius dishe heroku yes origin with Rice & Chicken and vegetables heroku',14.00,15.00,16.50,'http://res.cloudinary.com/dwngcjnoo/image/upload/v1664897044/uploads/ssxlc50lantrmshhbn9e.png','2022-10-04 17:24:05',1,1,0,0.00,1.00,2.00,'curry sauce','bread','soda','ice cream',1.00,0.50,1.30,2.60),(76,'Algerian sweet chicken&Rice','A delicious algerian sweet dishe whith chicken and rice',12.00,13.00,14.00,'http://res.cloudinary.com/dwngcjnoo/image/upload/v1664897677/uploads/kwn057bnk5ztti70radk.png','2022-10-04 17:34:37',1,1,0,0.00,1.00,1.00,'bread','orange juice','algerian sauce','ice cream',0.60,2.00,2.30,1.20),(77,'royal chiken','royal sweet delicious chiken with onions and carrots..',12.00,13.00,14.00,'http://res.cloudinary.com/dwngcjnoo/image/upload/v1665239215/uploads/j2dh07ahf0a2ijeqie5x.png','2022-10-08 16:26:56',1,1,0,0.00,1.00,2.00,'bread','salad','juice','spicy',1.00,2.00,2.00,1.20),(81,'Crispo lemon fish','Packed with protein, this recipe for crisp lemon fish makes a quick, low-fat, not to mention easy',8.00,10.00,12.20,'http://res.cloudinary.com/dwngcjnoo/image/upload/v1665568880/uploads/rhqe2z9av1sh6p7i6b0d.png','2022-10-12 10:01:20',1,1,0,0.00,1.00,1.00,'double potatos','double tomatos','double rice','spicy',2.50,1.00,1.20,0.60),(91,'Irish lamb stew','As any Irish person will tell you, lamb is the preferred meat for a good Irish stew',5.00,6.00,8.00,'http://res.cloudinary.com/dwngcjnoo/image/upload/v1665591710/uploads/rwqjalri7sg6vyh7pcvk.png','2022-10-12 16:21:51',1,1,0,1.00,2.00,2.00,'bread','soda','rice','ships',1.00,1.00,1.00,1.20),(101,'Fish soup','Take this cooking pot; his people can make him a nice fish soup.',5.00,6.00,8.00,'http://res.cloudinary.com/dwngcjnoo/image/upload/v1665594060/uploads/ysnjdkb9muxzqoz1x5si.png','2022-10-12 17:01:01',0,1,0,1.00,2.00,3.00,'Double Rice','bread','soda','juice',1.00,0.30,1.00,1.00);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refreshtoken`
--

DROP TABLE IF EXISTS `refreshtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refreshtoken` (
  `userId` varchar(90) NOT NULL,
  `refreshToken` text NOT NULL,
  `validuntil` datetime NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refreshtoken`
--

LOCK TABLES `refreshtoken` WRITE;
/*!40000 ALTER TABLE `refreshtoken` DISABLE KEYS */;
INSERT INTO `refreshtoken` VALUES ('2QrXmnC9elvrv5ilvehlgT84ufw4KZ','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjM2ODY3MjEsImV4cCI6MTY2NDI5MTUyMSwiYXVkIjoiMlFyWG1uQzllbHZydjVpbHZlaGxnVDg0dWZ3NEtaIn0.brc5UciWzfOLecpab1RC4OYzpPaAqjQBf8D4GaP4qoE','2022-09-27 17:12:01'),('sbZ0yVWd2UnvJbesAkmsAeC1I8Tr6U','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjU2MDY4OTYsImV4cCI6MTY2NTY5MzI5NiwiYXVkIjoic2JaMHlWV2QyVW52SmJlc0FrbXNBZUMxSThUcjZVIn0.jOThvvh6Qo3RuB6umZ87LlfNIP1XBbGE6zZ_9zNjttE','2022-10-19 20:34:56'),('wbNhjRdPvvtAnN7824QRarh0bAkBT8','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjU2NDgwMzMsImV4cCI6MTY2NTczNDQzMywiYXVkIjoid2JOaGpSZFB2dnRBbk43ODI0UVJhcmgwYkFrQlQ4In0.LS07p2VcCqxBsVM2EMJD5yyt9IoIQlxC0uKY7fiPQQ4','2022-10-20 08:00:34');
/*!40000 ALTER TABLE `refreshtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `key_id` varchar(90) NOT NULL,
  `firstName` varchar(60) NOT NULL,
  `lastName` varchar(60) NOT NULL,
  `email` varchar(90) NOT NULL,
  `password` varchar(120) NOT NULL,
  `role` varchar(15) NOT NULL,
  `address` varchar(60) NOT NULL,
  `zip` int(11) NOT NULL,
  `city` varchar(40) NOT NULL,
  `country` varchar(45) NOT NULL,
  `profilePicture` varchar(255) NOT NULL,
  `lat` varchar(45) DEFAULT NULL,
  `lng` varchar(45) DEFAULT NULL,
  `phone` varchar(10) NOT NULL,
  `creationTimestamp` datetime NOT NULL,
  `connexionTimestamp` datetime NOT NULL,
  PRIMARY KEY (`key_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('0z5h1UO6t1p4xidWmfPySpcY8Ie7VS','Samir','CHERIFI','cherifi.sam18@gmail.com','$2b$10$wUn1TT17nZYfxpVfGp71vesv3rBS9fxlestfv6xOGj48c7L9DURvi','RUE DE LILLE','user',37100,'Tours','France','https://res.cloudinary.com/dwngcjnoo/image/upload/v1659964513/samples/people/boy-snow-hoodie.jpg',NULL,NULL,'0201020101','2022-08-08 16:24:31','2022-08-08 16:24:31'),('2QrXmnC9elvrv5ilvehlgT84ufw4KZ','lyes21','cherifi','lyes21@gmail.com','$2b$10$Xhv/0VBnQn4lUDRwAkavz.QXNWq/.YE6FCpvh/c70os1VNG4g78V.','user','2 th rome',37000,'Rome','Italy','',NULL,NULL,'0254181021','2022-09-15 15:48:45','2022-09-15 15:48:45'),('8jFXoIex5DUoCfWOm5mbV1iu04D2PN','Samir','CHERIFI','cherifi.sam21@gmail.com','$2b$10$m5kLoSHsjhgxNtnTO.NH4uk/yrF/GoaHwC3n8UDHDVhS4RCpsgbCC','RUE DE LILLE','user',37100,'Tours','France','https://res.cloudinary.com/dwngcjnoo/image/upload/v1659964513/samples/people/boy-snow-hoodie.jpg',NULL,NULL,'0201020101','2022-08-08 16:45:00','2022-08-08 16:45:00'),('8npTxygNRZUNf54AsEtvyb5J5LfK7h','Thib','Mones','thib@gmail.com','$2b$10$MQOxj3vTDSPko5I86DbTceOb5t2/DWmwd0PJZ0xMOWA/nrKpKctwO','user','32 rue de la paix',75011,'Paris','','',NULL,NULL,'0909090998','2020-06-23 10:58:49','2020-06-23 10:58:49'),('GgO6x29TCSgQ2FXSj2XQjP1tyjNeRR','lyes22','cherifi','lyes22@gmail.com','$2b$10$oQTL5XXwuKCq1BeEvxPtG.OD/8Nce9dAuA1A7HT6Bte0lj8ZWqSs6','user','2 th rome',37000,'Rome','Italy','',NULL,NULL,'0254181021','2022-09-15 17:38:32','2022-09-15 17:38:32'),('GZSUP8foiUKdNvpvgVn4T0Q1AHdyBd','lyes23','cherifi','lyes23@gmail.com','$2b$10$hw8nQRQtmzxjQpvyKPs/X.tWdTXyxutE3ppnx0f4seTtonkjWWSRG','user','2 th rome',37000,'Rome','Italy','',NULL,NULL,'0254181021','2022-09-15 17:42:12','2022-09-15 17:42:12'),('IHa2noxaAD5UdKoSVRtdHiKX1JNzM6','Fati','Habes','fati@gmail.com','$2b$10$y0l16d7pSFfC37yt6xFAS.YyM740RhpbmmgYghl9iYeVt2vBbYZ2K','user','RUE DE LILLE',37100,'Tours','France','',NULL,NULL,'0326597778','2022-09-23 10:56:18','2022-09-23 10:56:18'),('m34pjwWLvJ9t9H2PqAn5jMdhUbngwS','Samir','CHERIFI','cherifi.sam20@gmail.com','$2b$10$4OfxW/ywzGsmciGFMQzeN.XxN6Vu28jtmiH3aa02lOGS0C50mv3PG','RUE DE LILLE','user',37100,'Tours','France','https://res.cloudinary.com/dwngcjnoo/image/upload/v1659964513/samples/people/boy-snow-hoodie.jpg',NULL,NULL,'0201020101','2022-08-08 16:41:34','2022-08-08 16:41:34'),('NJJ1zFzicLNnjkpB77LP8vhW1vAT8O','Samir','CHERIFI','cherifi.sam19@gmail.com','$2b$10$cc/9F9jeGIVSCCG72RZegO3iBJCTrMrQoweD9h96Yb.U4QS88Vb7y','RUE DE LILLE','user',37100,'Tours','France','https://res.cloudinary.com/dwngcjnoo/image/upload/v1659964513/samples/people/boy-snow-hoodie.jpg',NULL,NULL,'0201020101','2022-08-08 16:37:37','2022-08-08 16:37:37'),('PGxJ7rGTxqDH4eGcDyEEqcWIZuGYDz','lyes24','cherifi','lyes24@gmail.com','$2b$10$aGtoK5u78A977q3H3NpEfOq/paPJuoSaUKdY9Hz/nEdfm6RUfSly6','user','2 th rome',37000,'Rome','Italy','',NULL,NULL,'0254181021','2022-09-15 17:44:42','2022-09-15 17:44:42'),('rr1H3rwd8sgnTZCMeJ8in1rHA3cByO','lyes','CHERIFI','lyes@gmail.com','$2b$10$cK8GLFaxnmshZZi5c3DxHORIe0gillLzUCKZFr/nT47xh97Wt4A5y','user','5000 logements',16000,'kouba','Algiers','',NULL,NULL,'0203010202','2022-09-27 18:16:51','2022-09-27 18:16:51'),('sbZ0yVWd2UnvJbesAkmsAeC1I8Tr6U','Sohaib','CHERIFI','sohaib@gmail.com','$2b$10$zajc3YO4/9qf5fxXZnRaDOIPX5qEUrjtTmNla2BjuEOm9Gzb1MELu','user','8 rue de Lille',37100,'Tours','France','',NULL,NULL,'0909090909','2022-10-12 20:32:43','2022-10-12 20:32:43'),('SGtoXfvq0WG1VvC2UdW23qn1dq8oOL','heroko','heroko','heroku@gmail.com','$2b$10$j0HMYa1lDWpYkrqL9f2Lpes8zep4SkCuxyajEmLTNPGQx2ONCyM1e','user','15 street in heroku',63000,'Heroku','heroku','',NULL,NULL,'0505050551','2022-10-10 20:47:40','2022-10-10 20:47:40'),('UtQSVGHLWo9CvvXurWnDuYo0UBpe7S','Samir','CHERIFI','cherifi.sam17@gmail.com','$2b$10$b5UuvzU2efy14T6c5MwlnunmYYeKyv21koWtCBkFqPk3BAYE4YIWG','RUE DE LILLE','user',37100,'Tours','France','https://res.cloudinary.com/dwngcjnoo/image/upload/v1659964513/samples/people/boy-snow-hoodie.jpg',NULL,NULL,'0201020101','2022-08-08 16:20:35','2022-08-08 16:20:35'),('wbNhjRdPvvtAnN7824QRarh0bAkBT8','REMOLINA','cergio','admin@gmail.com','$2b$10$.cdYKQqckuGIyyBNVtrRvuaApROmrbHbOVcb1aTE6RNPO2oX1crFy','admin','2d square in Naple',15000,'Napoli','Italy','https://www.ciachef.edu/uploadedImages/Content/News_Stories/SergioRemolina.jpg',NULL,NULL,'0909900999','2022-08-19 12:21:03','2022-08-19 12:21:03'),('y9teVKEjllkQt1OqCkeyA2tKCVxst4','CHERIFI','Samir','noadmin@gmail.com','$2b$10$fmVRC.cpDJL6xAAYN6nOWutGSFk6w0wKm4/G1F9nCMihIDfoe6X2u','user','RUE DE LILLE',37100,'Tours','France','https://res.cloudinary.com/dwngcjnoo/image/upload/v1659964513/samples/people/boy-snow-hoodie.jpg',NULL,NULL,'0201020101','2022-08-20 17:49:22','2022-08-20 17:49:22'),('YLaP2EH1GWeITV55qbQnAfttn6fdT5','fati','cherifi','cherifi.sam22@gmail.com','$2b$10$vyThBKLQEpTD62nc4t1i1efZNNxNJ2uqKAKVgonBEFFjZL7f9QcFu','RUE DE LILLE','5 d square',45000,'Naple','Italy','https://res.cloudinary.com/dwngcjnoo/image/upload/v1659964513/samples/people/boy-snow-hoodie.jpg',NULL,NULL,'0505050505','2022-08-08 17:14:56','2022-08-08 17:14:56'),('ZR5QJc2j3Tf5mYG79zL2DZn6zpyI5O','lyes20','cherifi','lyes20@gmail.com','$2b$10$KvwpdbK3lAC0VJXvsAjYauGT1be4deBfCFEuxTucpHNyrcZYm7Fsq','user','2 th rome',37000,'Rome','Italy','',NULL,NULL,'0254181021','2022-09-15 15:46:59','2022-09-15 15:46:59');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-13 17:45:14
