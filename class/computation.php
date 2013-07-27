<?php
class Computation{
	private $m_age = 0;
	
	public function getAge(){
		return $this->m_age;
	}
	
	public function addOneToAge(){
		$this->m_age = $this->m_age + 1;
	}
}