<?php
class records{
	public function getRecords($db){
		$stmt = $db->prepare('SELECT * FROM records;');
		$stmt->execute();
		$rslt = $stmt->fetchAll();
		
		return $rslt;
// 		return 	
// 			array(
// 				array('id' => 10, 'val' => 105),
// 				array('id' => 21, 'val' => 206)
// 			);
	}
	
	public function saveRecord($data, $db){
		if(empty($data['inputId'])){
			$sql = 'INSERT INTO records VALUES (null, ?)';
			$stmt = $db->prepare($sql);
			$stmt->bindValue(1,$data['val']);
			$stmt->execute();
			
		} else {
			$sql = 'UPDATE records SET val = ? WHERE id = ?';
			$stmt = $db->prepare($sql);
			$stmt->bindValue(1,$data['val']);
			$stmt->bindValue(2,$data['id']);
			$stmt->execute();
		}
	}
}