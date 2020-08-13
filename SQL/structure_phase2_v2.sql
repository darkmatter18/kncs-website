-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2020 at 09:34 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kncs_db_phase_2`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int(10) NOT NULL COMMENT 'Address Id',
  `person_id` varchar(50) NOT NULL COMMENT 'ID of referred person',
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
-- Table structure for table `admin_details`
--

CREATE TABLE `admin_details` (
  `id` varchar(50) NOT NULL COMMENT 'Admin ID',
  `role` varchar(8) NOT NULL DEFAULT 'admin' COMMENT 'Admin role',
  `a_first_name` varchar(50) NOT NULL COMMENT 'First name of admin',
  `a_last_name` varchar(50) NOT NULL COMMENT 'Last name of admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int(10) NOT NULL COMMENT 'Class ID',
  `standard` varchar(15) NOT NULL COMMENT 'Class or Standard',
  `section` varchar(15) NOT NULL COMMENT 'Class Section or (Arts / Humanities)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `communication`
--

CREATE TABLE `communication` (
  `id` int(10) NOT NULL COMMENT 'Communication ID',
  `person_id` varchar(50) NOT NULL COMMENT 'Id of communicating Person',
  `com_phone` varchar(10) NOT NULL COMMENT 'Phone number of the Person',
  `com_email` varchar(50) DEFAULT NULL COMMENT 'Email address of the Person'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `exam`
--

CREATE TABLE `exam` (
  `e_id` int(10) NOT NULL COMMENT 'Exam ID',
  `e_name` varchar(50) NOT NULL COMMENT 'Exam name',
  `e_date` varchar(15) NOT NULL COMMENT 'Exam date'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` varchar(50) NOT NULL COMMENT 'Student, Teacher, Admin ID',
  `email` varchar(100) NOT NULL COMMENT 'Email ID',
  `password` varchar(20) NOT NULL COMMENT 'Password',
  `role` varchar(8) NOT NULL COMMENT 'Role of the user',
  `last_login_time` datetime NOT NULL COMMENT 'Last Login Time',
  `last_login_ip` varchar(50) NOT NULL COMMENT 'Last Login Ip address'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Login Table';

-- --------------------------------------------------------

--
-- Table structure for table `student_academic_info`
--

CREATE TABLE `student_academic_info` (
  `id` int(10) NOT NULL COMMENT 'Student Academic Info ID',
  `student_id` varchar(50) NOT NULL COMMENT 'Student ID',
  `s_class` int(10) DEFAULT NULL COMMENT 'Class Details (Foreign to Classes)',
  `s_roll` varchar(5) NOT NULL COMMENT 'Student roll number',
  `s_is_present_class` tinyint(1) NOT NULL COMMENT 'Present Class -> 1 , Past Class -> 0',
  `s_class_start_date` varchar(15) NOT NULL COMMENT 'Class start date',
  `s_class_end_date` varchar(15) NOT NULL COMMENT 'Class end date'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Student Class, roll, start_date, end_date etc';

-- --------------------------------------------------------

--
-- Table structure for table `student_basic_details`
--

CREATE TABLE `student_basic_details` (
  `id` varchar(50) NOT NULL COMMENT 'Student Id',
  `role` varchar(8) NOT NULL DEFAULT 'student' COMMENT 'User role',
  `s_first_name` varchar(50) NOT NULL COMMENT 'Student first name',
  `s_middle_name` varchar(50) DEFAULT NULL COMMENT 'Student middle name',
  `s_last_name` varchar(50) NOT NULL COMMENT 'Student last name',
  `s_dob` varchar(15) NOT NULL COMMENT 'Student date of birth',
  `s_gender` varchar(15) NOT NULL COMMENT 'Student gender',
  `s_religion` varchar(20) NOT NULL COMMENT 'Student religion',
  `s_caste` varchar(20) NOT NULL COMMENT 'Student caste',
  `s_aadhaar` varchar(12) DEFAULT NULL COMMENT 'Student aadhaar number'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `student_family_details`
--

CREATE TABLE `student_family_details` (
  `id` varchar(50) NOT NULL COMMENT 'Student Family Details Id',
  `student_id` varchar(50) NOT NULL COMMENT 'Student ID',
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

CREATE TABLE `subjects` (
  `id` int(10) NOT NULL COMMENT 'Subject ID',
  `subject_name` varchar(50) NOT NULL COMMENT 'Subject name'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `s_marks`
--

CREATE TABLE `s_marks` (
  `m_id` int(10) NOT NULL COMMENT 'Serial number',
  `s_id` int(10) NOT NULL COMMENT 'Student ID',
  `s_class` varchar(20) NOT NULL COMMENT 'Student class',
  `exam_id` int(10) NOT NULL COMMENT 'Exam ID',
  `subject_code` int(10) NOT NULL COMMENT 'Subject code',
  `marks` int(10) NOT NULL COMMENT 'Marks obtained on subject',
  `full_marks` int(11) NOT NULL COMMENT 'Full marks on subject'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `teacher_basic_details`
--

CREATE TABLE `teacher_basic_details` (
  `id` varchar(50) NOT NULL COMMENT 'Teacher ID',
  `role` varchar(8) NOT NULL DEFAULT 'teacher' COMMENT 'User role',
  `t_first_name` varchar(50) NOT NULL COMMENT 'First name of the teacher',
  `t_last_name` varchar(50) NOT NULL COMMENT 'Last name of the teacher'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `address_person_id_uindex` (`person_id`);

--
-- Indexes for table `admin_details`
--
ALTER TABLE `admin_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_2` (`id`),
  ADD KEY `role` (`role`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `communication`
--
ALTER TABLE `communication`
  ADD PRIMARY KEY (`id`),
  ADD KEY `communication_person_id_index` (`person_id`);

--
-- Indexes for table `exam`
--
ALTER TABLE `exam`
  ADD PRIMARY KEY (`e_id`),
  ADD KEY `e_name` (`e_name`),
  ADD KEY `e_id` (`e_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login_email_uindex` (`email`),
  ADD KEY `login_admin_details_role_fk` (`role`);

--
-- Indexes for table `student_academic_info`
--
ALTER TABLE `student_academic_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_academic_info_s_class_index` (`s_class`),
  ADD KEY `student_academic_info_s_is_present_class_index` (`s_is_present_class`),
  ADD KEY `student_academic_info_student_id_index` (`student_id`);

--
-- Indexes for table `student_basic_details`
--
ALTER TABLE `student_basic_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role` (`role`);

--
-- Indexes for table `student_family_details`
--
ALTER TABLE `student_family_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id__index` (`student_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `s_marks`
--
ALTER TABLE `s_marks`
  ADD PRIMARY KEY (`m_id`),
  ADD KEY `m_id` (`m_id`),
  ADD KEY `Test ID` (`exam_id`),
  ADD KEY `Student class` (`s_class`),
  ADD KEY `Subject code` (`subject_code`),
  ADD KEY `s_id` (`s_id`);

--
-- Indexes for table `teacher_basic_details`
--
ALTER TABLE `teacher_basic_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_2` (`id`),
  ADD KEY `role` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Address Id';

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Class ID';

--
-- AUTO_INCREMENT for table `communication`
--
ALTER TABLE `communication`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Communication ID';

--
-- AUTO_INCREMENT for table `exam`
--
ALTER TABLE `exam`
  MODIFY `e_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Exam ID';

--
-- AUTO_INCREMENT for table `student_academic_info`
--
ALTER TABLE `student_academic_info`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Student Academic Info ID';

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Subject ID';

--
-- AUTO_INCREMENT for table `s_marks`
--
ALTER TABLE `s_marks`
  MODIFY `m_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Serial number';

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_student_basic_details_id_fk` FOREIGN KEY (`person_id`) REFERENCES `student_basic_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `address_student_family_details_id_fk` FOREIGN KEY (`person_id`) REFERENCES `student_family_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `address_teacher_basic_details_id_fk` FOREIGN KEY (`person_id`) REFERENCES `teacher_basic_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `communication`
--
ALTER TABLE `communication`
  ADD CONSTRAINT `communicaion_admin_details_id_fk` FOREIGN KEY (`person_id`) REFERENCES `admin_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `communication_student_basic_details_id_fk` FOREIGN KEY (`person_id`) REFERENCES `student_basic_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `communication_teacher_basic_details_id_fk` FOREIGN KEY (`person_id`) REFERENCES `teacher_basic_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `login_admin_details_id_fk` FOREIGN KEY (`id`) REFERENCES `admin_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `login_admin_details_role_fk` FOREIGN KEY (`role`) REFERENCES `admin_details` (`role`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `login_student_basic_details_id_fk` FOREIGN KEY (`id`) REFERENCES `student_basic_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `login_student_basic_details_role_fk` FOREIGN KEY (`role`) REFERENCES `student_basic_details` (`role`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `login_teacher_basic_details_id_fk` FOREIGN KEY (`id`) REFERENCES `teacher_basic_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `login_teacher_basic_details_role_fk` FOREIGN KEY (`role`) REFERENCES `teacher_basic_details` (`role`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_academic_info`
--
ALTER TABLE `student_academic_info`
  ADD CONSTRAINT `student_academic_info_classes_id_fk` FOREIGN KEY (`s_class`) REFERENCES `classes` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `student_academic_info_student_basic_details_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student_basic_details` (`id`);

--
-- Constraints for table `student_family_details`
--
ALTER TABLE `student_family_details`
  ADD CONSTRAINT `student_family_details_student_basic_details_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student_basic_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
