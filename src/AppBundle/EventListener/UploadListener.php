<?php

namespace AppBundle\EventListener;

use Doctrine\Common\Persistence\ObjectManager;
use Oneup\UploaderBundle\Event\PostPersistEvent;


class UploadListener {
    
    private $om;
    
    public function __construct(ObjectManager $om) {
        $this->om = $om;
    }
    
    public function onUpload(PostPersistEvent $event)
    {                
        
        $id = $event->getRequest()->request->get('id');        
        $file = $event->getFile();
        
       
        
        $cliente = $this->om->getRepository("AppBundle:Cliente")->find($id);
        
        if ($cliente !== null)
        {
            $fileName = $file->getFileName();            
            $extension = $file->guessExtension();
            if ($extension == 'jpg' || $extension == 'png' || $extension == 'jpeg')
            {                
                $cliente->setImagen($fileName);
                $this->om->persist($cliente);
                $this->om->flush();
            }
            else
            {
                echo "extensión inválida";
            }
        }
        
        
    }
    
    
}
