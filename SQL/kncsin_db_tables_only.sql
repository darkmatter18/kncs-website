-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 25, 2020 at 06:35 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u572500670_kncsin_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_communication`
--

DROP TABLE IF EXISTS `admin_communication`;
CREATE TABLE `admin_communication` (
  `id` int(11) NOT NULL COMMENT 'Communication ID',
  `admin_id` int(11) NOT NULL COMMENT 'Admin ID',
  `com_phone` varchar(10) NOT NULL COMMENT 'Phone number of the admin',
  `com_email` varchar(50) NOT NULL COMMENT 'Admin email address'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `admin_details`
--

DROP TABLE IF EXISTS `admin_details`;
CREATE TABLE `admin_details` (
  `id` int(11) NOT NULL COMMENT 'Admin ID',
  `first_name` varchar(50) NOT NULL COMMENT 'First name of admin',
  `last_name` varchar(50) NOT NULL COMMENT 'Last name of admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `admission_student_preregistration_details`
--

DROP TABLE IF EXISTS `admission_student_preregistration_details`;
CREATE TABLE `admission_student_preregistration_details` (
  `application_no` int(10) NOT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `middle_name` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aadhar_no` varchar(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dob` date NOT NULL,
  `status` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admission_student_preregistration_draft_address`
--

DROP TABLE IF EXISTS `admission_student_preregistration_draft_address`;
CREATE TABLE `admission_student_preregistration_draft_address` (
  `application_no` int(10) NOT NULL,
  `address_line_1` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_line_2` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pin` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admission_student_preregistration_draft_basic_info`
--

DROP TABLE IF EXISTS `admission_student_preregistration_draft_basic_info`;
CREATE TABLE `admission_student_preregistration_draft_basic_info` (
  `application_no` int(10) NOT NULL,
  `gender` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `religion` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caste` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mother_tongue` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apply_for_reserved_seat` tinyint(1) NOT NULL,
  `caste_certificate_no` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weather_bpl` tinyint(1) NOT NULL,
  `bpl_card_no` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsapp_no` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admission_student_preregistration_draft_declaration_info`
--

DROP TABLE IF EXISTS `admission_student_preregistration_draft_declaration_info`;
CREATE TABLE `admission_student_preregistration_draft_declaration_info` (
  `application_no` int(10) NOT NULL,
  `date` date NOT NULL,
  `place` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admission_student_preregistration_draft_family_info`
--

DROP TABLE IF EXISTS `admission_student_preregistration_draft_family_info`;
CREATE TABLE `admission_student_preregistration_draft_family_info` (
  `application_no` int(10) NOT NULL,
  `father_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `father_occupation` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mother_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mother_occupation` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guardian_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guardian_occupation` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guardian_same_father` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admission_student_preregistration_draft_image`
--

DROP TABLE IF EXISTS `admission_student_preregistration_draft_image`;
CREATE TABLE `admission_student_preregistration_draft_image` (
  `application_no` int(10) NOT NULL,
  `image_type` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admission_student_preregistration_draft_payment_info`
--

DROP TABLE IF EXISTS `admission_student_preregistration_draft_payment_info`;
CREATE TABLE `admission_student_preregistration_draft_payment_info` (
  `application_no` int(10) NOT NULL,
  `mode_of_payment` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_of_bank` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_date` date NOT NULL,
  `verified_transaction` varchar(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'N' COMMENT 'Default is N and to be updated to Y when verified with Bank'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admission_student_preregistration_draft_present_academic`
--

DROP TABLE IF EXISTS `admission_student_preregistration_draft_present_academic`;
CREATE TABLE `admission_student_preregistration_draft_present_academic` (
  `application_no` int(10) NOT NULL,
  `stream` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_language` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `second_language` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_major` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `second_major` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `third_major` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `forth_major` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direct_admission` tinyint(1) NOT NULL,
  `medium` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admission_student_preregistration_draft_present_academic_1820`
--

DROP TABLE IF EXISTS `admission_student_preregistration_draft_present_academic_1820`;
CREATE TABLE `admission_student_preregistration_draft_present_academic_1820` (
  `application_no` int(10) NOT NULL,
  `stream` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_language` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `second_language` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_major` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `second_major` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `third_major` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `forth_major` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direct_admission` tinyint(1) NOT NULL,
  `medium` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admission_student_preregistration_draft_previous_academic_info`
--

DROP TABLE IF EXISTS `admission_student_preregistration_draft_previous_academic_info`;
CREATE TABLE `admission_student_preregistration_draft_previous_academic_info` (
  `application_no` int(10) NOT NULL,
  `previous_school_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year_of_madhyamik` int(4) NOT NULL,
  `previous_student_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admission_student_preregistration_draft_previous_academic_marks`
--

DROP TABLE IF EXISTS `admission_student_preregistration_draft_previous_academic_marks`;
CREATE TABLE `admission_student_preregistration_draft_previous_academic_marks` (
  `application_no` int(10) NOT NULL,
  `marks_beng` int(3) NOT NULL,
  `marks_engb` int(3) NOT NULL,
  `marks_maths` int(3) NOT NULL,
  `marks_psc` int(3) NOT NULL,
  `marks_lsc` int(3) NOT NULL,
  `marks_geo` int(3) NOT NULL,
  `marks_hist` int(3) NOT NULL,
  `marks_total` int(3) NOT NULL,
  `marks_percentage` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admission_student_preregistration_login`
--

DROP TABLE IF EXISTS `admission_student_preregistration_login`;
CREATE TABLE `admission_student_preregistration_login` (
  `application_no` int(10) NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dob` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes` (
  `id` int(11) NOT NULL COMMENT 'Class ID',
  `standard` varchar(15) NOT NULL COMMENT 'Class or Standard',
  `section` varchar(15) NOT NULL COMMENT 'Class Section or (Arts / Humanities)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `id` int(11) NOT NULL COMMENT 'Login ID',
  `user_id` int(11) NOT NULL COMMENT 'ID of diferent users',
  `user_email` varchar(50) NOT NULL COMMENT 'User email',
  `user_password` varchar(200) NOT NULL COMMENT 'User password',
  `user_role` varchar(10) NOT NULL COMMENT 'User role',
  `last_login_ip` varchar(60) NOT NULL COMMENT 'Last login IP of the User',
  `last_login_time` datetime NOT NULL COMMENT 'Last login Time of the User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `student_academic_info`
--

DROP TABLE IF EXISTS `student_academic_info`;
CREATE TABLE `student_academic_info` (
  `id` int(11) NOT NULL COMMENT 'Serial number',
  `s_class` int(10) DEFAULT NULL COMMENT 'Class Details',
  `s_roll` varchar(5) NOT NULL COMMENT 'Student roll number',
  `s_is_present_class` tinyint(1) NOT NULL COMMENT 'Present Class -> 1 , Past Class -> 0',
  `s_class_start_date` varchar(15) NOT NULL COMMENT 'Class start date',
  `s_class_end_date` varchar(15) NOT NULL COMMENT 'Class end date'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Student Class, roll, start_date, end_date etc';

-- --------------------------------------------------------

--
-- Table structure for table `student_address`
--

DROP TABLE IF EXISTS `student_address`;
CREATE TABLE `student_address` (
  `id` int(11) NOT NULL COMMENT 'Address ID',
  `student_id` int(11) NOT NULL COMMENT 'ID of referred person',
  `address_line_1` varchar(100) NOT NULL COMMENT 'Address Line 1 of the Person',
  `address_line_2` varchar(100) DEFAULT NULL COMMENT 'Address Line 2 of the Person',
  `vill_town` varchar(50) NOT NULL COMMENT 'Village or Town of the Person',
  `locality` varchar(50) DEFAULT NULL COMMENT 'Locality of the Person',
  `po` varchar(50) NOT NULL COMMENT 'Post office of the Person',
  `ps` varchar(50) NOT NULL COMMENT 'Police station of the Person',
  `dist` varchar(50) NOT NULL COMMENT 'District of the Person',
  `state` varchar(30) NOT NULL COMMENT 'State of the Person',
  `pin` varchar(6) NOT NULL COMMENT 'Pin code of the Person'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `student_basic_details`
--

DROP TABLE IF EXISTS `student_basic_details`;
CREATE TABLE `student_basic_details` (
  `id` int(11) NOT NULL COMMENT 'Student ID',
  `first_name` varchar(50) NOT NULL COMMENT 'Student first name',
  `middle_name` varchar(50) DEFAULT NULL COMMENT 'Student middle name',
  `last_name` varchar(50) NOT NULL COMMENT 'Student last name',
  `s_dob` varchar(15) NOT NULL COMMENT 'Student date of birth',
  `s_gender` varchar(15) NOT NULL COMMENT 'Student gender',
  `s_religion` varchar(20) NOT NULL COMMENT 'Student religion',
  `s_caste` varchar(20) NOT NULL COMMENT 'Student caste',
  `s_aadhaar` varchar(12) DEFAULT NULL COMMENT 'Student aadhaar number'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `student_communication`
--

DROP TABLE IF EXISTS `student_communication`;
CREATE TABLE `student_communication` (
  `id` int(11) NOT NULL COMMENT 'Communication ID',
  `student_id` int(11) NOT NULL COMMENT 'Student ID',
  `com_phone` varchar(10) NOT NULL COMMENT 'Phone number of the student',
  `com_email` varchar(50) NOT NULL COMMENT 'User email address'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `student_family_communication`
--

DROP TABLE IF EXISTS `student_family_communication`;
CREATE TABLE `student_family_communication` (
  `id` int(11) NOT NULL COMMENT 'Student family ID',
  `student_id` int(11) NOT NULL COMMENT 'Student ID',
  `s_family_phone` varchar(10) NOT NULL COMMENT 'Student phone number',
  `s_family_email` varchar(50) DEFAULT NULL COMMENT 'Student email number'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `student_family_details`
--

DROP TABLE IF EXISTS `student_family_details`;
CREATE TABLE `student_family_details` (
  `id` int(11) NOT NULL COMMENT 'Family ID',
  `student_id` int(11) NOT NULL COMMENT 'Student ID',
  `s_father_name` varchar(50) NOT NULL COMMENT 'Student father name',
  `s_father_aadhaar` varchar(16) DEFAULT NULL COMMENT 'Student father aadhaar card number',
  `s_mother_name` varchar(50) NOT NULL COMMENT 'Student mother name',
  `s_mother_aadhaar` varchar(16) DEFAULT NULL COMMENT 'Student''s mother aadhaar card number',
  `s_guardian_name` varchar(50) NOT NULL COMMENT 'Student guardian name',
  `s_guardian_relation` varchar(50) NOT NULL COMMENT 'Relation of guardian with student',
  `s_guardian_aadhaar` varchar(16) DEFAULT NULL COMMENT 'Student guardian aadhaar number'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
CREATE TABLE `subjects` (
  `id` int(11) NOT NULL COMMENT 'Subject ID',
  `subject_name` varchar(50) NOT NULL COMMENT 'Subject name'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `teacher_address`
--

DROP TABLE IF EXISTS `teacher_address`;
CREATE TABLE `teacher_address` (
  `id` int(11) NOT NULL COMMENT 'Address ID',
  `teacher_id` int(11) NOT NULL COMMENT 'Teacher ID',
  `address_line_1` varchar(100) NOT NULL COMMENT 'Address Line 1 of the Person',
  `address_line_2` varchar(100) DEFAULT NULL COMMENT 'Address Line 2 of the Person',
  `vill_town` varchar(50) NOT NULL COMMENT 'Village or Town of the Person',
  `locality` varchar(50) DEFAULT NULL COMMENT 'Locality of the Person',
  `po` varchar(50) NOT NULL COMMENT 'Post office of the Person',
  `ps` varchar(50) NOT NULL COMMENT 'Police station of the Person',
  `dist` varchar(50) NOT NULL COMMENT 'District of the Person',
  `state` varchar(30) NOT NULL COMMENT 'State of the Person',
  `pin` varchar(6) NOT NULL COMMENT 'Pin code of the Person'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `teacher_basic_details`
--

DROP TABLE IF EXISTS `teacher_basic_details`;
CREATE TABLE `teacher_basic_details` (
  `id` int(11) NOT NULL COMMENT 'Teacher ID',
  `first_name` varchar(50) NOT NULL COMMENT 'First name of the teacher',
  `last_name` varchar(50) NOT NULL COMMENT 'Last name of the teacher'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `teacher_communication`
--

DROP TABLE IF EXISTS `teacher_communication`;
CREATE TABLE `teacher_communication` (
  `id` int(11) NOT NULL COMMENT 'Communication ID',
  `teacher_id` int(11) NOT NULL COMMENT 'Teacher ID',
  `com_phone` varchar(10) NOT NULL COMMENT 'Phone number of the teacher',
  `com_email` varchar(50) NOT NULL COMMENT 'Teacher email address'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_communication`
--
ALTER TABLE `admin_communication`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `admin_details`
--
ALTER TABLE `admin_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admission_student_preregistration_details`
--
ALTER TABLE `admission_student_preregistration_details`
  ADD PRIMARY KEY (`application_no`);

--
-- Indexes for table `admission_student_preregistration_draft_address`
--
ALTER TABLE `admission_student_preregistration_draft_address`
  ADD PRIMARY KEY (`application_no`);

--
-- Indexes for table `admission_student_preregistration_draft_basic_info`
--
ALTER TABLE `admission_student_preregistration_draft_basic_info`
  ADD PRIMARY KEY (`application_no`);

--
-- Indexes for table `admission_student_preregistration_draft_declaration_info`
--
ALTER TABLE `admission_student_preregistration_draft_declaration_info`
  ADD PRIMARY KEY (`application_no`),
  ADD KEY `declaratipn_application_no_constraint` (`application_no`);

--
-- Indexes for table `admission_student_preregistration_draft_family_info`
--
ALTER TABLE `admission_student_preregistration_draft_family_info`
  ADD PRIMARY KEY (`application_no`);

--
-- Indexes for table `admission_student_preregistration_draft_image`
--
ALTER TABLE `admission_student_preregistration_draft_image`
  ADD PRIMARY KEY (`application_no`),
  ADD KEY `image_application_no_constraint` (`application_no`);

--
-- Indexes for table `admission_student_preregistration_draft_payment_info`
--
ALTER TABLE `admission_student_preregistration_draft_payment_info`
  ADD PRIMARY KEY (`application_no`),
  ADD KEY `payment_application_no_constraint` (`application_no`);

--
-- Indexes for table `admission_student_preregistration_draft_present_academic`
--
ALTER TABLE `admission_student_preregistration_draft_present_academic`
  ADD PRIMARY KEY (`application_no`);

--
-- Indexes for table `admission_student_preregistration_draft_previous_academic_info`
--
ALTER TABLE `admission_student_preregistration_draft_previous_academic_info`
  ADD PRIMARY KEY (`application_no`);

--
-- Indexes for table `admission_student_preregistration_draft_previous_academic_marks`
--
ALTER TABLE `admission_student_preregistration_draft_previous_academic_marks`
  ADD PRIMARY KEY (`application_no`);

--
-- Indexes for table `admission_student_preregistration_login`
--
ALTER TABLE `admission_student_preregistration_login`
  ADD PRIMARY KEY (`application_no`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_email` (`user_email`),
  ADD KEY `user_role` (`user_role`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `student_academic_info`
--
ALTER TABLE `student_academic_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_academic_info_s_class_index` (`s_class`),
  ADD KEY `student_academic_info_s_is_present_class_index` (`s_is_present_class`);

--
-- Indexes for table `student_address`
--
ALTER TABLE `student_address`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `address_person_id_uindex` (`student_id`);

--
-- Indexes for table `student_basic_details`
--
ALTER TABLE `student_basic_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_communication`
--
ALTER TABLE `student_communication`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `student_family_communication`
--
ALTER TABLE `student_family_communication`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `student_family_details`
--
ALTER TABLE `student_family_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teacher_address`
--
ALTER TABLE `teacher_address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indexes for table `teacher_basic_details`
--
ALTER TABLE `teacher_basic_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teacher_communication`
--
ALTER TABLE `teacher_communication`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_communication`
--
ALTER TABLE `admin_communication`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Communication ID';

--
-- AUTO_INCREMENT for table `admin_details`
--
ALTER TABLE `admin_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Admin ID';

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Class ID';

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Login ID';

--
-- AUTO_INCREMENT for table `student_academic_info`
--
ALTER TABLE `student_academic_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Serial number';

--
-- AUTO_INCREMENT for table `student_address`
--
ALTER TABLE `student_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Address ID';

--
-- AUTO_INCREMENT for table `student_basic_details`
--
ALTER TABLE `student_basic_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Student ID';

--
-- AUTO_INCREMENT for table `student_communication`
--
ALTER TABLE `student_communication`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Communication ID';

--
-- AUTO_INCREMENT for table `student_family_communication`
--
ALTER TABLE `student_family_communication`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Student family ID';

--
-- AUTO_INCREMENT for table `student_family_details`
--
ALTER TABLE `student_family_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Family ID';

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Subject ID';

--
-- AUTO_INCREMENT for table `teacher_address`
--
ALTER TABLE `teacher_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Address ID';

--
-- AUTO_INCREMENT for table `teacher_basic_details`
--
ALTER TABLE `teacher_basic_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Teacher ID';

--
-- AUTO_INCREMENT for table `teacher_communication`
--
ALTER TABLE `teacher_communication`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Communication ID';

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admission_student_preregistration_draft_address`
--
ALTER TABLE `admission_student_preregistration_draft_address`
  ADD CONSTRAINT `address_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `admission_student_preregistration_details` (`application_no`) ON DELETE CASCADE;

--
-- Constraints for table `admission_student_preregistration_draft_basic_info`
--
ALTER TABLE `admission_student_preregistration_draft_basic_info`
  ADD CONSTRAINT `basic_info_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `admission_student_preregistration_details` (`application_no`) ON DELETE CASCADE;

--
-- Constraints for table `admission_student_preregistration_draft_declaration_info`
--
ALTER TABLE `admission_student_preregistration_draft_declaration_info`
  ADD CONSTRAINT `declaration_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `admission_student_preregistration_details` (`application_no`) ON DELETE CASCADE;

--
-- Constraints for table `admission_student_preregistration_draft_family_info`
--
ALTER TABLE `admission_student_preregistration_draft_family_info`
  ADD CONSTRAINT `family_info_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `admission_student_preregistration_details` (`application_no`) ON DELETE CASCADE;

--
-- Constraints for table `admission_student_preregistration_draft_image`
--
ALTER TABLE `admission_student_preregistration_draft_image`
  ADD CONSTRAINT `image_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `admission_student_preregistration_details` (`application_no`) ON DELETE CASCADE;

--
-- Constraints for table `admission_student_preregistration_draft_payment_info`
--
ALTER TABLE `admission_student_preregistration_draft_payment_info`
  ADD CONSTRAINT `payment_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `admission_student_preregistration_details` (`application_no`) ON DELETE CASCADE;

--
-- Constraints for table `admission_student_preregistration_draft_present_academic`
--
ALTER TABLE `admission_student_preregistration_draft_present_academic`
  ADD CONSTRAINT `present_academic_marks_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `admission_student_preregistration_details` (`application_no`) ON DELETE CASCADE;

--
-- Constraints for table `admission_student_preregistration_draft_previous_academic_info`
--
ALTER TABLE `admission_student_preregistration_draft_previous_academic_info`
  ADD CONSTRAINT `previous_academic_info_application_no` FOREIGN KEY (`application_no`) REFERENCES `admission_student_preregistration_details` (`application_no`) ON DELETE CASCADE;

--
-- Constraints for table `admission_student_preregistration_draft_previous_academic_marks`
--
ALTER TABLE `admission_student_preregistration_draft_previous_academic_marks`
  ADD CONSTRAINT `academic_marks_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `admission_student_preregistration_details` (`application_no`) ON DELETE CASCADE;

--
-- Constraints for table `admission_student_preregistration_login`
--
ALTER TABLE `admission_student_preregistration_login`
  ADD CONSTRAINT `login_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `admission_student_preregistration_details` (`application_no`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
