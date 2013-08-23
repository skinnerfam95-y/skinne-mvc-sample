<?php
require_once('../model/records.php');
require_once('../class/lib/test/common.php');

class RecordsTest extends PHPUnit_Framework_TestCase
{
	protected static $db;
	protected static $tables = array('records', 'subrecords');
	
	public function testSumRecords(){
		test_common::loadTableDataFromCsv('records', test_common::filenameFromMethod(__METHOD__, 'records'), self::$db);
		
		$recordsMdl = new records();
		$records = $recordsMdl->getRecords(self::$db);
		
		$this->assertEquals(3, count($records));
	}
		
	public function testCountRecords(){
		test_common::loadTableDataFromCsv('records',    test_common::filenameFromMethod('RecordsTest::testSumRecords', 'records'),    self::$db);
		test_common::loadTableDataFromCsv('subrecords', test_common::filenameFromMethod(__METHOD__,                    'subrecords'), self::$db);
		
		$recordsMdl = new records();
		$records = $recordsMdl->getSubrecords(self::$db);
		
		$this->assertEquals(6, count($records));
	}

	public static function setUpBeforeClass(){
		$dsn = 'mysql:host=localhost;dbname=unittestdb';
		self::$db = new PDO($dsn, 'root', '');
		self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		
		test_common::dropTables(self::$tables, self::$db);
		
		$sql='CREATE TABLE records (id int(11) not null auto_increment, val integer(11) not null, primary key (id))';
		self::$db->exec($sql);
		
		$sql='CREATE TABLE subrecords (id int(11) not null auto_increment, id_records integer(11), val integer(11) not null, primary key (id))';
		self::$db->exec($sql);
	}
	
	public static function tearDownAfterClass(){
		test_common::dropTables(self::$tables, self::$db);
	}
	
	protected function setUp(){
		test_common::truncateTables(self::$tables, self::$db);
	}

	protected function tearDown(){
		test_common::truncateTables(self::$tables, self::$db);
	}
}
