<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

/*
create database testdb;
use testdb;
create table records (id int(11) not null auto_increment, val integer(11) not null, primary key (id));
*/

$dsn = 'mysql:host=localhost;dbname=testdb';
$db = new PDO($dsn, 'root', '');

require_once('./class/lib/frontcontroller.php');
frontcontroller::dispatch($_REQUEST, $db);