<?php
require_once('../class/computation.php');

class ComputationTest extends PHPUnit_Framework_TestCase
{
    public function testSumAllPositive()
    {
    	$computation = new Computation(array(1,2,3));
    	
    	$sum = $computation->sum();
        $this->assertEquals(6, $sum);

    	$computation = new Computation(array(3.3, 2.2, 3));
    	
    	$sum = $computation->sum();
        $this->assertEquals(8.5, $sum);
    }
    
    public function testNonNumericInput(){
    	$this->setExpectedException('Exception');
    	
    	$computation = new Computation(array(1, 'a', 3));
    }
    
    public function testMedianArrayLengthOne(){
    	$computation = new Computation(array(1));
    	
    	$median = $computation->median();
    	$this->assertEquals(1, $median);
    }
    
    public function testMedianArrayLengthZero(){
    	$this->setExpectedException('Exception');
    	
    	$computation = new Computation(array());
    	$median = $computation->median();
    }
    
    public function testNonArrayConstructor(){
    	$this->setExpectedException('Exception');
    	
    	$computation = new Computation(null);
    }
}
