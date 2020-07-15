-- --------------------------------------------------------

--
-- Table structure for table `calender`
--

CREATE TABLE `calender`
(
    `id`          int(11) NOT NULL,
    `day_of_week` int(11) NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `class_detail`
--

CREATE TABLE `class_detail`
(
    `id` int(11) NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='Details to be filled';

-- --------------------------------------------------------

--
-- Table structure for table `subject_detail`
--

CREATE TABLE `subject_detail`
(
    `id`           int(11)                                NOT NULL,
    `subject_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='Details to be filled';

-- --------------------------------------------------------

--
-- Table structure for table `teacher_detail`
--

CREATE TABLE `teacher_detail`
(
    `id`           int(11) NOT NULL,
    `teacher name` int(11) NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='Details to be filled';

-- --------------------------------------------------------

--
-- Table structure for table `timetable`
--

CREATE TABLE `timetable`
(
    `subject_id`       int(11) NOT NULL,
    `calender_date_id` int(11) NOT NULL,
    `class_id`         int(11) NOT NULL,
    `teacher_id`       int(11) NOT NULL,
    `start_time`       time    NOT NULL,
    `end_time`         time    NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;


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
    ADD PRIMARY KEY (`subject_id`, `calender_date_id`, `class_id`, `teacher_id`, `start_time`),
    ADD KEY `class_timetable_constraint` (`class_id`),
    ADD KEY `teacher_timetable_constraint` (`teacher_id`),
    ADD KEY `calender_timetable_constraint` (`calender_date_id`);

--
-- Constraints for table `timetable`
--
ALTER TABLE `timetable`
    ADD CONSTRAINT `calender_timetable_constraint` FOREIGN KEY (`calender_date_id`) REFERENCES `calender` (`id`),
    ADD CONSTRAINT `class_timetable_constraint` FOREIGN KEY (`class_id`) REFERENCES `class_detail` (`id`),
    ADD CONSTRAINT `subject_timetable_constraint` FOREIGN KEY (`subject_id`) REFERENCES `subject_detail` (`id`),
    ADD CONSTRAINT `teacher_timetable_constraint` FOREIGN KEY (`teacher_id`) REFERENCES `teacher_detail` (`id`);