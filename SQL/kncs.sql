-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2020 at 09:07 AM
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
-- Table structure for table `calender`
--

CREATE TABLE `calender` (
  `id` int(11) NOT NULL,
  `day_of_week` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `class_detail`
--

CREATE TABLE `class_detail` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Details to be filled';

-- --------------------------------------------------------

--
-- Table structure for table `subject_detail`
--

CREATE TABLE `subject_detail` (
  `id` int(11) NOT NULL,
  `subject_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Details to be filled';

-- --------------------------------------------------------

--
-- Table structure for table `teacher_detail`
--

CREATE TABLE `teacher_detail` (
  `id` int(11) NOT NULL,
  `teacher name` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Details to be filled';

-- --------------------------------------------------------

--
-- Table structure for table `timetable`
--

CREATE TABLE `timetable` (
  `subject_id` int(11) NOT NULL,
  `calender_date_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL
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
-- Indexes for table `calender`
--
ALTER TABLE `calender`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class_detail`
--
ALTER TABLE `class_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subject_detail`
--
ALTER TABLE `subject_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teacher_detail`
--
ALTER TABLE `teacher_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timetable`
--
ALTER TABLE `timetable`
  ADD PRIMARY KEY (`subject_id`,`calender_date_id`,`class_id`,`teacher_id`,`start_time`),
  ADD KEY `class_timetable_constraint` (`class_id`),
  ADD KEY `teacher_timetable_constraint` (`teacher_id`),
  ADD KEY `calender_timetable_constraint` (`calender_date_id`);

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
-- Constraints for table `timetable`
--
ALTER TABLE `timetable`
  ADD CONSTRAINT `calender_timetable_constraint` FOREIGN KEY (`calender_date_id`) REFERENCES `calender` (`id`),
  ADD CONSTRAINT `class_timetable_constraint` FOREIGN KEY (`class_id`) REFERENCES `class_detail` (`id`),
  ADD CONSTRAINT `subject_timetable_constraint` FOREIGN KEY (`subject_id`) REFERENCES `subject_detail` (`id`),
  ADD CONSTRAINT `teacher_timetable_constraint` FOREIGN KEY (`teacher_id`) REFERENCES `teacher_detail` (`id`);

--
-- Constraints for table `users_role`
--
ALTER TABLE `users_role`
  ADD CONSTRAINT `user_role_constraint` FOREIGN KEY (`id`) REFERENCES `users_login` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
