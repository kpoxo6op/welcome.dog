@extends('layouts.app')

@section('content')
  @include('partials.page-header')
  <p>{!! $category->description !!}</p>

  <main class="flex-1 flex">
    <div class="p-3 flex-1 overflow-y-auto">
    @foreach($category_dogplaces as $dp)
    <div class="max-w-sm w-full lg:max-w-full lg:flex mt-2">
      <a class="" href="{!! $dp['permalink'] !!}">
        <div class="h-48 w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style="background-image: url('{!! $dp['thumb_url'] !!}')" title="{!! $dp['alt'] !!}">
        </div>
      </a>
      <div class="bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal lg:ml-4">
        <div class="mb-8">
          <div class="text-gray-900 font-bold text-xl mb-2">
            <a class="" href="{!! $dp['permalink'] !!}">{{ $dp['title'] }}</a>
          </div>
          <div class="text-gray-700 text-base">{!! $dp['excerpt'] !!}</div>
        </div>
      </div>
    </div>    
    @endforeach
    </div>
  </main>
  <h3>All Categories</h3>
  <div class="container bg-grey-lighter p-8">
      <div class="sm:flex mb-4">
          @foreach($all_categories as $category)
          <div class="sm:w-1/4 h-auto">
              <div class="text-orange mb-2">{!! $category['name'] !!}</div>
              <ul class="list-reset leading-normal">
                  @foreach($category['subcategories'] as $subcategory)
                  <li class="hover:text-orange text-grey-darker"><a class="" href="{!! $subcategory['permalink'] !!}">{{ $subcategory['name'] }}</a></li>
                  @endforeach
              </ul>
          </div>
          @endforeach
      </div>
  </div>
  {!! get_the_posts_navigation() !!}
@endsection