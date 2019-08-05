<?php

$recepient = "alievdenis1@ya.ru";
$sitename = "IKEA74.COM";

$city = $_POST["citi"];
$street = $_POST["street"];
$home = $_POST["home"];
$apartment = $_POST["apartment"];
$dateDelivery = $_POST["dateDelivery"];
$yourPhone = $_POST["yourPhone"];

$sborka = 'не нужна';
if (trim($_POST["sborka"])==true){
		$sborka = 'нужна';
	}

for ($i = 1; $i <= 500; $i++) {
	if($_POST["artic$i"] != NULL){
			$text .= "Артикул: ";
  		$text .= $_POST["artic$i"];
 		  $text .= " Количество:";
   		$text .= $_POST["count$i"];  
   		$text .= " Стоймость:";
   		$text .= $_POST["price$i"];      
			$text .= "\n";
  	};
}

$message = "Город: $city \n Улица: $street \n Дом: $home\n Квартира: $apartment \n Дата: $dateDelivery \n Номер: $yourPhone  \n Сборка: $sborka \n $text";
$pagetitle = "Новая заявка с сайта \"$sitename\"";

mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
