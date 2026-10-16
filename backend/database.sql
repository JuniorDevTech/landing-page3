-- Créer la base de données
CREATE DATABASE IF NOT EXISTS landingpage_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE landingpage_db;

-- Créer la table des demandes d'essai
CREATE TABLE IF NOT EXISTS demandes_essai (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  pays ENUM('Côte d\'Ivoire', 'Cameroun', 'Burkina Faso', 'Sénégal', 'Gabon') NOT NULL,
  date_essai_souhaitee DATE NOT NULL,
  date_envoi DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_date_envoi (date_envoi),
  INDEX idx_pays (pays)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
