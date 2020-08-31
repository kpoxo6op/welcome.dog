<?php
/*
Plugin Name:  Where post title like condition
Plugin URI:   https://wordpress.stackexchange.com/questions/18703/wp-query-with-post-title-like-something
Description:  add filter which enables searching by post title with LIKE clause
Version:      0.0.1
Author:       boris
Author URI:   https://boris.rip/
License:      MIT License
*/

function title_filter($where, &$wp_query){
    global $wpdb;

    if($search_term = $wp_query->get( 'search_prod_title' )){
        /*using the esc_like() in here instead of other esc_sql()*/
        $search_term = $wpdb->esc_like($search_term);
        $search_term = ' \'%' . $search_term . '%\'';
        $where .= ' AND ' . $wpdb->posts . '.post_title LIKE '.$search_term;
    }

    return $where;
}