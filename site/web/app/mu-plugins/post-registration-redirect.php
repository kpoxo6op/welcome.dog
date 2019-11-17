<?php
/*
Plugin Name:  Post Registration Redirect
Plugin URI:   https://boris.rip
Description:  Redirect non-admins to home after logging into the site.
Version:      0.0.1
Author:       boris
Author URI:   https://boris.rip
License:      MIT License
*/

function homepage_redirect( $redirect_to, $request, $user ) {
    if (!is_wp_error($user)) {
        // do redirects on successful login
        if ($user->has_cap('administrator')) {
            return admin_url();
        } else {
            return WP_HOME;
            //return WP_HOME.'/submit-place/';
        }
    } else {
        // display errors
        return $redirect_to;
    }
}
add_filter('login_redirect', 'homepage_redirect', 10, 3);
