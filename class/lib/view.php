<?php
class view{
	
	public function get_view_vars_json(){
		$rtn = array();
		
		$vars = get_object_vars($this);
		
		if(!empty($vars['_autogen'])){
			$rtn = $vars['_autogen'];
		}
		
		return json_encode($rtn);	
	}	
	
	public function __call($method, $params){
		$action = substr($method, 0, 3);
		$var = substr($method, 3);
		
		if($action === 'get'){
			return $this->_autogen{$var};
		}else if($action === 'set'){
			$this->_autogen{$var} = $params[0];
		}else{
			throw new Exception('Invalid method called');
		}
	}
	
	public function render($viewscript, $layout){
		require_once($layout);
	}
}