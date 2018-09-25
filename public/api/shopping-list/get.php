<?php

error_reporting(E_ALL ^ E_NOTICE);

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../database.php';
include_once './ShoppingList.php';

$json_response = array();
$json_response["items"] = array();

// check for parameter
if (isset($_GET['slid'])) {
  $slid = $_GET['slid'];

  // get database connection
  $database = new Database();
  $db = $database->getConnection();

  // init object
  $shoppingList = new ShoppingList($db);

  // get list
  $stmt = $shoppingList->get($slid);
  $num = $stmt->rowCount();

  // check if record was found
  if ($num > 0) {
    // retrieve our table contents
    // fetch() is faster than fetchAll();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $items = explode("|", $row['items']);
			$json_response["items"] = $items;
			$json_response["slid"] = $row['slid'];
    }
  }
}

// send JSON response
echo json_encode($json_response);