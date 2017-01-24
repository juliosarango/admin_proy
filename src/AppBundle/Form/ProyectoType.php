<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class ProyectoType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('nombre',  TextType::class, array("label"=>"Nombre del Proyecto","attr"=>array("class"=>"form-control","placeholder"=>"Nombre del Proyecto")))
                ->add('lugar', TextType::class, array("label"=>"Lugar del Proyecto","attr"=>array("class"=>"form-control","placeholder"=>"Lugar del Proyecto")))
                ->add('descripcion', TextareaType::class, array("label"=>"Descripción","attr"=>array("class"=>"form-control","placeholder"=>"Descripción del Proyecto")));
        $builder->addEventListener($eventName, $listener);
    }
    
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Proyecto'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'frm_proyecto';
    }


}
