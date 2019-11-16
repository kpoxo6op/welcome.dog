<?php

namespace App\Controllers;

use Sober\Controller\Controller;
class FrontPage extends Controller {
    public function latest_dogplaces() {
        $args = get_posts([
            'post_type' => 'dogplace',
            'orderby'   => 'date',
            'order'     => 'desc',
            'posts_per_page' => 3,
        ]);

        return array_map(function ($post) {
            return [
                'content'   => apply_filters('the_content', $post->post_content),
                'excerpt'   => apply_filters('the_excerpt', $post->post_content),
                'thumbnail' => get_the_post_thumbnail($post->ID, 'large'),
                'thumb_url' => get_the_post_thumbnail_url($post->ID, 'large'),
                'alt'       => get_post_meta(get_post_thumbnail_id($post->ID), '_wp_attachment_image_alt', true),
                'title'     => apply_filters('the_title', $post->post_title),
                'permalink' => apply_filters('permalink', get_permalink($post)),
                'type'      => get_the_terms($post->ID, 'dogplace-type'),
            ];
        }, $args);
    }
}