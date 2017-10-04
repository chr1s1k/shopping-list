<?php

error_reporting(E_ALL ^ E_NOTICE);

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../database.php';
include_once './ShoppingList.php';

$result_arr = array();

// get posted data sent as JSON object
//$data = json_decode(file_get_contents("php://input"));

if (isset($_POST['items'])) {

  $database = new Database();
  $db = $database->getConnection();

  $list = new ShoppingList($db);

  $list->setItems($_POST['items']);
  $list->setCreated(date("Y-m-d"));
  $list->setSLID(uniqid());

  // create list and retrieve ID of created record
  $createdListId = $list->create();

  // get procotol + hostname
  if (isset($_SERVER['REQUEST_SCHEME'])) {
    $protocol = $_SERVER['REQUEST_SCHEME'];
  } else {
    $protocol = "http";
  }
  $referer = $protocol . "://" . $_SERVER['SERVER_NAME'];

  if (is_numeric($createdListId)) {
    $result_arr = array(
      'result' => 'success',
      'slid' => $list->getSLID(),
      'referer' => $referer
    );
  } else {
    $result_arr = array(
      'result' => 'error'
    );
  }

} else {
  $result_arr = array(
    'result' => 'no_data'
  );
}

// send JSON response
echo json_encode($result_arr);