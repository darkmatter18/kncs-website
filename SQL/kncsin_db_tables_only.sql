-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 01, 2020 at 02:22 PM
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
-- Table structure for table `student_preregistration_details`
--

CREATE TABLE `student_preregistration_details` (
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
  `apply_for_reserved_seat` tinyint(1) NOT NULL,
  `caste_certificate_no` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weather_bpl` tinyint(1) NOT NULL,
  `bpl_card_no` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsapp_no` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_preregistration_draft_declaration_info`
--

CREATE TABLE `student_preregistration_draft_declaration_info` (
  `application_no` int(10) NOT NULL,
  `date` date NOT NULL,
  `place` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
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
  `guardian_same_father` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_preregistration_draft_image`
--

CREATE TABLE `student_preregistration_draft_image` (
  `application_no` int(10) NOT NULL,
  `image_type` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_preregistration_draft_payment_info`
--

CREATE TABLE `student_preregistration_draft_payment_info` (
  `application_no` int(10) NOT NULL,
  `mode_of_payment` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_of_bank` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_date` date NOT NULL,
  `verified_transaction` varchar(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'N' COMMENT 'Default is N and to be updated to Y when verified with Bank'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_preregistration_draft_present_academic`
--

CREATE TABLE `student_preregistration_draft_present_academic` (
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
-- Table structure for table `student_preregistration_draft_previous_academic_info`
--

CREATE TABLE `student_preregistration_draft_previous_academic_info` (
  `application_no` int(10) NOT NULL,
  `previous_school_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year_of_madhyamik` int(4) NOT NULL,
  `previous_student_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
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
  `marks_percentage` float NOT NULL
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
-- Stand-in structure for view `student_records`
-- (See below for the actual view)
--
CREATE TABLE `student_records` (
`application_no` int(10)
,`father_name` varchar(50)
,`previous_school_name` varchar(100)
,`year_of_madhyamik` int(4)
,`previous_student_id` varchar(50)
,`mode_of_payment` varchar(15)
,`name_of_bank` varchar(50)
,`transaction_id` varchar(20)
,`transaction_date` date
,`verified_transaction` varchar(1)
,`stream` varchar(10)
,`first_language` varchar(15)
,`second_language` varchar(15)
,`first_major` varchar(15)
,`second_major` varchar(15)
,`third_major` varchar(15)
,`forth_major` varchar(15)
,`direct_admission` tinyint(1)
,`medium` varchar(10)
,`gender` varchar(10)
,`mother_tongue` varchar(15)
,`apply_for_reserved_seat` tinyint(1)
,`first_name` varchar(50)
,`middle_name` varchar(30)
,`last_name` varchar(50)
,`email` varchar(60)
,`mobile` varchar(10)
,`dob` date
,`status` varchar(15)
,`marks_beng` int(3)
,`marks_engb` int(3)
,`marks_maths` int(3)
,`marks_psc` int(3)
,`marks_lsc` int(3)
,`marks_geo` int(3)
,`marks_hist` int(3)
,`marks_total` int(3)
,`marks_percentage` float
);

-- --------------------------------------------------------

--
-- Table structure for table `users_details`
--

CREATE TABLE `users_details` (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users_login`
--

CREATE TABLE `users_login` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'User name of User',
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Password of the user',
  `last_login` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Last login Timestamp',
  `last_login_ip` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Last login IP'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_role`
--

CREATE TABLE `users_role` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure for view `student_records`
--
DROP TABLE IF EXISTS `student_records`;

CREATE ALGORITHM=UNDEFINED DEFINER=`u572500670_kncsin`@`127.0.0.1` SQL SECURITY DEFINER VIEW `student_records`  AS  select `h`.`application_no` AS `application_no`,`a`.`father_name` AS `father_name`,`b`.`previous_school_name` AS `previous_school_name`,`b`.`year_of_madhyamik` AS `year_of_madhyamik`,`b`.`previous_student_id` AS `previous_student_id`,`c`.`mode_of_payment` AS `mode_of_payment`,`c`.`name_of_bank` AS `name_of_bank`,`c`.`transaction_id` AS `transaction_id`,`c`.`transaction_date` AS `transaction_date`,`c`.`verified_transaction` AS `verified_transaction`,`d`.`stream` AS `stream`,`d`.`first_language` AS `first_language`,`d`.`second_language` AS `second_language`,`d`.`first_major` AS `first_major`,`d`.`second_major` AS `second_major`,`d`.`third_major` AS `third_major`,`d`.`forth_major` AS `forth_major`,`d`.`direct_admission` AS `direct_admission`,`d`.`medium` AS `medium`,`g`.`gender` AS `gender`,`g`.`mother_tongue` AS `mother_tongue`,`g`.`apply_for_reserved_seat` AS `apply_for_reserved_seat`,`h`.`first_name` AS `first_name`,`h`.`middle_name` AS `middle_name`,`h`.`last_name` AS `last_name`,`h`.`email` AS `email`,`h`.`mobile` AS `mobile`,`h`.`dob` AS `dob`,`h`.`status` AS `status`,`j`.`marks_beng` AS `marks_beng`,`j`.`marks_engb` AS `marks_engb`,`j`.`marks_maths` AS `marks_maths`,`j`.`marks_psc` AS `marks_psc`,`j`.`marks_lsc` AS `marks_lsc`,`j`.`marks_geo` AS `marks_geo`,`j`.`marks_hist` AS `marks_hist`,`j`.`marks_total` AS `marks_total`,`j`.`marks_percentage` AS `marks_percentage` from (((((((`student_preregistration_draft_family_info` `a` join `student_preregistration_draft_previous_academic_info` `b`) join `student_preregistration_draft_payment_info` `c`) join `student_preregistration_draft_present_academic` `d`) join `student_preregistration_draft_basic_info` `g`) join `student_preregistration_details` `h`) join `student_preregistration_draft_declaration_info` `i`) join `student_preregistration_draft_previous_academic_marks` `j`) where `h`.`status` in ('SUBMITTED','SELECTED') and `a`.`application_no` = `b`.`application_no` and `b`.`application_no` = `c`.`application_no` and `c`.`application_no` = `d`.`application_no` and `d`.`application_no` = `g`.`application_no` and `g`.`application_no` = `h`.`application_no` and `h`.`application_no` = `i`.`application_no` and `i`.`application_no` = `j`.`application_no` ;

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
-- Indexes for table `student_preregistration_draft_declaration_info`
--
ALTER TABLE `student_preregistration_draft_declaration_info`
  ADD PRIMARY KEY (`application_no`),
  ADD KEY `declaratipn_application_no_constraint` (`application_no`);

--
-- Indexes for table `student_preregistration_draft_family_info`
--
ALTER TABLE `student_preregistration_draft_family_info`
  ADD PRIMARY KEY (`application_no`);

--
-- Indexes for table `student_preregistration_draft_image`
--
ALTER TABLE `student_preregistration_draft_image`
  ADD PRIMARY KEY (`application_no`),
  ADD KEY `image_application_no_constraint` (`application_no`);

--
-- Indexes for table `student_preregistration_draft_payment_info`
--
ALTER TABLE `student_preregistration_draft_payment_info`
  ADD PRIMARY KEY (`application_no`),
  ADD KEY `payment_application_no_constraint` (`application_no`);

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
-- Indexes for table `users_details`
--
ALTER TABLE `users_details`
  ADD PRIMARY KEY (`id`);

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
  ADD CONSTRAINT `address_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `student_preregistration_details` (`application_no`) ON DELETE CASCADE;

--
-- Constraints for table `student_preregistration_draft_basic_info`
--
ALTER TABLE `student_preregistration_draft_basic_info`
  ADD CONSTRAINT `basic_info_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `student_preregistration_details` (`application_no`) ON DELETE CASCADE;

--
-- Constraints for table `student_preregistration_draft_declaration_info`
--
ALTER TABLE `student_preregistration_draft_declaration_info`
  ADD CONSTRAINT `declaration_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `student_preregistration_details` (`application_no`) ON DELETE CASCADE;

--
-- Constraints for table `student_preregistration_draft_family_info`
--
ALTER TABLE `student_preregistration_draft_family_info`
  ADD CONSTRAINT `family_info_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `student_preregistration_details` (`application_no`) ON DELETE CASCADE;

--
-- Constraints for table `student_preregistration_draft_image`
--
ALTER TABLE `student_preregistration_draft_image`
  ADD CONSTRAINT `image_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `student_preregistration_details` (`application_no`) ON DELETE CASCADE;

--
-- Constraints for table `student_preregistration_draft_payment_info`
--
ALTER TABLE `student_preregistration_draft_payment_info`
  ADD CONSTRAINT `payment_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `student_preregistration_details` (`application_no`) ON DELETE CASCADE;

--
-- Constraints for table `student_preregistration_draft_present_academic`
--
ALTER TABLE `student_preregistration_draft_present_academic`
  ADD CONSTRAINT `present_academic_marks_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `student_preregistration_details` (`application_no`) ON DELETE CASCADE;

--
-- Constraints for table `student_preregistration_draft_previous_academic_info`
--
ALTER TABLE `student_preregistration_draft_previous_academic_info`
  ADD CONSTRAINT `previous_academic_info_application_no` FOREIGN KEY (`application_no`) REFERENCES `student_preregistration_details` (`application_no`) ON DELETE CASCADE;

--
-- Constraints for table `student_preregistration_draft_previous_academic_marks`
--
ALTER TABLE `student_preregistration_draft_previous_academic_marks`
  ADD CONSTRAINT `academic_marks_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `student_preregistration_details` (`application_no`) ON DELETE CASCADE;

--
-- Constraints for table `student_preregistration_login`
--
ALTER TABLE `student_preregistration_login`
  ADD CONSTRAINT `login_application_no_constraint` FOREIGN KEY (`application_no`) REFERENCES `student_preregistration_details` (`application_no`) ON DELETE CASCADE;

--
-- Constraints for table `users_details`
--
ALTER TABLE `users_details`
  ADD CONSTRAINT `users_details_1` FOREIGN KEY (`id`) REFERENCES `users_login` (`id`);

--
-- Constraints for table `users_role`
--
ALTER TABLE `users_role`
  ADD CONSTRAINT `user_role_constraint` FOREIGN KEY (`id`) REFERENCES `users_login` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
