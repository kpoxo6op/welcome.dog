{{--
  Template Name: Pure PHP
--}}


@php
  $taxonomies = get_taxonomies();
  foreach ( $taxonomies as $taxonomy ) {
    echo '<p>' . $taxonomy . '</lp>';
  }
@endphp
