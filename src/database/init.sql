CREATE TABLE `Utilisateur` (
  `ID_Utilisateur` integer PRIMARY KEY,
  `Nom` varchar(255),
  `Email` varchar(255),
  `Téléphone` varchar(255),
  `Type` enum(Bailleur,Standard),
  `LoginType` enum(Google,Facebook,Email),
  `SocialID` varchar(255),
  `Active` bool
);

CREATE TABLE `Propriété` (
  `ID_Propriété` integer PRIMARY KEY,
  `ID_Bailleur` integer,
  `Adresse` varchar(255),
  `Type` varchar(255),
  `Prix` float,
  `Description` text,
  `Statut` varchar(255)
);

CREATE TABLE `Contrat` (
  `ID_Contrat` integer PRIMARY KEY,
  `ID_Propriété` integer,
  `ID_Locataire` integer,
  `Date_Signature` date,
  `Date_Début` date,
  `Date_Fin` date,
  `Statut` varchar(255)
);

CREATE TABLE `Paiement` (
  `ID_Paiement` integer PRIMARY KEY,
  `ID_Contrat` integer,
  `Montant` float,
  `Méthode` varchar(255),
  `Date` date
);

CREATE TABLE `Signalement` (
  `ID_Signalement` integer PRIMARY KEY,
  `ID_Propriété` integer,
  `ID_Locataire` integer,
  `Type_Problème` varchar(255),
  `Description` text,
  `Statut` varchar(255),
  `Date` date
);

CREATE TABLE `Message` (
  `ID_Message` integer PRIMARY KEY,
  `ID_Expéditeur` integer,
  `ID_Récepteur` integer,
  `Contenu` text,
  `Date` date
);

CREATE TABLE `Média` (
  `ID_Média` integer PRIMARY KEY,
  `ID_Utilisateur` integer,
  `ID_Propriété` integer,
  `ID_Signalement` integer,
  `Type` varchar(255),
  `URL` text,
  `Description` text
);

ALTER TABLE `Propriété` ADD FOREIGN KEY (`ID_Bailleur`) REFERENCES `Utilisateur` (`ID_Utilisateur`);

ALTER TABLE `Contrat` ADD FOREIGN KEY (`ID_Propriété`) REFERENCES `Propriété` (`ID_Propriété`);

ALTER TABLE `Contrat` ADD FOREIGN KEY (`ID_Locataire`) REFERENCES `Utilisateur` (`ID_Utilisateur`);

ALTER TABLE `Paiement` ADD FOREIGN KEY (`ID_Contrat`) REFERENCES `Contrat` (`ID_Contrat`);

ALTER TABLE `Signalement` ADD FOREIGN KEY (`ID_Propriété`) REFERENCES `Propriété` (`ID_Propriété`);

ALTER TABLE `Signalement` ADD FOREIGN KEY (`ID_Locataire`) REFERENCES `Utilisateur` (`ID_Utilisateur`);

ALTER TABLE `Message` ADD FOREIGN KEY (`ID_Expéditeur`) REFERENCES `Utilisateur` (`ID_Utilisateur`);

ALTER TABLE `Message` ADD FOREIGN KEY (`ID_Récepteur`) REFERENCES `Utilisateur` (`ID_Utilisateur`);

ALTER TABLE `Média` ADD FOREIGN KEY (`ID_Utilisateur`) REFERENCES `Utilisateur` (`ID_Utilisateur`);

ALTER TABLE `Média` ADD FOREIGN KEY (`ID_Propriété`) REFERENCES `Propriété` (`ID_Propriété`);

ALTER TABLE `Média` ADD FOREIGN KEY (`ID_Signalement`) REFERENCES `Signalement` (`ID_Signalement`);
