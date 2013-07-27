<?php
require_once('./class/lib/view.php');

class viewpartial extends view{
	public function render($viewscript, $layout=null){
		require_once($viewscript);
	}	
}