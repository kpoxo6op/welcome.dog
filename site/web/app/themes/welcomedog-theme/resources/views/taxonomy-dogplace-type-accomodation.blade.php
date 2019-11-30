@extends('layouts.app')

@section('content')
  @include('partials.page-header')

  @php
    echo "this is taxonomy-dogplace-type-accomodation.blade<br>\n";
    echo "use it to show special templates for Accomodation<br>\n";
  @endphp  

  {!! get_the_posts_navigation() !!}
@endsection
