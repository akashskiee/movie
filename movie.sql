-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 16, 2021 at 03:23 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movie`
--

-- --------------------------------------------------------

--
-- Table structure for table `billing_plans`
--

CREATE TABLE `billing_plans` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(13,2) DEFAULT NULL,
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency_symbol` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '$',
  `interval` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'month',
  `interval_count` int(11) NOT NULL DEFAULT 1,
  `parent_id` int(11) DEFAULT NULL,
  `legacy_permissions` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paypal_id` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recommended` tinyint(1) NOT NULL DEFAULT 0,
  `free` tinyint(1) NOT NULL DEFAULT 0,
  `show_permissions` tinyint(1) NOT NULL DEFAULT 0,
  `features` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `available_space` bigint(20) UNSIGNED DEFAULT NULL,
  `hidden` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int(10) UNSIGNED DEFAULT NULL,
  `path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `commentable_id` int(10) UNSIGNED NOT NULL,
  `commentable_type` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `creditables`
--

CREATE TABLE `creditables` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `person_id` bigint(20) UNSIGNED NOT NULL,
  `creditable_id` bigint(20) UNSIGNED NOT NULL,
  `character` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `department` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creditable_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `css_themes`
--

CREATE TABLE `css_themes` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_dark` tinyint(1) NOT NULL DEFAULT 0,
  `default_light` tinyint(1) NOT NULL DEFAULT 0,
  `default_dark` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT NULL,
  `colors` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `css_themes`
--

INSERT INTO `css_themes` (`id`, `name`, `is_dark`, `default_light`, `default_dark`, `user_id`, `colors`, `created_at`, `updated_at`) VALUES
(1, 'Dark', 1, 0, 1, 1, '{\"--be-primary-lighter\":\"#333333\",\"--be-primary-default\":\"#242424\",\"--be-primary-darker\":\"#1e1e1e\",\"--be-accent-default\":\"#F65F54\",\"--be-accent-lighter\":\"#FCC7C3\",\"--be-accent-contrast\":\"rgba(255, 255, 255, 1)\",\"--be-accent-emphasis\":\"rgba(233,236,254,0.1)\",\"--be-foreground-base\":\"#fff\",\"--be-text\":\"#fff\",\"--be-hint-text\":\"rgba(255, 255, 255, 0.5)\",\"--be-secondary-text\":\"rgba(255, 255, 255, 0.7)\",\"--be-label\":\"rgba(255, 255, 255, 0.7)\",\"--be-background\":\"#1D1D1D\",\"--be-background-alternative\":\"#121212\",\"--be-divider-lighter\":\"rgba(255, 255, 255, 0.06)\",\"--be-divider-default\":\"rgba(255, 255, 255, 0.12)\",\"--be-disabled-button-text\":\"rgba(255, 255, 255, 0.3)\",\"--be-disabled-toggle\":\"#000\",\"--be-chip\":\"#616161\",\"--be-hover\":\"rgba(255, 255, 255, 0.04)\",\"--be-selected-button\":\"#212121\",\"--be-disabled-button\":\"rgba(255, 255, 255, 0.12)\",\"--be-raised-button\":\"#424242\",\"--be-backdrop\":\"#BDBDBD\",\"--be-link\":\"#c5cae9\"}', '2021-11-16 08:28:28', '2021-11-16 08:28:28'),
(2, 'Light', 0, 1, 0, 1, '{\"--be-primary-lighter\":\"#37474f\",\"--be-primary-default\":\"#263238\",\"--be-primary-darker\":\"#1C262B\",\"--be-accent-default\":\"#F44336\",\"--be-accent-lighter\":\"#FCC7C3\",\"--be-accent-contrast\":\"rgba(255, 255, 255, 1)\",\"--be-accent-emphasis\":\"rgba(252,199,195,0.1)\",\"--be-background\":\"rgb(255, 255, 255)\",\"--be-background-alternative\":\"rgb(250, 250, 250)\",\"--be-foreground-base\":\"black\",\"--be-text\":\"rgba(0, 0, 0, 0.87)\",\"--be-hint-text\":\"rgba(0, 0, 0, 0.38)\",\"--be-secondary-text\":\"rgba(0, 0, 0, 0.54)\",\"--be-label\":\"rgba(0, 0, 0, 0.87)\",\"--be-disabled-button-text\":\"rgba(0, 0, 0, 0.26)\",\"--be-divider-lighter\":\"rgba(0, 0, 0, 0.06)\",\"--be-divider-default\":\"rgba(0, 0, 0, 0.12)\",\"--be-hover\":\"rgba(0,0,0,0.04)\",\"--be-selected-button\":\"rgb(224, 224, 224)\",\"--be-chip\":\"#e0e0e0\",\"--be-link\":\"#3f51b5\",\"--be-backdrop\":\"black\",\"--be-raised-button\":\"#fff\",\"--be-disabled-toggle\":\"rgb(238, 238, 238)\",\"--be-disabled-button\":\"rgba(0, 0, 0, 0.12)\"}', '2021-11-16 08:28:28', '2021-11-16 08:28:28');

-- --------------------------------------------------------

--
-- Table structure for table `csv_exports`
--

CREATE TABLE `csv_exports` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cache_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `download_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `custom_domains`
--

CREATE TABLE `custom_domains` (
  `id` int(10) UNSIGNED NOT NULL,
  `host` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `global` tinyint(1) NOT NULL DEFAULT 0,
  `resource_id` int(10) UNSIGNED DEFAULT NULL,
  `resource_type` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `workspace_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `custom_pages`
--

CREATE TABLE `custom_pages` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `meta` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `hide_nav` tinyint(1) NOT NULL DEFAULT 0,
  `workspace_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `custom_pages`
--

INSERT INTO `custom_pages` (`id`, `title`, `body`, `slug`, `meta`, `type`, `created_at`, `updated_at`, `user_id`, `hide_nav`, `workspace_id`) VALUES
(1, 'Privacy Policy', '<h1>Example Privacy Policy</h1><p>The standard Lorem Ipsum passage, used since the 1500s\n    \"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"</p>\n\n<p>Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC\n    \"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\"</p>\n\n<p>1914 translation by H. Rackham\n    \"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\"</p>\n\n<p>Section 1.10.33 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC\n    \"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\"</p>\n\n<p>1914 translation by H. Rackham\n    \"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.\"</p>', 'privacy-policy', NULL, 'default', '2021-11-16 08:28:28', '2021-11-16 08:28:28', NULL, 0, NULL),
(2, 'Terms of Service', '<h1>Example Terms of Service</h1><p>The standard Lorem Ipsum passage, used since the 1500s\n    \"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"</p>\n\n<p>Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC\n    \"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\"</p>\n\n<p>1914 translation by H. Rackham\n    \"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\"</p>\n\n<p>Section 1.10.33 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC\n    \"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\"</p>\n\n<p>1914 translation by H. Rackham\n    \"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.\"</p>', 'terms-of-service', NULL, 'default', '2021-11-16 08:28:28', '2021-11-16 08:28:28', NULL, 0, NULL),
(3, 'About Us', '<h1>Example About Us</h1><p>The standard Lorem Ipsum passage, used since the 1500s\n    \"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"</p>\n\n<p>Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC\n    \"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\"</p>\n\n<p>1914 translation by H. Rackham\n    \"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\"</p>\n\n<p>Section 1.10.33 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC\n    \"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\"</p>\n\n<p>1914 translation by H. Rackham\n    \"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.\"</p>', 'about-us', NULL, 'default', '2021-11-16 08:28:28', '2021-11-16 08:28:28', NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `episodes`
--

CREATE TABLE `episodes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `poster` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `release_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title_id` bigint(20) UNSIGNED NOT NULL,
  `season_id` bigint(20) UNSIGNED NOT NULL,
  `season_number` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `episode_number` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `allow_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `temp_id` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tmdb_vote_count` int(10) UNSIGNED DEFAULT NULL,
  `tmdb_vote_average` decimal(3,1) DEFAULT NULL,
  `local_vote_average` decimal(3,1) DEFAULT NULL,
  `year` smallint(5) UNSIGNED DEFAULT NULL,
  `popularity` int(10) UNSIGNED DEFAULT NULL,
  `local_vote_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `file_entries`
--

CREATE TABLE `file_entries` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_size` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `mime` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `extension` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `public` tinyint(1) NOT NULL DEFAULT 0,
  `disk_prefix` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `description` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `path` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preview_token` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thumbnail` tinyint(1) NOT NULL DEFAULT 0,
  `owner_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `file_entry_models`
--

CREATE TABLE `file_entry_models` (
  `id` int(10) UNSIGNED NOT NULL,
  `file_entry_id` int(10) UNSIGNED NOT NULL,
  `model_id` int(10) UNSIGNED NOT NULL,
  `model_type` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `owner` tinyint(1) NOT NULL DEFAULT 0,
  `permissions` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(10) UNSIGNED NOT NULL,
  `local` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `web` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'external',
  `url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `source` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'local',
  `model_id` int(11) NOT NULL,
  `model_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(10) UNSIGNED NOT NULL,
  `subscription_id` int(11) NOT NULL,
  `paid` tinyint(1) NOT NULL,
  `uuid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `links`
--

CREATE TABLE `links` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'embed',
  `label` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title_id` bigint(20) UNSIGNED DEFAULT NULL,
  `season` int(10) UNSIGNED DEFAULT NULL,
  `episode` int(10) UNSIGNED DEFAULT NULL,
  `reports` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `temp_id` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `positive_votes` int(11) NOT NULL DEFAULT 0,
  `negative_votes` int(11) NOT NULL DEFAULT 0,
  `quality` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'SD'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `listables`
--

CREATE TABLE `listables` (
  `id` int(10) UNSIGNED NOT NULL,
  `list_id` int(10) UNSIGNED NOT NULL,
  `listable_id` int(10) UNSIGNED NOT NULL,
  `listable_type` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lists`
--

CREATE TABLE `lists` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `system` tinyint(1) NOT NULL DEFAULT 0,
  `public` tinyint(1) NOT NULL DEFAULT 0,
  `auto_update` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `style` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lists`
--

INSERT INTO `lists` (`id`, `name`, `description`, `user_id`, `system`, `public`, `auto_update`, `created_at`, `updated_at`, `style`, `image`) VALUES
(1, 'watchlist', NULL, 1, 1, 0, NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `localizations`
--

CREATE TABLE `localizations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `language` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `localizations`
--

INSERT INTO `localizations` (`id`, `name`, `created_at`, `updated_at`, `language`) VALUES
(1, 'english', '2021-11-16 08:28:28', '2021-11-16 08:28:28', 'en');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2013_12_06_201055_create_titles', 1),
(2, '2013_12_07_105031_create_actors', 1),
(3, '2013_12_07_105130_create_options', 1),
(4, '2013_12_07_105216_create_actors_titles', 1),
(5, '2013_12_07_105324_create_episodes', 1),
(6, '2013_12_07_105409_create_images', 1),
(7, '2013_12_07_105420_create_news', 1),
(8, '2013_12_07_105432_create_reviews', 1),
(9, '2013_12_07_105447_create_seasons', 1),
(10, '2013_12_07_120703_create_throttle', 1),
(11, '2014_01_02_134303_add_columns_to_titles', 1),
(12, '2014_01_02_211657_add_columns_to_news', 1),
(13, '2014_06_16_148413_add_type_to_images_table', 1),
(14, '2014_06_17_145413_add_type_to_reviews_table', 1),
(15, '2014_06_29_2101055_create_links', 1),
(16, '2014_10_12_000000_create_users_table', 1),
(17, '2014_10_12_100000_create_password_resets_table', 1),
(18, '2014_10_13_211658_add_columns_to_users', 1),
(19, '2014_10_30_132541_add_indexes', 1),
(20, '2015_04_127_156842_create_social_profiles_table', 1),
(21, '2015_04_127_156842_create_users_oauth_table', 1),
(22, '2015_05_29_131549_create_settings_table', 1),
(23, '2015_07_24_132662_add_new_columns_to_links_table', 1),
(24, '2015_10_03_123936_drop_legacy_v1_tables', 1),
(25, '2015_10_25_136541_add_indexes_to_titles_table', 1),
(26, '2016_05_12_190852_create_tags_table', 1),
(27, '2016_05_12_190958_create_taggables_table', 1),
(28, '2016_05_26_170044_create_uploads_table', 1),
(29, '2016_05_27_143158_create_uploadables_table', 1),
(30, '2016_07_14_153703_create_groups_table', 1),
(31, '2016_07_14_153921_create_user_group_table', 1),
(32, '2017_03_20_136542_add_index_to_tmdb_popularity_field', 1),
(33, '2017_07_02_120142_create_pages_table', 1),
(34, '2017_07_11_122825_create_localizations_table', 1),
(35, '2017_08_26_131330_add_private_field_to_settings_table', 1),
(36, '2017_09_17_144728_add_columns_to_users_table', 1),
(37, '2017_09_17_152854_make_password_column_nullable', 1),
(38, '2017_09_30_152855_make_settings_value_column_nullable', 1),
(39, '2017_10_01_152897_add_public_column_to_uploads_table', 1),
(40, '2017_12_04_132911_add_avatar_column_to_users_table', 1),
(41, '2018_01_10_140732_create_subscriptions_table', 1),
(42, '2018_01_10_140746_add_billing_to_users_table', 1),
(43, '2018_01_10_161706_create_billing_plans_table', 1),
(44, '2018_07_24_113757_add_available_space_to_billing_plans_table', 1),
(45, '2018_07_24_124254_add_available_space_to_users_table', 1),
(46, '2018_07_26_142339_rename_groups_to_roles', 1),
(47, '2018_07_26_142842_rename_user_role_table_columns_to_roles', 1),
(48, '2018_08_07_124200_rename_uploads_to_file_entries', 1),
(49, '2018_08_07_124327_refactor_file_entries_columns', 1),
(50, '2018_08_07_130653_add_folder_path_column_to_file_entries_table', 1),
(51, '2018_08_07_140440_migrate_file_entry_users_to_many_to_many', 1),
(52, '2018_08_15_132225_move_uploads_into_subfolders', 1),
(53, '2018_08_31_104145_rename_uploadables_table', 1),
(54, '2018_08_31_104325_rename_file_entry_models_table_columns', 1),
(55, '2018_10_04_123935_create_videos_table', 1),
(56, '2018_10_04_125553_update_images_table_to_v2', 1),
(57, '2018_10_04_131546_update_titles_table_to_v2', 1),
(58, '2018_10_04_133231_rename_actors_table', 1),
(59, '2018_10_04_133350_rename_person_title_columns', 1),
(60, '2018_10_04_133351_rename_char_name_to_creditable', 1),
(61, '2018_10_05_103825_update_people_table_to_v2', 1),
(62, '2018_10_09_131127_create_lists_table', 1),
(63, '2018_10_09_131254_create_listables_table', 1),
(64, '2018_10_13_125603_update_episodes_table_to_v2', 1),
(65, '2018_10_20_121154_update_seasons_to_v2', 1),
(66, '2018_11_06_140954_create_watchlist_for_existing_users', 1),
(67, '2018_11_18_124914_update_reviews_table_to_v2', 1),
(68, '2018_11_26_171703_add_type_and_title_columns_to_pages_table', 1),
(69, '2018_12_01_144233_change_unique_index_on_tags_table', 1),
(70, '2018_12_07_144126_create_video_ratings_table', 1),
(71, '2018_12_26_145237_migrate_legacy_titles_table_data_to_v2', 1),
(72, '2018_12_28_130817_MigrateLegacyLinksToVideosTable', 1),
(73, '2018_12_29_145238_migrate_indexes_to_v2', 1),
(74, '2019_01_08_175730_add_show_video_column_to_titles_table', 1),
(75, '2019_02_16_150049_delete_old_seo_settings', 1),
(76, '2019_02_24_141457_create_jobs_table', 1),
(77, '2019_03_03_134511_add_adult_column_to_titles_and_people', 1),
(78, '2019_03_11_162627_add_preview_token_to_file_entries_table', 1),
(79, '2019_03_12_160803_add_thumbnail_column_to_file_entries_table', 1),
(80, '2019_03_16_161836_add_paypal_id_column_to_billing_plans_table', 1),
(81, '2019_05_14_120930_index_description_column_in_file_entries_table', 1),
(82, '2019_06_08_120504_create_custom_domains_table', 1),
(83, '2019_06_13_140318_add_user_id_column_to_pages_table', 1),
(84, '2019_06_15_114320_rename_pages_table_to_custom_pages', 1),
(85, '2019_06_18_133933_create_permissions_table', 1),
(86, '2019_06_18_134203_create_permissionables_table', 1),
(87, '2019_06_18_135822_rename_permissions_columns', 1),
(88, '2019_06_25_133852_move_inline_permissions_to_separate_table', 1),
(89, '2019_07_08_122001_create_css_themes_table', 1),
(90, '2019_07_20_141752_create_invoices_table', 1),
(91, '2019_08_19_121112_add_global_column_to_custom_domains_table', 1),
(92, '2019_08_26_180056_add_order_column_to_images_table', 1),
(93, '2019_08_28_162643_index_vote_columns_in_videos_table', 1),
(94, '2019_08_28_165028_add_user_id_to_videos_table', 1),
(95, '2019_08_29_174114_add_language_column_to_videos_table', 1),
(96, '2019_08_29_180920_create_video_reports_table', 1),
(97, '2019_09_04_203002_create_video_captions_table', 1),
(98, '2019_09_06_142457_add_fulltext_index_to_titles_and_people', 1),
(99, '2019_09_09_161413_add_category_column_to_videos_table', 1),
(100, '2019_09_13_141123_change_plan_amount_to_float', 1),
(101, '2019_10_14_171943_add_index_to_username_column', 1),
(102, '2019_10_20_143522_create_comments_table', 1),
(103, '2019_10_23_134520_create_notifications_table', 1),
(104, '2019_11_21_144956_add_resource_id_and_type_to_custom_domains_table', 1),
(105, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(106, '2019_12_14_194512_rename_public_path_column_to_disk_prefix', 1),
(107, '2019_12_24_165237_change_file_size_column_default_value_to_0', 1),
(108, '2019_12_28_190836_update_file_entry_models_table_to_v2', 1),
(109, '2019_12_28_191105_move_user_file_entry_table_records_to_file_entry_models', 1),
(110, '2020_01_26_143733_create_notification_subscriptions_table', 1),
(111, '2020_03_03_140720_add_language_col_to_localizations_table', 1),
(112, '2020_03_03_143142_add_lang_code_to_existing_localizations', 1),
(113, '2020_04_14_163347_add_hidden_column_to_plans_table', 1),
(114, '2020_05_10_174904_create_video_plays_table', 1),
(115, '2020_05_13_163620_add_local_vote_count_column_to_titles_and_episodes_table', 1),
(116, '2020_05_13_163817_hydrate_local_vote_count_column', 1),
(117, '2020_05_16_163120_add_billing_columns_to_users_table', 1),
(118, '2020_06_27_180040_add_verified_at_column_to_users_table', 1),
(119, '2020_06_27_180253_move_confirmed_column_to_email_verified_at', 1),
(120, '2020_07_15_144024_fix_issues_with_migration_to_laravel_7', 1),
(121, '2020_07_19_163023_add_style_column_to_lists_table', 1),
(122, '2020_07_22_165126_create_workspaces_table', 1),
(123, '2020_07_23_145652_create_workspace_invites_table', 1),
(124, '2020_07_23_164502_create_workspace_user_table', 1),
(125, '2020_07_26_165349_add_columns_to_roles_table', 1),
(126, '2020_07_29_141418_add_workspace_id_column_to_workspaceable_models', 1),
(127, '2020_07_30_152330_add_type_column_to_permissions_table', 1),
(128, '2020_08_29_165057_add_hide_nav_column_to_custom_pages_table', 1),
(129, '2021_04_22_172459_add_internal_columm_to_roles_table', 1),
(130, '2021_05_03_173446_add_deleted_column_to_comments_table', 1),
(131, '2021_05_12_164940_add_advanced_column_to_permissions_table', 1),
(132, '2021_06_04_143405_add_workspace_id_col_to_custom_domains_table', 1),
(133, '2021_06_04_143406_add_workspace_id_col_to_custom_pages_table', 1),
(134, '2021_06_05_182202_create_csv_exports_table', 1),
(135, '2021_06_18_161030_rename_gateway_col_in_subscriptions_table', 1),
(136, '2021_06_19_111939_add_owner_id_column_to_file_entries_table', 1),
(137, '2021_06_19_112035_materialize_owner_id_in_file_entries_table', 1),
(138, '2021_07_17_093454_add_created_at_col_to_user_role_table', 1),
(139, '2021_08_18_150359_migrate_video_plays_table_to_v2', 1),
(140, '2021_08_20_163217_update_list_media_view', 1),
(141, '2021_08_21_165826_add_imge_column_to_lists_table', 1),
(142, '2021_08_21_170945_hydrate_list_image_column', 1),
(143, '2021_08_23_141541_add_episode_id_col_to_videos_table', 1),
(144, '2021_08_23_175802_rename_episode_and_season_columns_in_videos_table', 1),
(145, '2021_08_24_172647_hydrate_episode_id_column_in_videos_table', 1),
(146, '2021_08_24_180514_lowercase_custom_seo_in_settings_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_id` bigint(20) UNSIGNED NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification_subscriptions`
--

CREATE TABLE `notification_subscriptions` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notif_id` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `channels` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birth_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birth_place` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `poster` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imdb_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `views` bigint(20) NOT NULL DEFAULT 1,
  `tmdb_id` bigint(20) UNSIGNED DEFAULT NULL,
  `allow_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `fully_synced` tinyint(1) NOT NULL,
  `known_for` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `popularity` int(11) NOT NULL DEFAULT 0,
  `death_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adult` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissionables`
--

CREATE TABLE `permissionables` (
  `id` int(10) UNSIGNED NOT NULL,
  `permission_id` int(11) NOT NULL,
  `permissionable_id` int(11) NOT NULL,
  `permissionable_type` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `restrictions` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissionables`
--

INSERT INTO `permissionables` (`id`, `permission_id`, `permissionable_id`, `permissionable_type`, `restrictions`) VALUES
(1, 1, 1, 'App\\User', NULL),
(2, 10, 1, 'Common\\Auth\\Roles\\Role', '[]'),
(3, 19, 1, 'Common\\Auth\\Roles\\Role', '[]'),
(4, 23, 1, 'Common\\Auth\\Roles\\Role', '[]'),
(5, 27, 1, 'Common\\Auth\\Roles\\Role', '[]'),
(6, 33, 1, 'Common\\Auth\\Roles\\Role', '[]'),
(7, 38, 1, 'Common\\Auth\\Roles\\Role', '[]'),
(8, 49, 1, 'Common\\Auth\\Roles\\Role', '[]'),
(9, 53, 1, 'Common\\Auth\\Roles\\Role', '[]'),
(10, 54, 1, 'Common\\Auth\\Roles\\Role', '[]'),
(11, 57, 1, 'Common\\Auth\\Roles\\Role', '[]'),
(12, 58, 1, 'Common\\Auth\\Roles\\Role', '[]'),
(13, 61, 1, 'Common\\Auth\\Roles\\Role', '[]'),
(14, 65, 1, 'Common\\Auth\\Roles\\Role', '[]'),
(15, 69, 1, 'Common\\Auth\\Roles\\Role', '[]'),
(16, 70, 1, 'Common\\Auth\\Roles\\Role', '[]'),
(17, 71, 1, 'Common\\Auth\\Roles\\Role', '[]'),
(18, 75, 1, 'Common\\Auth\\Roles\\Role', '[]'),
(19, 76, 1, 'Common\\Auth\\Roles\\Role', '[]'),
(20, 10, 2, 'Common\\Auth\\Roles\\Role', '[]'),
(21, 23, 2, 'Common\\Auth\\Roles\\Role', '[]'),
(22, 27, 2, 'Common\\Auth\\Roles\\Role', '[]'),
(23, 33, 2, 'Common\\Auth\\Roles\\Role', '[]'),
(24, 38, 2, 'Common\\Auth\\Roles\\Role', '[]'),
(25, 49, 2, 'Common\\Auth\\Roles\\Role', '[]'),
(26, 53, 2, 'Common\\Auth\\Roles\\Role', '[]'),
(27, 57, 2, 'Common\\Auth\\Roles\\Role', '[]'),
(28, 61, 2, 'Common\\Auth\\Roles\\Role', '[]'),
(29, 65, 2, 'Common\\Auth\\Roles\\Role', '[]'),
(30, 70, 2, 'Common\\Auth\\Roles\\Role', '[]'),
(31, 71, 2, 'Common\\Auth\\Roles\\Role', '[]'),
(32, 75, 2, 'Common\\Auth\\Roles\\Role', '[]');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `restrictions` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sitewide',
  `advanced` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `display_name`, `description`, `group`, `restrictions`, `created_at`, `updated_at`, `type`, `advanced`) VALUES
(1, 'admin', 'Super Admin', 'Give all permissions to user.', 'admin', NULL, '2021-11-16 08:28:28', '2021-11-16 08:28:28', 'sitewide', 0),
(2, 'admin.access', 'Access Admin', 'Required in order to access any admin area page.', 'admin', NULL, '2021-11-16 08:28:28', '2021-11-16 08:28:28', 'sitewide', 0),
(3, 'appearance.update', 'Update Appearance', 'Allows access to appearance editor.', 'admin', NULL, '2021-11-16 08:28:28', '2021-11-16 08:28:28', 'sitewide', 0),
(4, 'reports.view', 'View Reports', 'Allows access to analytics page in admin area.', 'admin', NULL, '2021-11-16 08:28:28', '2021-11-16 08:28:28', 'sitewide', 0),
(5, 'api.access', 'Access Api', 'Required in order for users to be able to use the API.', 'api', NULL, '2021-11-16 08:28:28', '2021-11-16 08:28:28', 'sitewide', 0),
(6, 'roles.view', 'View Roles', 'Allow viewing ALL roles.', 'roles', NULL, '2021-11-16 08:28:28', '2021-11-16 08:28:28', 'sitewide', 1),
(7, 'roles.create', 'Create Roles', 'Allow creating new roles.', 'roles', NULL, '2021-11-16 08:28:28', '2021-11-16 08:28:28', 'sitewide', 1),
(8, 'roles.update', 'Update Roles', 'Allow updating ALL roles.', 'roles', NULL, '2021-11-16 08:28:28', '2021-11-16 08:28:28', 'sitewide', 1),
(9, 'roles.delete', 'Delete Roles', 'Allow deleting ALL roles.', 'roles', NULL, '2021-11-16 08:28:28', '2021-11-16 08:28:28', 'sitewide', 1),
(10, 'custom_pages.view', 'View Custom Pages', 'Allow viewing of all pages on the site, regardless of who created them. User can view their own pages without this permission.', 'custom_pages', NULL, '2021-11-16 08:28:28', '2021-11-16 08:28:28', 'sitewide', 1),
(11, 'custom_pages.create', 'Create Custom Pages', 'Allow creating new custom pages.', 'custom_pages', '[{\"name\":\"count\",\"type\":\"number\",\"description\":\"policies.count_description\"}]', '2021-11-16 08:28:28', '2021-11-16 08:28:28', 'sitewide', 1),
(12, 'custom_pages.update', 'Update Custom Pages', 'Allow editing of all pages on the site, regardless of who created them. User can edit their own pages without this permission.', 'custom_pages', NULL, '2021-11-16 08:28:28', '2021-11-16 08:28:28', 'sitewide', 1),
(13, 'custom_pages.delete', 'Delete Custom Pages', 'Allow deleting of all pages on the site, regardless of who created them. User can delete their own pages without this permission.', 'custom_pages', NULL, '2021-11-16 08:28:28', '2021-11-16 08:28:28', 'sitewide', 1),
(14, 'custom_domains.view', 'View Custom Domains', 'Allow viewing all domains on the site, regardless of who created them. User can view their own domains without this permission.', 'custom_domains', NULL, '2021-11-16 08:28:28', '2021-11-16 08:28:28', 'sitewide', 1),
(15, 'custom_domains.create', 'Create Custom Domains', 'Allow user to connect their own custom domains.', 'custom_domains', '[{\"name\":\"count\",\"type\":\"number\",\"description\":\"policies.count_description\"}]', '2021-11-16 08:28:28', '2021-11-16 08:28:28', 'sitewide', 0),
(16, 'custom_domains.update', 'Update Custom Domains', 'Allow editing all domains on the site, regardless of who created them. User can edit their own domains without this permission.', 'custom_domains', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(17, 'custom_domains.delete', 'Delete Custom Domains', 'Allow deleting all domains on the site, regardless of who created them. User can delete their own domains without this permission.', 'custom_domains', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(18, 'files.view', 'View Files', 'Allow viewing all uploaded files on the site. Users can view their own uploads without this permission.', 'files', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(19, 'files.create', 'Create Files', 'Allow uploading files on the site. This permission is used by any page where it is possible for user to upload files.', 'files', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(20, 'files.update', 'Update Files', 'Allow editing all uploaded files on the site. Users can edit their own uploads without this permission.', 'files', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(21, 'files.delete', 'Delete Files', 'Allow deleting all uploaded files on the site. Users can delete their own uploads (where applicable) without this permission.', 'files', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(22, 'files.download', 'Download Files', 'Allow downloading all uploaded files on the site. Users can download their own uploads (where applicable) without this permission.', 'files', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(23, 'users.view', 'View Users', 'Allow viewing user profile pages on the site. User can view their own profile without this permission.', 'users', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 0),
(24, 'users.create', 'Create Users', 'Allow creating users from admin area. Users can register for new accounts without this permission. Registration can be disabled from settings page.', 'users', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(25, 'users.update', 'Update Users', 'Allow editing details of any user on the site. User can edit their own details without this permission.', 'users', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(26, 'users.delete', 'Delete Users', 'Allow deleting any user on the site. User can request deletion of their own account without this permission.', 'users', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(27, 'localizations.view', 'View Localizations', 'Allow viewing ALL localizations.', 'localizations', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(28, 'localizations.create', 'Create Localizations', 'Allow creating new localizations.', 'localizations', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(29, 'localizations.update', 'Update Localizations', 'Allow updating ALL localizations.', 'localizations', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(30, 'localizations.delete', 'Delete Localizations', 'Allow deleting ALL localizations.', 'localizations', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(31, 'settings.view', 'View Settings', 'Allow viewing ALL settings.', 'settings', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(32, 'settings.update', 'Update Settings', 'Allow updating ALL settings.', 'settings', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(33, 'plans.view', 'View Plans', 'Allow viewing ALL plans.', 'plans', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(34, 'plans.create', 'Create Plans', 'Allow creating new plans.', 'plans', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(35, 'plans.update', 'Update Plans', 'Allow updating ALL plans.', 'plans', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(36, 'plans.delete', 'Delete Plans', 'Allow deleting ALL plans.', 'plans', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(37, 'invoices.view', 'View Invoices', 'Allow viewing ALL invoices.', 'invoices', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(38, 'tags.view', 'View Tags', 'Allow viewing ALL tags.', 'tags', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(39, 'tags.create', 'Create Tags', 'Allow creating new tags.', 'tags', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(40, 'tags.update', 'Update Tags', 'Allow updating ALL tags.', 'tags', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(41, 'tags.delete', 'Delete Tags', 'Allow deleting ALL tags.', 'tags', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(42, 'workspaces.view', 'View Workspaces', 'Allow viewing ALL workspaces.', 'workspaces', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 0),
(43, 'workspaces.create', 'Create Workspaces', 'Allow creating new workspaces.', 'workspaces', '[{\"name\":\"count\",\"type\":\"number\",\"description\":\"policies.count_description\"},{\"name\":\"member_count\",\"type\":\"number\",\"description\":\"Maximum number of members workspace is allowed to have.\"}]', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 0),
(44, 'workspaces.update', 'Update Workspaces', 'Allow updating ALL workspaces.', 'workspaces', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 0),
(45, 'workspaces.delete', 'Delete Workspaces', 'Allow deleting ALL workspaces.', 'workspaces', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 0),
(46, 'workspace_members.invite', 'Invite Members', 'Allow user to invite new members into a workspace.', 'workspace_members', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'workspace', 0),
(47, 'workspace_members.update', 'Update Members', 'Allow user to change role of other members.', 'workspace_members', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'workspace', 0),
(48, 'workspace_members.delete', 'Delete Members', 'Allow user to remove members from workspace.', 'workspace_members', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'workspace', 0),
(49, 'titles.view', 'View Titles', 'Allow viewing movies, series and episodes on the site.', 'titles', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 0),
(50, 'titles.create', 'Create Titles', 'Allow user to create new movies, series and episodes from admin area.', 'titles', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(51, 'titles.update', 'Update Titles', 'Allow user to update all titles on the site.', 'titles', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(52, 'titles.delete', 'Delete Titles', 'Allow user to delete all titles on the site.', 'titles', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(53, 'comments.view', 'View Comments', 'Allow viewing comments on the site.', 'comments', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 0),
(54, 'comments.create', 'Create Comments', 'Allow creating new comments.', 'comments', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 0),
(55, 'comments.update', 'Update Comments', 'Allow editing of all comments, whether user created that comment or not. User can edit their own comments without this permission.', 'comments', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(56, 'comments.delete', 'Delete Comments', 'Allow deleting any comment, whether user created that comment or not. User can delete their own comments without this permission.', 'comments', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(57, 'reviews.view', 'View Reviews', 'Allow user to view reviews left by other users.', 'reviews', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 0),
(58, 'reviews.create', 'Create Reviews', 'Allow user to rate movies and series.', 'reviews', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 0),
(59, 'reviews.update', 'Update Reviews', 'Allow editing of all reviews on the site, regardless of who created them. User can edit reviews they have created without this permission.', 'reviews', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(60, 'reviews.delete', 'Delete Reviews', 'Allow deletion of all reviews on the site, regardless of who created them. User can delete reviews they have created without this permission.', 'reviews', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(61, 'people.view', 'View People', 'Allow viewing actor pages on the site.', 'people', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 0),
(62, 'people.create', 'Create People', 'Allow user to create new actors from admin area.', 'people', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(63, 'people.update', 'Update People', 'Allow user to update all actors on the site.', 'people', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(64, 'people.delete', 'Delete People', 'Allow user to delete all actors on the site.', 'people', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(65, 'news.view', 'View News', 'Allow viewing of all news articles on the site, regardless of who created them. User can view articles they created without this permission.', 'news', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(66, 'news.create', 'Create News', 'Allow users to create news articles.', 'news', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 0),
(67, 'news.update', 'Update News', 'Allow editing of all news articles on the site, regardless of who created them. User can edit articles they have created without this permission.', 'news', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(68, 'news.delete', 'Delete News', 'Allow deleting of all news on the site, regardless of who created them. User can delete articles they have created without this permission.', 'news', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(69, 'videos.rate', 'Rate Videos', 'Allow user to rate videos on the site.', 'videos', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 0),
(70, 'videos.view', 'View Videos', 'Allow user to view videos on the site. This will only show video thumbnail and title, but not allow video playback.', 'videos', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 0),
(71, 'videos.play', 'Play Videos', 'Allow user to play videos on the site.', 'videos', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 0),
(72, 'videos.create', 'Create Videos', 'Allow creating new videos from title/episode page or from admin area.', 'videos', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 0),
(73, 'videos.update', 'Update Videos', 'Allow editing of all videos on the site, regardless of who created them. User can edit their own videos without this permission.', 'videos', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(74, 'videos.delete', 'Delete Videos', 'Allow deleting of all videos on the site, regardless of who created them. User can delete their own videos without this permission.', 'videos', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(75, 'lists.view', 'View Lists', 'Allow viewing of all lists on the site, regardless of who created them. User can view their own lists without this permission.', 'lists', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(76, 'lists.create', 'Create Lists', 'Allow users to create lists.', 'lists', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 0),
(77, 'lists.update', 'Update Lists', 'Allow editing of all lists on the site, regardless of who created them. User can edit their own lists without this permission.', 'lists', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1),
(78, 'lists.delete', 'Delete Lists', 'Allow deleting of all lists on the site, regardless of who created them. User can delete their own lists without this permission.', 'lists', NULL, '2021-11-16 08:28:29', '2021-11-16 08:28:29', 'sitewide', 1);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `author` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `source` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `body` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reviewable_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'critic',
  `reviewable_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `legacy_permissions` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `default` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `guests` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sitewide',
  `internal` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `legacy_permissions`, `default`, `guests`, `created_at`, `updated_at`, `description`, `type`, `internal`) VALUES
(1, 'users', NULL, 1, 0, '2021-11-16 08:28:29', '2021-11-16 08:28:29', NULL, 'sitewide', 0),
(2, 'guests', NULL, 0, 1, '2021-11-16 08:28:29', '2021-11-16 08:28:29', NULL, 'sitewide', 0);

-- --------------------------------------------------------

--
-- Table structure for table `seasons`
--

CREATE TABLE `seasons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `release_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `poster` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number` int(11) NOT NULL DEFAULT 1,
  `title_id` bigint(20) UNSIGNED DEFAULT NULL,
  `title_tmdb_id` bigint(20) UNSIGNED DEFAULT NULL,
  `allow_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `episode_count` int(11) NOT NULL,
  `fully_synced` tinyint(3) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `private` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `name`, `value`, `created_at`, `updated_at`, `private`) VALUES
(1, 'dates.format', 'yyyy-MM-dd', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(2, 'dates.locale', 'en_US', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(3, 'social.google.enable', 'true', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(4, 'social.twitter.enable', 'true', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(5, 'social.facebook.enable', 'true', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(6, 'realtime.enable', 'false', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(7, 'registration.disable', 'false', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(8, 'cache.report_minutes', '60', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(9, 'branding.favicon', 'client/favicon/icon-144x144.png', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(10, 'branding.logo_dark', 'client/assets/images/logo-dark.png', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(11, 'branding.logo_light', 'client/assets/images/logo-light.png', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(12, 'i18n.default_localization', 'en', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(13, 'i18n.enable', 'true', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(14, 'logging.sentry_public', '', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(15, 'realtime.pusher_key', '', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(16, 'homepage.type', 'default', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(17, 'themes.default_mode', 'light', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(18, 'themes.user_change', 'true', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(19, 'billing.paypal_test_mode', 'true', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(20, 'billing.stripe_test_mode', 'true', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(21, 'billing.stripe.enable', 'false', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(22, 'billing.paypal.enable', 'false', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(23, 'billing.accepted_cards', '[\"visa\",\"mastercard\",\"american-express\",\"discover\"]', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(24, 'custom_domains.default_host', '', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(25, 'uploads.chunk', 'true', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(26, 'uploads.chunk_size', '5242880', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(27, 'cookie_notice.enable', 'true', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(28, 'cookie_notice.position', 'bottom', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(29, 'branding.site_description', 'MTDb, the world\'s most popular and authoritative source for movie, TV and celebrity content.', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(30, 'billing.enable', 'true', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(31, 'menus', '[{\"name\":\"Primary\",\"position\":\"primary\",\"items\":[{\"type\":\"route\",\"order\":1,\"label\":\"Movies\",\"action\":\"browse?type=movie\"},{\"type\":\"route\",\"order\":2,\"label\":\"Series\",\"action\":\"browse?type=series\"},{\"type\":\"route\",\"order\":3,\"label\":\"People\",\"action\":\"people\"},{\"type\":\"route\",\"order\":4,\"label\":\"News\",\"action\":\"news\"}]},{\"name\":\"Explore\",\"position\":\"footer-1\",\"items\":[{\"type\":\"route\",\"order\":1,\"label\":\"Top Movies\",\"action\":\"lists\\/1\"},{\"type\":\"route\",\"order\":2,\"label\":\"Top Shows\",\"action\":\"lists\\/2\"},{\"type\":\"route\",\"order\":3,\"label\":\"Coming Soon\",\"action\":\"lists\\/3\"},{\"type\":\"route\",\"order\":4,\"label\":\"Now Playing\",\"action\":\"lists\\/4\"},{\"type\":\"route\",\"order\":3,\"label\":\"People\",\"action\":\"people\"}]},{\"name\":\"Genres\",\"position\":\"footer-2\",\"items\":[{\"type\":\"route\",\"order\":1,\"label\":\"Action\",\"action\":\"browse?genre=action\"},{\"type\":\"route\",\"order\":2,\"label\":\"Comedy\",\"action\":\"browse?genre=comedy\"},{\"type\":\"route\",\"order\":2,\"label\":\"Drama\",\"action\":\"browse?genre=drama\"},{\"type\":\"route\",\"order\":2,\"label\":\"Crime\",\"action\":\"browse?genre=crime\"},{\"type\":\"route\",\"order\":2,\"label\":\"Adventure\",\"action\":\"browse?genre=adventure\"}]},{\"name\":\"Pages\",\"position\":\"footer-3\",\"items\":[{\"type\":\"route\",\"order\":1,\"label\":\"Contact\",\"action\":\"contact\"},{\"type\":\"page\",\"order\":2,\"label\":\"Privacy Policy\",\"action\":\"1\\/privacy-policy\"},{\"type\":\"page\",\"order\":2,\"label\":\"Terms of Use\",\"action\":\"2\\/terms-of-use\"},{\"type\":\"page\",\"order\":2,\"label\":\"About Us\",\"action\":\"3\\/about-us\"}]}]', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(32, 'uploads.max_size', '52428800', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(33, 'uploads.available_space', '104857600', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(34, 'uploads.blocked_extensions', '[\"exe\",\"application\\/x-msdownload\",\"x-dosexec\"]', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(35, 'news.auto_update', 'false', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(36, 'tmdb.language', 'en', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(37, 'tmdb.includeAdult', 'false', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(38, 'titles.video_panel_mode', 'carousel', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(39, 'streaming.video_panel_content', 'all', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(40, 'streaming.related_videos_type', 'other_titles', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(41, 'player.show_next_episodes', 'false', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(42, 'titles.enable_reviews', 'true', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(43, 'titles.enable_comments', 'true', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(44, 'homepage.list_items_count', '10', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(45, 'homepage.slider_items_count', '5', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(46, 'homepage.autoslide', 'true', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(47, 'streaming.default_sort', 'order:asc', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(48, 'streaming.show_captions_panel', 'false', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(49, 'streaming.show_category_select', 'false', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(50, 'streaming.streaming.auto_approve', 'true', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(51, 'streaming.streaming.show_header_play', 'false', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(52, 'content.people_index_min_popularity', '0', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(53, 'content.search_provider', 'local', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(54, 'content.title_provider', 'local', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(55, 'content.people_provider', 'local', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(56, 'content.list_provider', 'local', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(57, 'browse.genres', '[\"drama\",\"action\",\"thriller\",\"comedy\",\"science fiction\",\"horror\",\"mystery\",\"romance\"]', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(58, 'browse.ageRatings', '[\"g\",\"pg\",\"pg-13\",\"r\",\"nc-17\"]', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(59, 'browse.year_slider_min', '1880', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(60, 'browse.year_slider_max', '2023', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(61, 'streaming.qualities', '[\"regular\",\"SD\",\"HD\",\"720p\",\"1080p\",\"4k\"]', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0),
(62, 'landing.appearance', '{\"headerTitle\":\"Watch on Any Device\",\"headerSubtitle\":\"Stream on your phone, tablet, laptop, PC and TV without paying more. First month is free!\",\"headerImage\":\"client\\/assets\\/images\\/landing.jpg\",\"headerOverlayColor\":\"rgba(0,0,0,0.7)\",\"actions\":{\"cta1\":\"Join Now\"},\"primaryFeatures\":[{\"title\":\"High Quality\",\"subtitle\":\"Never run out of things to watch. Hundreds of movies and TV series available in HD.\",\"image\":\"hd\"},{\"title\":\"Multiple User\",\"subtitle\":\"No need for multiple accounts. Friends and family can share the same account.\",\"image\":\"people\"},{\"title\":\"Discover\",\"subtitle\":\"Find new things to watch based on your preferences and other user ratings.\",\"image\":\"rate-review\"}],\"secondaryFeatures\":[{\"title\":\"Watch Anytime, Anywhere. From Any Device.\",\"subtitle\":\"COMPLETE FREEDOM\",\"description\":\"Watch TV Shows And Movies on Smart TVs, Consoles, Chromecast, Apple TV, Phone, Tablet or Browser.\",\"image\":\"client\\/assets\\/images\\/landing\\/endgame.jpg\"},{\"title\":\"Cancel Online Anytime.\",\"subtitle\":\"No COMMITMENTS\",\"description\":\"If you decide MTDb isn\'t for you - no problem. No commitment. Cancel online at anytime.\",\"image\":\"client\\/assets\\/images\\/landing\\/wick.jpg\"}]}', '2021-11-16 08:28:29', '2021-11-16 08:28:29', 0);

-- --------------------------------------------------------

--
-- Table structure for table `social_profiles`
--

CREATE TABLE `social_profiles` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `service_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_service_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `plan_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gateway_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'none',
  `gateway_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'none',
  `quantity` int(11) NOT NULL DEFAULT 1,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL,
  `ends_at` timestamp NULL DEFAULT NULL,
  `renews_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `taggables`
--

CREATE TABLE `taggables` (
  `id` int(10) UNSIGNED NOT NULL,
  `tag_id` int(10) UNSIGNED NOT NULL,
  `taggable_id` int(10) UNSIGNED NOT NULL,
  `taggable_type` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'custom',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `throttle`
--

CREATE TABLE `throttle` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `ip_address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attempts` int(11) NOT NULL DEFAULT 0,
  `suspended` tinyint(1) NOT NULL DEFAULT 0,
  `banned` tinyint(1) NOT NULL DEFAULT 0,
  `last_attempt_at` timestamp NULL DEFAULT NULL,
  `suspended_at` timestamp NULL DEFAULT NULL,
  `banned_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `titles`
--

CREATE TABLE `titles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'movie',
  `tmdb_vote_average` decimal(3,1) DEFAULT NULL,
  `release_date` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year` smallint(5) UNSIGNED DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `genre` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tagline` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `poster` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `backdrop` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `runtime` int(10) UNSIGNED DEFAULT NULL,
  `trailer` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `budget` bigint(20) UNSIGNED DEFAULT NULL,
  `revenue` bigint(20) UNSIGNED DEFAULT NULL,
  `views` bigint(20) NOT NULL DEFAULT 1,
  `popularity` int(10) UNSIGNED DEFAULT NULL,
  `imdb_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tmdb_id` bigint(20) UNSIGNED DEFAULT NULL,
  `season_count` int(10) UNSIGNED DEFAULT NULL,
  `fully_synced` tinyint(3) UNSIGNED DEFAULT 0,
  `allow_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `language` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `original_title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `affiliate_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tmdb_vote_count` int(10) UNSIGNED DEFAULT NULL,
  `certification` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `episode_count` int(10) UNSIGNED DEFAULT NULL,
  `series_ended` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `is_series` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `local_vote_average` decimal(3,1) UNSIGNED DEFAULT NULL,
  `show_videos` tinyint(1) NOT NULL DEFAULT 0,
  `adult` tinyint(1) NOT NULL DEFAULT 0,
  `local_vote_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `legacy_permissions` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_brand` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_last_four` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `background` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `language` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timezone` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `available_space` bigint(20) UNSIGNED DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `first_name`, `last_name`, `avatar_url`, `gender`, `legacy_permissions`, `email`, `password`, `card_brand`, `card_last_four`, `remember_token`, `created_at`, `updated_at`, `background`, `language`, `country`, `timezone`, `avatar`, `stripe_id`, `available_space`, `email_verified_at`) VALUES
(1, 'admin', NULL, NULL, NULL, NULL, NULL, 'admin@demo.com', '$2y$10$8DP/b5kS/rvh8q.J0AM/rOXrq4rR9VJNmnUtPX6DNj565UqWUbSJ2', NULL, NULL, NULL, '2021-11-16 08:28:28', '2021-11-16 08:28:28', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-16 08:28:28');

-- --------------------------------------------------------

--
-- Table structure for table `users_oauth`
--

CREATE TABLE `users_oauth` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `service` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `user_id`, `role_id`, `created_at`) VALUES
(1, 1, 1, '2021-11-16 08:28:29');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quality` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title_id` int(10) UNSIGNED NOT NULL,
  `season_num` int(10) UNSIGNED DEFAULT NULL,
  `episode_num` int(10) UNSIGNED DEFAULT NULL,
  `source` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'local',
  `negative_votes` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `positive_votes` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `reports` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `approved` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `language` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en',
  `category` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'trailer',
  `episode_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `video_captions`
--

CREATE TABLE `video_captions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en',
  `hash` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `video_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `video_plays`
--

CREATE TABLE `video_plays` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `video_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `platform` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `browser` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time_watched` double(8,2) UNSIGNED DEFAULT NULL,
  `ip` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `video_ratings`
--

CREATE TABLE `video_ratings` (
  `id` int(10) UNSIGNED NOT NULL,
  `rating` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `video_id` int(10) UNSIGNED NOT NULL,
  `user_ip` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `video_reports`
--

CREATE TABLE `video_reports` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `video_id` int(10) UNSIGNED NOT NULL,
  `user_ip` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `workspaces`
--

CREATE TABLE `workspaces` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `workspace_invites`
--

CREATE TABLE `workspace_invites` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `workspace_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `email` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `workspace_user`
--

CREATE TABLE `workspace_user` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `workspace_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED DEFAULT NULL,
  `is_owner` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `billing_plans`
--
ALTER TABLE `billing_plans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `billing_plans_hidden_index` (`hidden`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_parent_id_index` (`parent_id`),
  ADD KEY `comments_path_index` (`path`),
  ADD KEY `comments_user_id_index` (`user_id`),
  ADD KEY `comments_commentable_id_index` (`commentable_id`),
  ADD KEY `comments_commentable_type_index` (`commentable_type`),
  ADD KEY `comments_deleted_index` (`deleted`);

--
-- Indexes for table `creditables`
--
ALTER TABLE `creditables`
  ADD PRIMARY KEY (`id`),
  ADD KEY `actors_titles_actor_id_index` (`person_id`),
  ADD KEY `actors_titles_title_id_index` (`creditable_id`),
  ADD KEY `creditables_order_index` (`order`),
  ADD KEY `creditables_creditable_type_index` (`creditable_type`);

--
-- Indexes for table `css_themes`
--
ALTER TABLE `css_themes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `css_themes_name_unique` (`name`),
  ADD KEY `css_themes_default_light_index` (`default_light`),
  ADD KEY `css_themes_default_dark_index` (`default_dark`),
  ADD KEY `css_themes_user_id_index` (`user_id`);

--
-- Indexes for table `csv_exports`
--
ALTER TABLE `csv_exports`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `csv_exports_cache_name_unique` (`cache_name`),
  ADD KEY `csv_exports_user_id_index` (`user_id`);

--
-- Indexes for table `custom_domains`
--
ALTER TABLE `custom_domains`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `custom_domains_host_unique` (`host`),
  ADD KEY `custom_domains_user_id_index` (`user_id`),
  ADD KEY `custom_domains_created_at_index` (`created_at`),
  ADD KEY `custom_domains_updated_at_index` (`updated_at`),
  ADD KEY `custom_domains_global_index` (`global`),
  ADD KEY `custom_domains_resource_id_index` (`resource_id`),
  ADD KEY `custom_domains_resource_type_index` (`resource_type`),
  ADD KEY `custom_domains_workspace_id_index` (`workspace_id`);

--
-- Indexes for table `custom_pages`
--
ALTER TABLE `custom_pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pages_slug_unique` (`slug`),
  ADD KEY `pages_type_index` (`type`),
  ADD KEY `pages_user_id_index` (`user_id`),
  ADD KEY `custom_pages_workspace_id_index` (`workspace_id`);

--
-- Indexes for table `episodes`
--
ALTER TABLE `episodes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ep_s_title_unique` (`episode_number`,`season_number`,`title_id`),
  ADD KEY `episodes_season_id_index` (`season_id`),
  ADD KEY `episodes_episode_number_index` (`episode_number`),
  ADD KEY `episodes_season_number_index` (`season_number`),
  ADD KEY `episodes_title_id_index` (`title_id`),
  ADD KEY `episodes_popularity_index` (`popularity`),
  ADD KEY `episodes_local_vote_count_index` (`local_vote_count`);

--
-- Indexes for table `file_entries`
--
ALTER TABLE `file_entries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uploads_file_name_unique` (`file_name`),
  ADD KEY `uploads_name_index` (`name`),
  ADD KEY `uploads_user_id_index` (`user_id`),
  ADD KEY `uploads_public_index` (`public`),
  ADD KEY `file_entries_updated_at_index` (`updated_at`),
  ADD KEY `file_entries_parent_id_index` (`parent_id`),
  ADD KEY `file_entries_type_index` (`type`),
  ADD KEY `file_entries_deleted_at_index` (`deleted_at`),
  ADD KEY `file_entries_user_id_index` (`user_id`),
  ADD KEY `file_entries_path_index` (`path`),
  ADD KEY `file_entries_description_index` (`description`),
  ADD KEY `file_entries_owner_id_index` (`owner_id`);

--
-- Indexes for table `file_entry_models`
--
ALTER TABLE `file_entry_models`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uploadables_upload_id_uploadable_id_uploadable_type_unique` (`file_entry_id`,`model_id`,`model_type`),
  ADD KEY `file_entry_models_owner_index` (`owner`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `images_local_unique` (`local`),
  ADD UNIQUE KEY `images_web_unique` (`web`),
  ADD KEY `images_title_id_index` (`title_id`),
  ADD KEY `images_source_index` (`source`),
  ADD KEY `images_model_id_index` (`model_id`),
  ADD KEY `images_model_type_index` (`model_type`),
  ADD KEY `images_order_index` (`order`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoices_subscription_id_index` (`subscription_id`),
  ADD KEY `invoices_uuid_index` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_reserved_at_index` (`queue`,`reserved_at`);

--
-- Indexes for table `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `links_url_unique` (`url`);

--
-- Indexes for table `listables`
--
ALTER TABLE `listables`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `listables_list_id_listable_id_listable_type_unique` (`list_id`,`listable_id`,`listable_type`),
  ADD KEY `listables_list_id_index` (`list_id`),
  ADD KEY `listables_listable_id_index` (`listable_id`),
  ADD KEY `listables_listable_type_index` (`listable_type`),
  ADD KEY `listables_order_index` (`order`);

--
-- Indexes for table `lists`
--
ALTER TABLE `lists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lists_user_id_index` (`user_id`),
  ADD KEY `lists_system_index` (`system`),
  ADD KEY `lists_public_index` (`public`),
  ADD KEY `lists_auto_update_index` (`auto_update`);

--
-- Indexes for table `localizations`
--
ALTER TABLE `localizations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `localizations_name_index` (`name`),
  ADD KEY `localizations_language_index` (`language`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`);

--
-- Indexes for table `notification_subscriptions`
--
ALTER TABLE `notification_subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notification_subscriptions_notif_id_index` (`notif_id`),
  ADD KEY `notification_subscriptions_user_id_index` (`user_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `actors_tmdb_id_unique` (`tmdb_id`),
  ADD UNIQUE KEY `people_tmdb_id_unique` (`tmdb_id`),
  ADD KEY `people_popularity_index` (`popularity`),
  ADD KEY `people_adult_popularity_index` (`adult`,`popularity`);
ALTER TABLE `people` ADD FULLTEXT KEY `people_name_fulltext` (`name`);

--
-- Indexes for table `permissionables`
--
ALTER TABLE `permissionables`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissionable_unique` (`permission_id`,`permissionable_id`,`permissionable_type`),
  ADD KEY `permissionables_permission_id_index` (`permission_id`),
  ADD KEY `permissionables_permissionable_id_index` (`permissionable_id`),
  ADD KEY `permissionables_permissionable_type_index` (`permissionable_type`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_unique` (`name`),
  ADD KEY `permissions_advanced_index` (`advanced`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `author_title_unique` (`reviewable_id`,`author`),
  ADD KEY `reviews_title_id_index` (`reviewable_id`),
  ADD KEY `reviews_reviewable_type_index` (`reviewable_type`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `groups_name_unique` (`name`),
  ADD KEY `groups_default_index` (`default`),
  ADD KEY `groups_guests_index` (`guests`),
  ADD KEY `roles_internal_index` (`internal`);

--
-- Indexes for table `seasons`
--
ALTER TABLE `seasons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tile_number_unique` (`title_id`,`number`),
  ADD KEY `seasons_title_id_index` (`title_id`),
  ADD KEY `seasons_title_tmdb_id_index` (`title_tmdb_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_name_unique` (`name`),
  ADD KEY `settings_private_index` (`private`);

--
-- Indexes for table `social_profiles`
--
ALTER TABLE `social_profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `social_profiles_user_id_service_name_unique` (`user_id`,`service_name`),
  ADD UNIQUE KEY `social_profiles_service_name_user_service_id_unique` (`service_name`,`user_service_id`),
  ADD KEY `social_profiles_user_id_index` (`user_id`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subscriptions_user_id_index` (`user_id`),
  ADD KEY `subscriptions_plan_id_index` (`plan_id`),
  ADD KEY `subscriptions_gateway_index` (`gateway_name`);

--
-- Indexes for table `taggables`
--
ALTER TABLE `taggables`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `taggables_tag_id_taggable_id_user_id_taggable_type_unique` (`tag_id`,`taggable_id`,`user_id`,`taggable_type`),
  ADD KEY `taggables_tag_id_index` (`tag_id`),
  ADD KEY `taggables_taggable_id_index` (`taggable_id`),
  ADD KEY `taggables_taggable_type_index` (`taggable_type`),
  ADD KEY `taggables_user_id_index` (`user_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tags_name_type_unique` (`name`,`type`),
  ADD KEY `tags_type_index` (`type`),
  ADD KEY `tags_created_at_index` (`created_at`),
  ADD KEY `tags_updated_at_index` (`updated_at`);

--
-- Indexes for table `throttle`
--
ALTER TABLE `throttle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `throttle_user_id_index` (`user_id`);

--
-- Indexes for table `titles`
--
ALTER TABLE `titles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `titles_tmdb_id_is_series_unique` (`tmdb_id`,`is_series`),
  ADD KEY `titles_revenue_index` (`revenue`),
  ADD KEY `titles_created_at_index` (`created_at`),
  ADD KEY `titles_release_date_index` (`release_date`),
  ADD KEY `titles_tmdb_popularity_index` (`popularity`),
  ADD KEY `titles_certification_index` (`certification`),
  ADD KEY `titles_is_series_adult_index` (`is_series`,`adult`),
  ADD KEY `titles_local_vote_count_index` (`local_vote_count`);
ALTER TABLE `titles` ADD FULLTEXT KEY `titles_name_fulltext` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_created_at_index` (`created_at`),
  ADD KEY `users_updated_at_index` (`updated_at`),
  ADD KEY `users_username_index` (`username`);

--
-- Indexes for table `users_oauth`
--
ALTER TABLE `users_oauth`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_oauth_user_id_service_unique` (`user_id`,`service`),
  ADD UNIQUE KEY `users_oauth_token_unique` (`token`),
  ADD KEY `users_oauth_user_id_index` (`user_id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_group_user_id_group_id_unique` (`user_id`,`role_id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `videos_title_id_index` (`title_id`),
  ADD KEY `videos_season_index` (`season_num`),
  ADD KEY `videos_episode_index` (`episode_num`),
  ADD KEY `videos_source_index` (`source`),
  ADD KEY `videos_approved_index` (`approved`),
  ADD KEY `videos_order_index` (`order`),
  ADD KEY `videos_positive_votes_index` (`positive_votes`),
  ADD KEY `videos_negative_votes_index` (`negative_votes`),
  ADD KEY `videos_user_id_index` (`user_id`),
  ADD KEY `videos_language_index` (`language`),
  ADD KEY `videos_category_index` (`category`),
  ADD KEY `videos_episode_id_index` (`episode_id`);

--
-- Indexes for table `video_captions`
--
ALTER TABLE `video_captions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `video_captions_name_video_id_unique` (`name`,`video_id`),
  ADD UNIQUE KEY `video_captions_hash_unique` (`hash`),
  ADD KEY `video_captions_language_index` (`language`),
  ADD KEY `video_captions_video_id_index` (`video_id`),
  ADD KEY `video_captions_user_id_index` (`user_id`),
  ADD KEY `video_captions_order_index` (`order`);

--
-- Indexes for table `video_plays`
--
ALTER TABLE `video_plays`
  ADD PRIMARY KEY (`id`),
  ADD KEY `video_plays_user_id_index` (`user_id`),
  ADD KEY `video_plays_video_id_index` (`video_id`),
  ADD KEY `video_plays_platform_index` (`platform`),
  ADD KEY `video_plays_device_index` (`device`),
  ADD KEY `video_plays_browser_index` (`browser`),
  ADD KEY `video_plays_location_index` (`location`),
  ADD KEY `video_plays_time_watched_index` (`time_watched`),
  ADD KEY `video_plays_ip_index` (`ip`);

--
-- Indexes for table `video_ratings`
--
ALTER TABLE `video_ratings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `video_ratings_user_ip_video_id_unique` (`user_ip`,`video_id`),
  ADD UNIQUE KEY `video_ratings_user_id_video_id_unique` (`user_id`,`video_id`),
  ADD KEY `video_ratings_user_id_index` (`user_id`),
  ADD KEY `video_ratings_video_id_index` (`video_id`),
  ADD KEY `video_ratings_user_ip_index` (`user_ip`);

--
-- Indexes for table `video_reports`
--
ALTER TABLE `video_reports`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `video_reports_user_ip_video_id_unique` (`user_ip`,`video_id`),
  ADD UNIQUE KEY `video_reports_user_id_video_id_unique` (`user_id`,`video_id`),
  ADD KEY `video_reports_user_id_index` (`user_id`),
  ADD KEY `video_reports_video_id_index` (`video_id`),
  ADD KEY `video_reports_user_ip_index` (`user_ip`);

--
-- Indexes for table `workspaces`
--
ALTER TABLE `workspaces`
  ADD PRIMARY KEY (`id`),
  ADD KEY `workspaces_owner_id_index` (`owner_id`),
  ADD KEY `workspaces_created_at_index` (`created_at`),
  ADD KEY `workspaces_updated_at_index` (`updated_at`);

--
-- Indexes for table `workspace_invites`
--
ALTER TABLE `workspace_invites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `workspace_invites_workspace_id_index` (`workspace_id`),
  ADD KEY `workspace_invites_user_id_index` (`user_id`),
  ADD KEY `workspace_invites_email_index` (`email`),
  ADD KEY `workspace_invites_role_id_index` (`role_id`);

--
-- Indexes for table `workspace_user`
--
ALTER TABLE `workspace_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `workspace_user_workspace_id_user_id_unique` (`workspace_id`,`user_id`),
  ADD KEY `workspace_user_user_id_index` (`user_id`),
  ADD KEY `workspace_user_workspace_id_index` (`workspace_id`),
  ADD KEY `workspace_user_role_id_index` (`role_id`),
  ADD KEY `workspace_user_is_owner_index` (`is_owner`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `billing_plans`
--
ALTER TABLE `billing_plans`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `creditables`
--
ALTER TABLE `creditables`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `css_themes`
--
ALTER TABLE `css_themes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `csv_exports`
--
ALTER TABLE `csv_exports`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `custom_domains`
--
ALTER TABLE `custom_domains`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `custom_pages`
--
ALTER TABLE `custom_pages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `episodes`
--
ALTER TABLE `episodes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `file_entries`
--
ALTER TABLE `file_entries`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `file_entry_models`
--
ALTER TABLE `file_entry_models`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `links`
--
ALTER TABLE `links`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `listables`
--
ALTER TABLE `listables`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lists`
--
ALTER TABLE `lists`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `localizations`
--
ALTER TABLE `localizations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `people`
--
ALTER TABLE `people`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissionables`
--
ALTER TABLE `permissionables`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `seasons`
--
ALTER TABLE `seasons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `social_profiles`
--
ALTER TABLE `social_profiles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `taggables`
--
ALTER TABLE `taggables`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `throttle`
--
ALTER TABLE `throttle`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `titles`
--
ALTER TABLE `titles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users_oauth`
--
ALTER TABLE `users_oauth`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `video_captions`
--
ALTER TABLE `video_captions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `video_plays`
--
ALTER TABLE `video_plays`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `video_ratings`
--
ALTER TABLE `video_ratings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `video_reports`
--
ALTER TABLE `video_reports`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workspaces`
--
ALTER TABLE `workspaces`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workspace_user`
--
ALTER TABLE `workspace_user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
