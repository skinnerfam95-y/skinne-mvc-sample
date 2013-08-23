<?php
class test_common{
	public static function loadTableDataFromCsv($tableName, $fileName, $db){
		$file = fopen($fileName,"r");
		$insertSql = null;
		
		while($row = fgetcsv($file)){
			if(empty($insertSql)){
				
				$fields = implode(',', $row);
				$valPlaceHolders = implode(',',array_fill(0, count($row), '?'));
				
				$insertSql = "INSERT INTO $tableName ($fields) VALUES ($valPlaceHolders)";
				
			}else{
				$stmt = $db->prepare($insertSql);
				
				foreach($row as $key => $val){
					$stmt->bindValue($key + 1, $val);
				}
				
				$stmt->execute();
			}
		}
		
		fclose($file);
	}
	
	public static function filenameFromMethod($testMethod, $tableName){
		return str_replace('::', '/', $testMethod) . "-{$tableName}.csv";
	}
	
	public static function dropTables($tables, $db){
		foreach($tables as $table){
			$sql="DROP TABLE IF EXISTS $table";
			$db->exec($sql);
		}
	}
	
	public static function truncateTables($tables, $db){
		foreach($tables as $table){
			$sql="TRUNCATE TABLE $table";
			$db->exec($sql);
		}
	}	
}