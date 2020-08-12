-- MariaDB dump 10.17  Distrib 10.4.13-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: kncsin_db
-- ------------------------------------------------------
-- Server version	10.4.13-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+05:30' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Address Id',
  `person_id` varchar(50) NOT NULL COMMENT 'ID of referred person',
  `address_line_1` varchar(100) NOT NULL COMMENT 'Address Line 1 of the Person',
  `address_line_2` varchar(100) DEFAULT NULL COMMENT 'Address Line 2 of the Person',
  `vill_town` varchar(50) NOT NULL COMMENT 'Village or Town of the Person',
  `locality` varchar(50) DEFAULT NULL COMMENT 'Locality of the Person',
  `po` varchar(50) NOT NULL COMMENT 'Post office of the Person',
  `ps` varchar(50) NOT NULL COMMENT 'Police station of the Person',
  `dist` varchar(50) NOT NULL COMMENT 'District of the Person',
  `state` varchar(30) NOT NULL COMMENT 'State of the Person',
  `pin` varchar(6) NOT NULL COMMENT 'Pin code of the Person',
  PRIMARY KEY (`id`),
  UNIQUE KEY `address_person_id_uindex` (`person_id`),
  CONSTRAINT `address_student_basic_details_id_fk` FOREIGN KEY (`person_id`) REFERENCES `student_basic_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `address_student_family_details_id_fk` FOREIGN KEY (`person_id`) REFERENCES `student_family_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classes` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Class ID',
  `standard` varchar(15) NOT NULL COMMENT 'Class or Standard',
  `section` varchar(15) NOT NULL COMMENT 'Class Section or (Arts / Humanities)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `communication`
--

DROP TABLE IF EXISTS `communication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `communication` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Communication ID',
  `person_id` varchar(50) NOT NULL COMMENT 'Id of communicating Person',
  `com_phone` varchar(10) NOT NULL COMMENT 'Phone number of the Person',
  `com_email` varchar(50) DEFAULT NULL COMMENT 'Email address of the Person',
  PRIMARY KEY (`id`),
  KEY `communication_person_id_index` (`person_id`),
  CONSTRAINT `communication_student_basic_details_id_fk` FOREIGN KEY (`person_id`) REFERENCES `student_basic_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `communication`
--

LOCK TABLES `communication` WRITE;
/*!40000 ALTER TABLE `communication` DISABLE KEYS */;
/*!40000 ALTER TABLE `communication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam`
--

DROP TABLE IF EXISTS `exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exam` (
  `e_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Exam ID',
  `e_name` varchar(50) NOT NULL COMMENT 'Exam name',
  `e_date` varchar(15) NOT NULL COMMENT 'Exam date',
  PRIMARY KEY (`e_id`),
  KEY `e_name` (`e_name`),
  KEY `e_id` (`e_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam`
--

LOCK TABLES `exam` WRITE;
/*!40000 ALTER TABLE `exam` DISABLE KEYS */;
/*!40000 ALTER TABLE `exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login` (
  `id` varchar(50) NOT NULL COMMENT 'Student, Teacher, Admin ID',
  `email` varchar(100) NOT NULL COMMENT 'Email ID',
  `password` varchar(200) NOT NULL COMMENT 'Password',
  `last_login_time` datetime NOT NULL COMMENT 'Last Login Time',
  `last_login_ip` varchar(50) NOT NULL COMMENT 'Last Login Ip address',
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_email_uindex` (`email`),
  CONSTRAINT `login_student_basic_details_id_fk` FOREIGN KEY (`id`) REFERENCES `student_basic_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Login Table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `s_marks`
--

DROP TABLE IF EXISTS `s_marks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `s_marks` (
  `m_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Serial number',
  `s_id` int(10) NOT NULL COMMENT 'Student ID',
  `s_class` varchar(20) NOT NULL COMMENT 'Student class',
  `exam_id` int(10) NOT NULL COMMENT 'Exam ID',
  `subject_code` int(10) NOT NULL COMMENT 'Subject code',
  `marks` int(10) NOT NULL COMMENT 'Marks obtained on subject',
  `full_marks` int(11) NOT NULL COMMENT 'Full marks on subject',
  PRIMARY KEY (`m_id`),
  KEY `m_id` (`m_id`),
  KEY `Test ID` (`exam_id`),
  KEY `Student class` (`s_class`),
  KEY `Subject code` (`subject_code`),
  KEY `s_id` (`s_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `s_marks`
--

LOCK TABLES `s_marks` WRITE;
/*!40000 ALTER TABLE `s_marks` DISABLE KEYS */;
/*!40000 ALTER TABLE `s_marks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_academic_info`
--

DROP TABLE IF EXISTS `student_academic_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_academic_info` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Student Academic Info ID',
  `student_id` varchar(50) NOT NULL COMMENT 'Student ID',
  `s_class` int(10) DEFAULT NULL COMMENT 'Class Details (Foreign to Classes)',
  `s_roll` varchar(5) NOT NULL COMMENT 'Student roll number',
  `s_is_present_class` tinyint(1) NOT NULL COMMENT 'Present Class -> 1 , Past Class -> 0',
  `s_class_start_date` varchar(15) NOT NULL COMMENT 'Class start date',
  `s_class_end_date` varchar(15) NOT NULL COMMENT 'Class end date',
  PRIMARY KEY (`id`),
  KEY `student_academic_info_s_class_index` (`s_class`),
  KEY `student_academic_info_s_is_present_class_index` (`s_is_present_class`),
  KEY `student_academic_info_student_id_index` (`student_id`),
  CONSTRAINT `student_academic_info_classes_id_fk` FOREIGN KEY (`s_class`) REFERENCES `classes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `student_academic_info_student_basic_details_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student_basic_details` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Student Class, roll, start_date, end_date etc';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_academic_info`
--

LOCK TABLES `student_academic_info` WRITE;
/*!40000 ALTER TABLE `student_academic_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_academic_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_basic_details`
--

DROP TABLE IF EXISTS `student_basic_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_basic_details` (
  `id` varchar(50) NOT NULL COMMENT 'Student Id',
  `s_first_name` varchar(50) NOT NULL COMMENT 'Student first name',
  `s_middle_name` varchar(50) DEFAULT NULL COMMENT 'Student middle name',
  `s_last_name` varchar(50) NOT NULL COMMENT 'Student last name',
  `s_dob` varchar(15) NOT NULL COMMENT 'Student date of birth',
  `s_gender` varchar(15) NOT NULL COMMENT 'Student gender',
  `s_religion` varchar(20) NOT NULL COMMENT 'Student religion',
  `s_caste` varchar(20) NOT NULL COMMENT 'Student caste',
  `s_aadhaar` varchar(16) DEFAULT NULL COMMENT 'Student aadhaar number',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_basic_details`
--

LOCK TABLES `student_basic_details` WRITE;
/*!40000 ALTER TABLE `student_basic_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_basic_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_family_details`
--

DROP TABLE IF EXISTS `student_family_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_family_details` (
  `id` varchar(50) NOT NULL COMMENT 'Student Family Details Id',
  `student_id` varchar(50) NOT NULL COMMENT 'Student ID',
  `s_father_name` varchar(50) NOT NULL COMMENT 'Student father name',
  `s_father_aadhaar` varchar(16) DEFAULT NULL COMMENT 'Student father aadhaar card number',
  `s_mother_name` varchar(50) NOT NULL COMMENT 'Student mother name',
  `s_mother_aadhaar` varchar(16) DEFAULT NULL COMMENT 'Student''s mother aadhaar card number',
  `s_guardian_name` varchar(50) NOT NULL COMMENT 'Student guardian name',
  `s_guardian_relation` varchar(50) NOT NULL COMMENT 'Relation of guardian with student',
  `s_guardian_aadhaar` varchar(16) DEFAULT NULL COMMENT 'Student guardian aadhaar number',
  PRIMARY KEY (`id`),
  KEY `student_id__index` (`student_id`),
  CONSTRAINT `student_family_details_student_basic_details_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student_basic_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_family_details`
--

LOCK TABLES `student_family_details` WRITE;
/*!40000 ALTER TABLE `student_family_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_family_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subjects` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Subject ID',
  `subject_name` varchar(50) NOT NULL COMMENT 'Subject name',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-12 12:27:46
