<?php

error_reporting(E_ALL ^ E_NOTICE);

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

class ShoppingList {

  // database connection and table name
  private $connection;
  private $tableName = "shoppinglists";

  // object properties
  private $id;
  private $slid;
  private $items;
  private $created;

  public function __construct($db) {
    $this->connection = $db;
  }

  public function setId($id) {
    $this->id = $id;
  }

  public function setSLID($slid) {
    $this->slid = $slid;
  }

  public function setItems($items) {
    $this->items = $items;
  }

  public function setCreated($created) {
    $this->created = $created;
  }

  public function getSLID() {
    return $this->slid;
  }

  public function get($slid) {
    $query = "SELECT * FROM " . $this->tableName . " WHERE slid = :slid LIMIT 1";

    // prepare query statement
    $stmt = $this->connection->prepare($query);

    // bind values
    $stmt->bindParam(':slid', $slid);

    // execute query
    $stmt->execute();

    return $stmt;
  }

  public function create() {
    $query = "INSERT INTO " . $this->tableName . " (id, slid, items, created) VALUES (NULL, :slid, :items, :created)";

    // prepare query statement
    $stmt = $this->connection->prepare($query);

    $this->items = htmlspecialchars(strip_tags($this->items));
    $this->created = htmlspecialchars(strip_tags($this->created));

    // bind values
    $stmt->bindParam(':slid', $this->slid);
    $stmt->bindParam(':items', $this->items);
    $stmt->bindParam(':created', $this->created);

    // execute query
    if ($stmt->execute()) {
      return $this->connection->lastInsertId();
    } else {
      return false;
    }
  }

}