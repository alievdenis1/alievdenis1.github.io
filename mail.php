<?php

$recepient = "alievdenis1@ya.ru";
$sitename = "IKEA74.COM";

$name = trim($_GET["yourName"]);
$phone = trim($_GET["yourPhone"]);


$pagetitle = "Новая заявка с сайта \"$sitename\"";
$message = "Имя: $name \nТелефон: $phone";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
