-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema giphy
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `giphy` ;

-- -----------------------------------------------------
-- Schema giphy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `giphy` DEFAULT CHARACTER SET utf8 ;
USE `giphy` ;

-- -----------------------------------------------------
-- Table `giphy`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `giphy`.`users` (
  `userId` INT(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`userId`))
ENGINE = InnoDB
AUTO_INCREMENT = 552
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `giphy`.`users_giphy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `giphy`.`users_giphy` (
  `userId` INT(11) NOT NULL,
  `giphyId` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`userId`, `giphyId`),
  CONSTRAINT `FK_users_giphy_users`
    FOREIGN KEY (`userId`)
    REFERENCES `giphy`.`users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
