<?php
class records{
	public function getRecords($db){
		$stmt = $db->prepare('
			SELECT 
				@rn:=@rn+1 AS rowNum, 
				records.* 
			FROM 
				records, 
				(SELECT @rn:=-1) t2;');
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
		// TODO:  getting close the datamap idea... (strip off id and row num and insert/update the remainders)
		$rtnFilter = array(
			'rowNum' => null,
			'id'     => null,
			'val'    => null
		);

		$rtn = array_intersect_key($data, array_flip(array_keys($rtnFilter)));
				
		if(empty($data['id'])){
			$sql = 'INSERT INTO records VALUES (null, ?)';
			$stmt = $db->prepare($sql);
			$stmt->bindValue(1,$data['val']);
			$stmt->execute();
			
			$rtn['id'] = $db->lastInsertId();
			
		} else {
			$sql = 'UPDATE records SET val = ? WHERE id = ?';
			$stmt = $db->prepare($sql);
			$stmt->bindValue(1,$data['val']);
			$stmt->bindValue(2,$data['id']);
			$stmt->execute();
		}
		
		return $rtn;
	}
	
	public function deleteRecordById($id, $db){
		$sql = 'DELETE FROM records WHERE id = ?';
		$stmt = $db->prepare($sql);
		$stmt->bindValue(1,$id);
		$stmt->execute();		
	}
}