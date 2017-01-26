<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Lote;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\Proyecto;
use Symfony\Component\HttpFoundation\Session\Session;

/**
 * Lote controller.
 *
 */
class LoteController extends Controller
{
    /**
     * Lists all lote entities.
     *
     */
    public function indexAction(Proyecto $pId)
    {        
        
        $session = new Session();        
        $session->set("proyecto", $pId);
        
        $em = $this->getDoctrine()->getManager();

        $lotes = $em->getRepository('AppBundle:Lote')->findBy(array('idProyecto' => $pId));
        

        return $this->render('AppBundle:lote:index.html.twig', array(
            'lotes' => $lotes,
            'pId' => $pId,
        ));
    }

    /**
     * Creates a new lote entity.
     *
     */
    public function newAction(Proyecto $pId,Request $request)
    {                        
        $lote = new Lote();
        $form = $this->createForm('AppBundle\Form\LoteType', $lote);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();             
            $lote->setIdProyecto($pId);
            $em->persist($lote);
            $em->flush($lote);

            return $this->redirectToRoute('proyecto_lote_show', array('pId'=>$pId->getId(),'id' => $lote->getId()));
        }

        return $this->render('AppBundle:lote:new.html.twig', array(
            'lote' => $lote,
            'pId'  => $pId,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a lote entity.
     *
     */
    public function showAction(Proyecto $pId,Lote $lote)
    {
        $deleteForm = $this->createDeleteForm($pId,$lote);

        return $this->render('AppBundle:lote:show.html.twig', array(
            'pId' => $pId,
            'lote' => $lote,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing lote entity.
     *
     */
    public function editAction(Request $request,Proyecto $pId, Lote $lote)
    {
        $deleteForm = $this->createDeleteForm($pId,$lote);
        $editForm = $this->createForm('AppBundle\Form\LoteType', $lote);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('proyecto_lote_edit', array('id' => $lote->getId()));
        }

        return $this->render('AppBundle:lote:edit.html.twig', array(
            'lote' => $lote,
            'pId' => $pId,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a lote entity.
     *
     */
    public function deleteAction(Request $request, Lote $lote)
    {
        $form = $this->createDeleteForm($lote);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($lote);
            $em->flush($lote);
        }

        return $this->redirectToRoute('proyecto_lote_index');
    }

    /**
     * Creates a form to delete a lote entity.
     *
     * @param Lote $lote The lote entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Proyecto $pId,Lote $lote)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('proyecto_lote_delete', array('pId'=>$pId->getId(),'id' => $lote->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
