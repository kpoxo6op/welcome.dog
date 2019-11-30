<?php

namespace App\Controllers;

use Sober\Controller\Controller;
class TaxonomyDogplaceType extends Controller {
    public function category() {
        return get_term(get_queried_object_id(), 'dogplace-type');
    }

    public function category_dogplaces() {
        $raw_posts = get_posts([
            'post_type' => 'dogplace',
            'orderby'   => 'date',
            'order'     => 'desc',
            'posts_per_page' => 10,
            'tax_query' => [
                [
                    'taxonomy' => 'dogplace-type',
                    'field' => 'term_id',
                    'terms' => get_queried_object_id(),
                    'include_children' => false,
                ]
            ]
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
            ];
        }, $raw_posts);
    }

    public function all_categories() {
        $all_categories_obj = get_terms([
            'taxonomy' => 'dogplace-type',
            'hide_empty' => false,
            'orderby' => 'parent',
            'order' => 'asc',
        ]);

        $categories_array = array_map(function ($category) {
            return [
                'name'     => $category->name,
                'permalink'=> get_term_link($category),
                'id'       => $category->term_id,
                'parent_id'   => $category->parent,
            ];
        }, $all_categories_obj);
        
        foreach($categories_array as $key => $value) {
            if ($categories_array[$key]['parent_id'] === 0) {
                $keys = array_keys(array_column($categories_array, 'parent_id'), $categories_array[$key]['id']);
                foreach ($keys as $subcategory_key) {
                    $categories_array[$key]['subcategories'][] = $categories_array[$subcategory_key];
                }
                if (empty($keys)) {
                    $categories_array[$key]['subcategories'][] = null;
                }
                $categories_menu_items[] = $categories_array[$key];
            }
        }

        return $categories_menu_items;
    }
}
