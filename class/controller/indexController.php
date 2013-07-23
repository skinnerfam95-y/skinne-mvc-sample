<?php
require_once('./class/lib/view.php');
require_once('./class/lib/viewpartial.php');
require_once('./model/records.php');

class indexController{
	public function indexAction($db){
		$view = new view();
		$records = new records();
		
		$view->setRecords(
			$records->getRecords($db)
		);
		
		return $view;
	}
	
	public function recordListTableAction($db){
		$partial = new viewpartial();
		$records = new records();
		
		$partial->setRecords(
			$records->getRecords($db)
		);
		
		return $partial;
	}
	
	public function saveAction($db){
		$records = new records();
		
		$rtn = $records->saveRecord($_REQUEST, $db);
		
		// TODO: Better return value
		return json_encode($rtn);
	}
	
	public function deleteAction($db){
		$records = new records();
		$records->deleteRecordById($_REQUEST['id'], $db);
		
		$rtn = new stdClass();
		$rtn->success = true;
		return json_encode($rtn);
	}
}