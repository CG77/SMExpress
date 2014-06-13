<?php

namespace SMExpress\Bundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Novactive\eZNovaExtraBundle\Controller\BaseController;

class SMExpressController extends BaseController{

    public function viewLocationAction($locationId, $layout = false)

    {
        $contentService = $this->getRepository()->getContentService();
        $locationService = $this->getRepository()->getLocationService();
        $location = $locationService->loadLocation($locationId);
        $content = $contentService->loadContentByContentInfo($location->getContentInfo());

        $urlAPI = $this->get( 'service_container' )->getParameter( "api_smexpress" );

        return $this->render(
            'SMExpressBundle:Full:page_express.html.twig',
            array(

                'location' => $location,
                'content' =>$content,
                'urlAPI' =>$urlAPI

            ));


    }



}