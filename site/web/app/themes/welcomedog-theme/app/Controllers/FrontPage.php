<?php

namespace App\Controllers;

use Sober\Controller\Controller;
class FrontPage extends Controller {
    public function latest_dogplaces() {
        $args = array(
            'post_type' => 'dogplace',
            'orderby'   => 'date',
            'order'     => 'desc',
            'posts_per_page' => 3,
        );
        $the_query = new \WP_Query($args);
        return $the_query;

    /* not sure how to implement this
    public static function cpt_terms() {
        $dogplace_terms_array = "CPT dogplace category and tags array";
        return $dogplace_terms_array;
    }
    */
    }
}
