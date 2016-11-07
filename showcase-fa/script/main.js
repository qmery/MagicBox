var qmeryConfig = {
	"token" 			: "fa8e92d0c24f",
	"sliderSlides" 		: 5,
	"sliderSort" 		: "id",		// id, title, length, create_date, modified_date, viewed
	"sliderSortDir" 	: "desc",	// asc, desc
	"categorySort" 		: "videos",	// id, title, videos, create_date, last_modified
	"categorySortDir"	: "desc",	// asc, desc
	"categoryVideoLimit": 10, 		// 0 for unlimited
	"pageTitle"			: "My Channel",
}

var qmerySlider = function(){
	
	var template = '<div class="sliderItem"> \
						<a class="qmsc-link" href=".html"> \
							<img class="qmsc-img" src="images/s1.jpg"> \
							<div class="content_slider"> \
								<h3 class="qmsc-title">Spotlight</h3> \
								<h5 class="qmsc-desc"> \
								</h5> \
							</div> \
							<div class="overlay_player"> \
								<div class="play-button-slider"> \
									<i class="fa fa-play" aria-hidden="true"></i> \
								</div> \
							</div> \
						</a> \
					</div>';
	var smallTemplate = '<div class="item"> \
							<div class="item_image"> \
								<a  class="qmsc-link" href="player.html"> \
									<h3 class="qmsc-title">تست1</h3> \
									<img src="images/s1.jpg" class="img-responsive qmsc-img"> \
									<div class="overlay_player"> \
										<div class="play-button-slider"> \
											<i class="fa fa-play" aria-hidden="true"></i> \
										</div> \
									</div> \
								</a> \
							</div> \
							<div class="caption qmsc-desc"> \
							</div> \
						</div>';
	
	
	$.ajax({
		"url" 	: "http://api.qmery.com/v1/videos.json",
		"data" 	: {
			"api_token" : qmeryConfig.token,
			"sort"		: qmeryConfig.sliderSort,
			"sort_dir"	: qmeryConfig.sliderSortDir,
			"per_page"	: qmeryConfig.sliderSlides
		},
		"success" : function(data) {
			$.each(data, function(k,v){
				t = $(template).clone();
				st = $(smallTemplate).clone();
				t.find('.qmsc-title').html(v.title)
				t.find('.qmsc-desc').html(v.description)
				t.find('.qmsc-img').attr('src',v.thumbnail[0])
				t.find('.qmsc-link').attr('href','player.html?' + v.hash_id);
				t.appendTo($('.slider'));
				
				st = $(smallTemplate).clone();
				st.find('.qmsc-title').html(v.title)
				st.find('.qmsc-desc').html(v.description)
				st.find('.qmsc-img').attr('src',v.thumbnail[0])
				st.find('.qmsc-link').attr('href','player.html?' + v.hash_id);
				st.appendTo($('.small-qmsc-show'));
			});
			
			$('.slider').slick({
							dots: true,
							centerMode: true,
							centerPadding: '60px',
							slidesToShow: 3,
							speed: 500,
							infinite: false,
							responsive: [{
								breakpoint: 768,
								settings: {
									arrows: true,
									centerMode: true,
									centerPadding: '40px',
									slidesToShow: 3
								}
							}, {
								breakpoint: 480,
								settings: {
									arrows: false,
									centerMode: true,
									centerPadding: '40px',
									slidesToShow: 1
								}
							}]
						});


						
						$('.slider [data-slick-index=0]').next().addClass('nextSlide');
						$('.slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
							$('.slider [data-slick-index]').removeClass('nextSlide prevSlide');
							$('.slider [data-slick-index=' + nextSlide + ']').prev().addClass('prevSlide');
							$('.slider [data-slick-index=' + nextSlide + ']').next().addClass('nextSlide');
						});
			
		}
	})
}


var qmery = function(groupHash,callback){
	token = qmeryConfig.token;
	var callback = callback;
	categoryHolder = $('#categoryHolder');
	template = '<div class="item">  \
            <div class="item_image"> \
                <a href="player.html"> \
                    <h3 class="qmsc-title"></h3> \
                    <img src="images/s1.jpg" class="img-responsive"> \
                    <div class="overlay_player"> \
                        <div class="play-button-slider"> \
                            <i class="fa fa-play" aria-hidden="true"></i> \
                        </div> \
                    </div> \
                </a> \
            </div> \
            <div class="caption"> \
                <p></p> \
            </div> \
        </div>';
	holderTemplate = '<section class="col-lg-12 col-md-12 col-sm-12 col-xs-12 playlist no_padding"> \
							<h3>\
								<a href="category.html" class="qmsc-title qmsc-link">(<span class="Number-cat">2</span>)\
									\
									دسته بندی\
								</a>\
							</h3>\
							<section class="qmsc-listholder playlist_slider"></section> \
						</section>';
	itemTemplate = '<div class="video_list"> \
							<a class="qmsc-link" href=""> \
								<img class="qmsc-img" src="images/l1.jpg" class="img-responsive" style="width: 336px;height:186px"> \
								<div class="txt_video"> \
									<div class="duration_txt qmsc-time">3 min</div> \
									<div class="qmsc-title title">Central Intelligence</div> \
									<div class="qmsc-desc description">\
									</div> \
								</div> \
								<div class="overlay_player"> \
									<div class="play-button-slider"> \
										<i class="fa fa-play" aria-hidden="true"></i> \
									</div> \
								</div> \
							</a> \
						</div>';
	
	
	
	
	var that = this;
	
	getVideos = function(holder, category, type) {
		var holder = holder;
		cfg = $.extend({},type, {"api_token":this.token});
		$.ajax({
			"url" 		: "http://api.qmery.com/v1/groups/" + category.hash_id + ".json",
			"data"		: cfg,
			success : function(data) {
				if(that.categories)
					that.categories[that.categories.indexOf(category)] = data;
				that.renderCategoryVideos(holder, data);
				document.title = data.title;
			}
		})
	}
	
	if( groupHash ) {
		
		this.getVideos(this.categoryHolder,groupHash);
		document.title = qmeryConfig.pageTitle;
	}
	
	renderCategoryVideos = function(holder,category) {
		
		var holder = holder;
		$.each(category.videos,function(k,v){
				if(!v.link.length)
					return;
				num = Math.ceil ( v.description.length / 50 );
				if( v.description.length == 0)
					num = 3;
				
				for (i=0;i<=num;i++) {
					v.description += '<br />';
				}
				
				item = $(that.itemTemplate).clone();
				item.find('.qmsc-img').attr('src',v.thumbnail[0]);
				item.find('.qmsc-title').html(v.title);
				item.find('.qmsc-desc').html(v.description);
				item.find('.qmsc-time').html(v.length.toString().toHHMMSS());
				item.find('.qmsc-link').attr('href','player.html?' + v.hash_id);
				item.appendTo(holder.find('.qmsc-listholder'));
		})
		if(typeof $().slick == 'function')
			holder.find('.qmsc-listholder').slick(slickConfig);
		if(typeof callback == 'function')
			callback(category);
		
		
	}
	
	getCategories = function(token, type) {
		$.ajax({
			"url"		: "http://api.qmery.com/v1/groups.json",
			"data"		: {
				"api_token" : this.token,
				"sort"		: qmeryConfig.categorySort,
				"sort_dir"	: qmeryConfig.categorySortDir
			},
			"success"	: function(data) {
				that.categories = data;
				that.renderCategories(that.categoryHolder);
			}
		})
	}
	if( !groupHash ) {
		this.getCategories(this.token, "")
	}
	
	renderCategories = function(holder) {
		$.each(this.categories,function(k,v){
			template = $(that.holderTemplate).clone();
			template.find('.qmsc-link').attr('href','category.html?' + v.hash_id);
			template.find('.qmsc-title').html(v.title + ' <i class="fa fa-chevron-left" aria-hidden="true"></i> (' + v.video_count +')');
			holder.append(template);
			cfg = {};
			if( parseInt(qmeryConfig.categoryVideoLimit) > 0 ) {
				cfg = {"per_page" : qmeryConfig.categoryVideoLimit }
			}
			that.getVideos(template,v,cfg);
			//that.renderVideos(template, v)
		})
	}
	
	
	return({
		"token" 		: this.token,
	})
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}