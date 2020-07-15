-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2020 at 08:36 AM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kncs`
--

-- --------------------------------------------------------

--
-- Table structure for table `student_preregistration_details`
--

CREATE TABLE `student_preregistration_details` (
  `application_no` int(10) NOT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `middle_name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aadhar_no` int(12) NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` int(10) NOT NULL,
  `dob` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_preregistration_draft_address`
--

CREATE TABLE `student_preregistration_draft_address` (
  `application_no` int(10) NOT NULL,
  `address_line_1` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_line_2` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pin` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_preregistration_draft_basic_info`
--

CREATE TABLE `student_preregistration_draft_basic_info` (
  `application_no` int(10) NOT NULL,
  `gender` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `religion` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caste` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mother_tongue` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apply_for_reserved_seat` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caste_certificate_no` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `weather_bpl` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bpl_card_no` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `whatsapp_no` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_preregistration_draft_family_info`
--

CREATE TABLE `student_preregistration_draft_family_info` (
  `application_no` int(10) NOT NULL,
  `father_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `father_occupation` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mother_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mother_occupation` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guardian_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guardian_occupation` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guardian_same_father` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_preregistration_draft_present_academic`
--

CREATE TABLE `student_preregistration_draft_present_academic` (
  `application_no` int(10) NOT NULL,
  `stream` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_language` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `second_language` int(15) NOT NULL,
  `first_major` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `second_major` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `third_major` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `forth_major` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_preregistration_draft_previous_academic_info`
--

CREATE TABLE `student_preregistration_draft_previous_academic_info` (
  `application_no` int(10) NOT NULL,
  `previous_school_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year_of_madhyamik` int(4) NOT NULL,
  `previous_student_id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_preregistration_draft_previous_academic_marks`
--

CREATE TABLE `student_preregistration_draft_previous_academic_marks` (
  `application_no` int(10) NOT NULL,
  `marks_beng` int(3) NOT NULL,
  `marks_engb` int(3) NOT NULL,
  `marks_maths` int(3) NOT NULL,
  `marks_psc` int(3) NOT NULL,
  `marks_lsc` int(3) NOT NULL,
  `marks_geo` int(3) NOT NULL,
  `marks_hist` int(3) NOT NULL,
  `marks_total` int(3) NOT NULL,
  `marks_percentage` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_preregistration_login`
--

CREATE TABLE `student_preregistration_login` (
  `application_no` int(10) NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dob` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_login`
--

CREATE TABLE `users_login` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'User name of User',
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Password of the user',
  `last-login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Last login Timestamp',
  `last-login-ip` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Last login IP'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users_login`
--

INSERT INTO `users_login` (`id`, `password`, `last-login`, `last-login-ip`) VALUES
('user', '$argon2i$v=19$m=1024,t=2,p=2$dHRMdUpQakk4SW5OWVpjZg$yV8z6oMsICFgGstGTBokbw/Lh71YpPrWBrohqemknq8', '0000-00-00 00:00:00', '::1');

-- --------------------------------------------------------

--
-- Table structure for table `users_role`
--

CREATE TABLE `users_role` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users_role`
--

INSERT INTO `users_role` (`id`, `role`) VALUES
('user', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `student_preregistration_details`
--
ALTER TABLE `student_preregistration_details`
  ADD PRIMARY KEY (`application_no`);

--
-- Indexes for table `student_preregistration_draft_address`
--
ALTER TABLE `student_preregistration_draft_address`
  ADD PRIMARY KEY (`application_no`);

--
-- Indexes for table `student_preregistration_draft_basic_info`
--
ALTER TABLE `student_preregistration_draft_basic_info`
  ADD PRIMARY KEY (`application_no`);

--
-- Indexes for table `student_preregistration_draft_family_info`
--
ALTER TABLE `student_preregistration_draft_family_info`
  ADD PRIMARY KEY (`application_no`);

--
-- Indexes for table `student_preregistration_draft_present_academic`
--
ALTER TABLE `student_preregistration_draft_present_academic`
  ADD PRIMARY KEY (`application_no`);

--
-- Indexes for table `student_preregistration_draft_previous_academic_info`
--
ALTER TABLE `student_preregistration_draft_previous_academic_info`
  ADD PRIMARY KEY (`application_no`);

--
-- Indexes for table `student_preregistration_draft_previous_academic_marks`
--
ALTER TABLE `student_preregistration_draft_previous_academic_marks`
  ADD PRIMARY KEY (`application_no`);

--
-- Indexes for table `student_preregistration_login`
--
ALTER TABLE `student_preregistration_login`
  ADD PRIMARY KEY (`application_no`);

--
-- Indexes for table `users_login`
--
ALTER TABLE `users_login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_role`
--
ALTER TABLE `users_role`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `student_preregistration_draft_address`
--
ALTER TABLE `student_preregistration_draft_address`
  ADD CONSTRAINT `address_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `student_preregistration_details` (`application_no`);

--
-- Constraints for table `student_preregistration_draft_basic_info`
--
ALTER TABLE `student_preregistration_draft_basic_info`
  ADD CONSTRAINT `basic_info_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `student_preregistration_details` (`application_no`);

--
-- Constraints for table `student_preregistration_draft_present_academic`
--
ALTER TABLE `student_preregistration_draft_present_academic`
  ADD CONSTRAINT `present_academic_marks_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `student_preregistration_details` (`application_no`);

--
-- Constraints for table `student_preregistration_draft_previous_academic_info`
--
ALTER TABLE `student_preregistration_draft_previous_academic_info`
  ADD CONSTRAINT `previous_academic_info_application_no` FOREIGN KEY (`application_no`) REFERENCES `student_preregistration_details` (`application_no`);

--
-- Constraints for table `student_preregistration_draft_previous_academic_marks`
--
ALTER TABLE `student_preregistration_draft_previous_academic_marks`
  ADD CONSTRAINT `academic_marks_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `student_preregistration_details` (`application_no`);

--
-- Constraints for table `student_preregistration_login`
--
ALTER TABLE `student_preregistration_login`
  ADD CONSTRAINT `login_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `student_preregistration_details` (`application_no`);

--
-- Constraints for table `users_role`
--
ALTER TABLE `users_role`
  ADD CONSTRAINT `user_role_constraint` FOREIGN KEY (`id`) REFERENCES `users_login` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
