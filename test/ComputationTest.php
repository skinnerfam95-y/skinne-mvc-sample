<?php
require_once('../class/computation.php');

class ComputationTest extends PHPUnit_Framework_TestCase
{
    public function testAddOne()
    {
    	$computation = new Computation();
    	
    	$ageBefore = $computation->getAge();
    	$computation->addOneToAge();
    	$ageAfter = $computation->getAge();
    	    	
        $this->assertEquals($ageBefore + 1, $ageAfter);
    }
}