<?php

error_reporting(E_ALL ^ E_NOTICE);

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../database.php';
include_once './ShoppingList.php';

$items_arr = array();
$items_arr["items"] = array();

// check for parameter
if (isset($_GET['id']) && is_numeric($_GET['id'])) {
  $id = $_GET['id'];

  // get database connection
  $database = new Database();
  $db = $database->getConnection();

  // init object
  $shoppingList = new ShoppingList($db);

  // get list
  $stmt = $shoppingList->get($id);
  $num = $stmt->rowCount();

  // check if record was found
  if ($num > 0) {
    // retrieve our table contents
    // fetch() is faster than fetchAll();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $items = explode("|", $row['items']);
      $items_arr["items"] = $items;
    }
  }
}

// send JSON response
echo json_encode($items_arr);