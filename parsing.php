<?php
	include_once('curl.php');
	//include_once('simple_html_dom.php');

	$html = curl_get($_POST["urlsite"]);
	if(strlen($html) < 60000){
		$html= curl_get(str_replace("products/", "products/S" , $_POST["urlsite"]));
	}

	$pos = strripos($html, '<meta name="price" content="');

	$i = 28;
	$price ="";	
	if(strlen($html) > 60000){
		while ($html[$pos+$i]!= '.'){

			$price .= $html[$pos+$i];

			$i = $i+1;

		};
	}
	else{
		(int)$price;
		$price = 0;
	};
	
	
	echo preg_replace("/[^x\d|*\.]/","",$price);