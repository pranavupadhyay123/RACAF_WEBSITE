-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1

-- Server version: 10.1.40-MariaDB
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;



--
-- Table structure for table `participants`
--

CREATE TABLE `participants` (
  `p_id` int(6) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `mname` varchar(20) NOT NULL,
  `lname` varchar(20) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `cname` varchar(20) NOT NULL,
  `ccity` varchar(20) NOT NULL,
  `cstate` varchar(20) NOT NULL,
  `course` varchar(25) NOT NULL,
  `emailid` varchar(25) NOT NULL,
  `pnumber` varchar(10) NOT NULL,
  `password` varchar(20) NOT NULL,
  `vkey` varchar(45) NOT NULL,
  `verified` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `participants`
--

INSERT INTO `participants` (`p_id`, `fname`, `mname`, `lname`, `gender`, `cname`, `ccity`, `cstate`, `course`, `emailid`, `pnumber`, `password`, `vkey`, `verified`) VALUES
(3, 'ritika', ' h ', ' jha ', ' femal', ' JNU ', ' DElhi ', ' Delhi ', '  btech ', ' 08ritika ', ' 967246797', ' 08012001 ', '', 1),

-- --------------------------------------------------------

--
-- Table structure for table `participation`
--

CREATE TABLE `participation` (
  `S.NO` int(11) NOT NULL,
  `p_id` int(20) NOT NULL,
  `event_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `participation`
--

INSERT INTO `participation` (`S.NO`, `p_id`, `event_id`) VALUES
(6, 4, 8),




--
-- Indexes for table `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `participation`
--
ALTER TABLE `participation`
  ADD PRIMARY KEY (`S.NO`),
  ADD KEY `fk1_p_id` (`p_id`),
  ADD KEY `fk2_event_id` (`event_id`);

--
-- AUTO_INCREMENT for table `participants`
--
ALTER TABLE `participants`
  MODIFY `p_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
--
-- Constraints for table `participation`
--
ALTER TABLE `participation`
  ADD CONSTRAINT `fk1_p_id` FOREIGN KEY (`p_id`) REFERENCES `participants` (`p_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk2_event_id` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



