<?php
class frontcontroller{
	public static function dispatch($postvars, $db){
		
		$controller = (empty($postvars['controller']) ? 'index' : $postvars['controller']) . 'Controller';
		$action =     (empty($postvars['action'])     ? 'index' : $postvars['action'])     . 'Action';
		
		require_once("./class/controller/{$controller}.php");
		$ctrlr = new $controller();
		
		$output = $ctrlr->$action($db);
		
		$viewType = is_object($output) ? get_class($output) : 'string';
		
		switch ($viewType){
			case 'view' :
				$output->render("./view/{$controller}.phtml", './view/layout.phtml');
				break;
				
			case 'viewpartial' :
				$output->render("./view/partial/{$action}.phtml");
				break;
				
			default:
				echo $output;
				break;
		}
	}
}