<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class LoteType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('nombreLote',TextType::class, array("label"=>"Nombre","attr"=>array("class"=>"form-control","placeholder"=>"Nombre del Lote")))
                ->add('medidas', TextType::class, array("label"=>"Medidas","attr"=>array("class"=>"form-control","placeholder"=>"Medidas del Lote")))
                ->add('descripcion',TextareaType::class, array("label"=>"Descripción","attr"=>array("class"=>"form-control","placeholder"=>"Descripción del Lote")));
    }
    
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Lote'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'appbundle_lote';
    }


}
