<?php

namespace AppBundle\EventListener;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Doctrine\ORM\Event\LifecycleEventArgs;
use AppBundle\Entity\Proyecto;
use AppBundle\Entity\Lote;
use AppBundle\Entity\LoteCliente;

class AddUserEntity {
    
    private $tokenStorage;
            
    public function __construct(TokenStorageInterface $tokenStorage) {        
        $this->tokenStorage = $tokenStorage;
       
    }
       
    public function prePersist(LifecycleEventArgs $args)
    {        
        $user = $this->tokenStorage->getToken()->getUser();        
        $entity = $args->getEntity();
        if ($entity instanceof Proyecto || $entity instanceof Lote || $entity instanceof LoteCliente)
        {
            $entity->setIdUsuario($user);
        }                        
    }

    

}
