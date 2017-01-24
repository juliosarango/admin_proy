<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Lote
 *
 * @ORM\Table(name="lote", indexes={@ORM\Index(name="IDX_65B4329FFCF8192D", columns={"id_usuario"})})
 * @ORM\Entity
 */
class Lote
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="lote_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="id_proyecto", type="integer", nullable=false)
     */
    private $idProyecto;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre_lote", type="string", length=200, nullable=true)
     */
    private $nombreLote;

    /**
     * @var string
     *
     * @ORM\Column(name="medidas", type="string", length=100, nullable=true)
     */
    private $medidas;

    /**
     * @var string
     *
     * @ORM\Column(name="descripcion", type="text", nullable=true)
     */
    private $descripcion;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="fecha_registro", type="datetime", nullable=true)
     */
    private $fechaRegistro = 'now()';

    /**
     * @var \Usuario
     *
     * @ORM\ManyToOne(targetEntity="Usuario")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_usuario", referencedColumnName="id")
     * })
     */
    private $idUsuario;



    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set idProyecto
     *
     * @param integer $idProyecto
     *
     * @return Lote
     */
    public function setIdProyecto($idProyecto)
    {
        $this->idProyecto = $idProyecto;

        return $this;
    }

    /**
     * Get idProyecto
     *
     * @return integer
     */
    public function getIdProyecto()
    {
        return $this->idProyecto;
    }

    /**
     * Set nombreLote
     *
     * @param string $nombreLote
     *
     * @return Lote
     */
    public function setNombreLote($nombreLote)
    {
        $this->nombreLote = $nombreLote;

        return $this;
    }

    /**
     * Get nombreLote
     *
     * @return string
     */
    public function getNombreLote()
    {
        return $this->nombreLote;
    }

    /**
     * Set medidas
     *
     * @param string $medidas
     *
     * @return Lote
     */
    public function setMedidas($medidas)
    {
        $this->medidas = $medidas;

        return $this;
    }

    /**
     * Get medidas
     *
     * @return string
     */
    public function getMedidas()
    {
        return $this->medidas;
    }

    /**
     * Set descripcion
     *
     * @param string $descripcion
     *
     * @return Lote
     */
    public function setDescripcion($descripcion)
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    /**
     * Get descripcion
     *
     * @return string
     */
    public function getDescripcion()
    {
        return $this->descripcion;
    }

    /**
     * Set fechaRegistro
     *
     * @param \DateTime $fechaRegistro
     *
     * @return Lote
     */
    public function setFechaRegistro($fechaRegistro)
    {
        $this->fechaRegistro = $fechaRegistro;

        return $this;
    }

    /**
     * Get fechaRegistro
     *
     * @return \DateTime
     */
    public function getFechaRegistro()
    {
        return $this->fechaRegistro;
    }

    /**
     * Set idUsuario
     *
     * @param \AppBundle\Entity\Usuario $idUsuario
     *
     * @return Lote
     */
    public function setIdUsuario(\AppBundle\Entity\Usuario $idUsuario = null)
    {
        $this->idUsuario = $idUsuario;

        return $this;
    }

    /**
     * Get idUsuario
     *
     * @return \AppBundle\Entity\Usuario
     */
    public function getIdUsuario()
    {
        return $this->idUsuario;
    }
}
