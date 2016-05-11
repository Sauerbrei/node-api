
<?php
$start = microtime(true);




//
// GET REQUEST
//
$headers = array(
	'Content-Type: application/json',
	'Authorization: Basic ' . base64_encode("Test:test") 
);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "localhost:8080/user");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); 

$output = curl_exec($ch);

print_r("<pre>").print_r(json_decode($output,true)).print_r("</pre>");

curl_close($ch);



//
// POST REQUEST
//
$arr = array(
	'username'	=> 'root',
	'pass'		=> 'test'
);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "localhost:8080/thiswontwork");
curl_setopt($ch, CURLOPT_PUT, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($arr));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); 

$output = curl_exec($ch);

print_r("<pre>").print_r(json_decode($output,true)).print_r("</pre>");

curl_close($ch);



echo "<b><i>".round((microtime(true)-$start),5)." sec.</i></b>";