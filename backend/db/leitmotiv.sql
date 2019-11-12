-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 08 nov. 2019 à 00:47
-- Version du serveur :  5.7.26
-- Version de PHP :  7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `leitmotiv`
--

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `category` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `modified_at` datetime DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `title`, `content`, `category`, `created_at`, `modified_at`, `user_id`) VALUES
(1, 'Premier message', 'Ceci est le premier message que j\'ecris depuis cette nouvelle API', 'Positivité', '2019-11-08 01:03:25', NULL, 1),
(2, 'Deuxieme message', 'Ceci est le deuxieme message que j\'ecris depuis cette nouvelle API. J\'ai modifié des champs et d\'autres, non', 'Croyance', '2019-11-08 01:04:45', '2019-11-08 01:09:21', 1),
(3, 'Troisieme message', 'Ceci est le troisieme message que j\'ecris depuis cette nouvelle API. Il vient d\'un autre utilisateur et modifié', 'Croyance', '2019-11-08 01:12:58', '2019-11-08 01:20:42', 2);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `connected_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `login`, `email`, `password`, `created_at`, `connected_at`) VALUES
(1, 'LWolf', 'llogan.wolf@hotmail.fr', '$2b$05$uPqcf6/SKzD5629CVi6RXekCEKrAlOiNAoo7veQDtZlQH0O0l.QT.', '2019-11-08 00:55:59', '2019-11-08 00:58:16'),
(2, 'JLucien', 'jeremie.lucien@hotmail.fr', '$2b$05$o1fXuxSK9quJBZXNBzFFmujDTgHc/47KOmr5w9bEgYyKgEp3TFiqu', '2019-11-08 01:10:45', '2019-11-08 01:10:52');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
