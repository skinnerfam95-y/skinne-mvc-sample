<?php
class Computation{
	private $m_numList = array();
	
	public function __construct($numList){
		if(is_array($numList)){
			$this->m_numList = $numList;
		}else{
			throw new Exception('Array required');
		}
		
		foreach($this->m_numList as $num){
			if(!is_numeric($num)){
				throw new Exception('Non numeric input');
			}
		}
	}
	
	public function sum(){
		$rtn = 0;
		foreach($this->m_numList as $intVal){
			$rtn += $intVal;
		}
		
		return $rtn;
	}
	
	public function median(){
		$rtn = 0;
		$sorted = $this->m_numList;
		
		if(!sort($this->m_numList)){
			throw new Exception('Sort error');
		}
		
		$listLen = count($this->m_numList);
		
		if($listLen === 0){
			throw new Exception('Median calc requires list length > 0');
			
		}elseif($listLen === 1){
			$rtn = $sorted[0];
			
		}elseif($listLen % 2 === 0){
			$rtn = ($sorted[$listLen/2] + $sorted[($listLen/2) + 1]) / 2;
			
		}else{
			$rtn = $sorted[ floor($listLen/2) ];
		}
				
		return $rtn;
	}
}
