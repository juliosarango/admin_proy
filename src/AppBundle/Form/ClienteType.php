<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class ClienteType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('cedula', TextType::class, array("label"=>"Cédula","attr"=>array("class"=>"form-control","placeholder"=>"Cédula del Cliente")))
                ->add('nombres',TextType::class, array("label"=>"Nombres","attr"=>array("class"=>"form-control","placeholder"=>"Nombred del Cliente")))
                ->add('apellidos',TextType::class, array("label"=>"Apellidos","attr"=>array("class"=>"form-control","placeholder"=>"Apellidos del Cliente")))
                ->add('direccion',TextType::class, array("label"=>"Dirección","attr"=>array("class"=>"form-control","placeholder"=>"Dirección del Cliente")))
                ->add('telefono',TextType::class, array("label"=>"Teléfono","attr"=>array("class"=>"form-control","placeholder"=>"Teléfonos del Cliente")))
                ->add('descripcion',TextareaType::class, array("label"=>"Descripción","attr"=>array("class"=>"form-control","placeholder"=>"Descripción del Cliente")));
    }
    
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Cliente'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'appbundle_cliente';
    }


}
