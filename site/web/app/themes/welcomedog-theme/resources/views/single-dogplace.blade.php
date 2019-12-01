@extends('layouts.app')
@section('content')
  @debug
  @dump($dogplace_map)
  @while(have_posts()) @php the_post() @endphp
    @include('partials.content-single-'.get_post_type())
    {!! $dogplace_map->address !!}
  @endwhile
@endsection
