/* create new schema for this assignment */
DROP SCHEMA IF EXISTS `assignment_employee_table`;
CREATE SCHEMA IF NOT EXISTS `assignment_employee_table` DEFAULT CHARACTER SET utf8;
USE `assignment_employee_table`;

/* create employee table */
DROP TABLE IF EXISTS `assignment_employee_table`.`employee`;
CREATE TABLE IF NOT EXISTS `assignment_employee_table`.`employee` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `salary` INT NOT NULL,
    PRIMARY KEY (`id`)
)
ENGINE = InnoDB;

/* initialize employee table with data from json file */
START TRANSACTION;
USE `assignment_employee_table`;
INSERT INTO `assignment_employee_table`.`employee` (`first_name`, `last_name`, `salary`) VALUES ('Lewis', 'Burson', 40700);
INSERT INTO `assignment_employee_table`.`employee` (`first_name`, `last_name`, `salary`) VALUES ('Ian', 'Malcolm', 70000);
INSERT INTO `assignment_employee_table`.`employee` (`first_name`, `last_name`, `salary`) VALUES ('Ellie', 'Sattler', 102000);
INSERT INTO `assignment_employee_table`.`employee` (`first_name`, `last_name`, `salary`) VALUES ('Dennis', 'Nedry', 52000);
INSERT INTO `assignment_employee_table`.`employee` (`first_name`, `last_name`, `salary`) VALUES ('John', 'Hammond', 89600);
INSERT INTO `assignment_employee_table`.`employee` (`first_name`, `last_name`, `salary`) VALUES ('Ray', 'Arnold', 45000);
INSERT INTO `assignment_employee_table`.`employee` (`first_name`, `last_name`, `salary`) VALUES ('Laura', 'Burnett', 80000);
COMMIT;

/* create db user for this application*/
DROP USER IF EXISTS 'aet_admin';
CREATE USER 'aet_admin' IDENTIFIED BY 'aet_admin_pass';
GRANT ALL PRIVILEGES ON assignment_employee_table.* to 'aet_admin';