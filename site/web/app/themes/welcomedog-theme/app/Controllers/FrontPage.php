<?php

namespace App\Controllers;

use Sober\Controller\Controller;
class FrontPage extends Controller {
    public function latest_dogplaces() {
        $raw_posts = get_posts([
            'post_type' => 'dogplace',
            'orderby'   => 'date',
            'order'     => 'desc',
            'posts_per_page' => 3,
        ]);
        
        return array_map(function ($post) {
            return [
                'title'     => apply_filters('the_title', $post->post_title),
                'content'   => apply_filters('the_content', $post->post_content),
                'excerpt'   => apply_filters('the_excerpt', $post->post_excerpt),
                'thumbnail' => get_the_post_thumbnail($post->ID, 'large'),
                'thumb_url' => get_the_post_thumbnail_url($post->ID, 'large'),
                'alt'       => get_post_meta(get_post_thumbnail_id($post->ID), '_wp_attachment_image_alt', true),
                'permalink' => apply_filters('permalink', get_permalink($post)),
                'term_link' => get_term_link(current(get_the_terms($post->ID, 'dogplace-type'))),
                'type' => (current(get_the_terms($post->ID, 'dogplace-type')))->name,
                /*
                lines above produce this error:
                current() expects parameter 1 to be array, bool given, probably due to Dogplace taxonomy doubling
                */
            ];
        }, $raw_posts);
    }
}
