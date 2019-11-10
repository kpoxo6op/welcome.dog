<div class="text-center">
  <h2>Recently Added</h2>
</div>  
<div class="block md:flex justify-between md:-mx-2">
    @while($latest_dogplaces->have_posts()) @php($latest_dogplaces->the_post())
    <div class="w-full lg:w-1/3 md:mx-2 mb-4 md:mb-0">
        <div class="bg-white rounded-lg overflow-hidden shadow relative">
            <a href="{{ get_permalink() }}">{!! the_post_thumbnail(null, ['class' => 'h-56 w-full object-cover object-center']) !!}</a>
            <div class="p-4 h-auto md:h-40 lg:h-48">
                <a href="{{ get_permalink() }}" class="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg md:text-base lg:text-lg">{!! get_the_title() !!}</a>
                <div class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                    @foreach (get_the_terms(get_the_ID(), 'dogplace-type') as $category)
                        <a class="" href="#">{!! $category->name !!}</a>
                    @endforeach
                    {!! the_excerpt() !!}
                </div>
                <div class="relative mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block">
                    @foreach (get_the_terms(get_the_ID(), 'tag') as $tag)
                        <!-- <a class="inline bg-gray-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700" href="#">#{!! $tag->name !!}</a> -->
                    @endforeach
                </div>
            </div> 
        </div>
    </div>
    @endwhile
    @php(wp_reset_postdata())
</div> 