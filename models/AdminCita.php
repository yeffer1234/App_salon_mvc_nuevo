<?php 

namespace Model;

class AdminCita extends ActiveRecord{

protected static $tabla = "citasServicios";
protected static $columnasDB = ["id","fecha","hora","descripcion","cliente","email","telefono","servicio","precio"];

public $id;
public $fecha;
public $hora;
public $descripcion;
public $cliente;
public $email;
public $telefono;
public $servicio;
public $precio;

public function __construct()
{
    $this->id = $args["id"] ?? null;
    $this->fecha = $args["fecha"] ?? "";
    $this->hora = $args["hora"] ?? "";
    $this->descripcion = $args["descripcion"] ?? "";
    $this->cliente = $args["cliente"] ?? "";
    $this->email = $args["email"] ?? "";
    $this->telefono = $args["telefono"] ?? "";
    $this->servicio = $args["servicio"] ?? "";
    $this->precio = $args["precio"] ?? "";
}

}