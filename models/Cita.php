<?php 

namespace Model;

class Cita extends ActiveRecord{
//base de datos
protected static $tabla = "citas";
protected static $columnasDB = ["id","fecha","hora","descripcion","usuarioId"];

public $id;
public $fecha;
public $hora;
public $descripcion;
public $usuarioId;

public function __construct($args = [])
{
    $this->id = $args["id"] ?? null;
    $this->fecha = $args["fecha"] ?? "";
    $this->hora = $args["hora"] ?? "";
    $this->descripcion = $args["descripcion"] ?? "";
    $this->usuarioId = $args["usuarioId"] ?? "";
}

}