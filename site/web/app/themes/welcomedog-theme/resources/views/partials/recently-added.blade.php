<div class="text-center">
  <h2>Recently Added</h2>
</div>  
<div class="block md:flex justify-between md:-mx-2">
    @foreach($latest_dogplaces as $dp)
    <div class="w-full lg:w-1/3 md:mx-2 mb-4 md:mb-0">
        <div class="bg-white rounded-lg overflow-hidden shadow relative">
            <a href="{!! $dp['permalink'] !!}">
                <img src="{!! $dp['thumb_url'] !!}" class="h-56 w-full object-cover object-center wp-post-image" alt="{!! $dp['alt'] !!}">
            </a>
            <div class="p-4 h-auto md:h-40 lg:h-48">
                <a href="{!! $dp['permalink'] !!}" class="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg md:text-base lg:text-lg">{!! $dp['title'] !!}</a>
                <div class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                    <a class="" href="{!! $dp['term_link'] !!}">{{ $dp['type'] }}</a>
                    <p>{!! $dp['excerpt'] !!}</p>
                </div>
                <div class="relative mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block">
                    <!---<a class="inline bg-gray-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700" href="#">#hashtag</a>--> 
                </div>
            </div>
        </div>
    </div>
    @endforeach
    @php(wp_reset_postdata())
</div>
