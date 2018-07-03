$(function () {
    "use strict";

    /*-----------------------------------
     * FIXED  MENU - HEADER
     *-----------------------------------*/
    function menuscroll() {
        var $navmenu = $('.nav-menu');
        if ($(window).scrollTop() > 50) {
            $navmenu.addClass('is-scrolling');
        } else {
            $navmenu.removeClass("is-scrolling");
        }
    }
    menuscroll();
    $(window).on('scroll', function () {
        menuscroll();
    });
    /*-----------------------------------
     * NAVBAR CLOSE ON CLICK
     *-----------------------------------*/

    $('.navbar-nav > li:not(.dropdown) > a').on('click', function () {
        $('.navbar-collapse').collapse('hide');
    });
    /* 
     * NAVBAR TOGGLE BG
     *-----------------*/
    var siteNav = $('#navbar');
    siteNav.on('show.bs.collapse', function (e) {
        $(this).parents('.nav-menu').addClass('menu-is-open');
    })
    siteNav.on('hide.bs.collapse', function (e) {
        $(this).parents('.nav-menu').removeClass('menu-is-open');
    })

    /*-----------------------------------
     * ONE PAGE SCROLLING
     *-----------------------------------*/
    // Select all links with hashes
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[data-toggle="tab"]').on('click', function (event) {
        // On-page links
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });
    /*-----------------------------------
     * OWL CAROUSEL
     *-----------------------------------*/
    var $testimonialsDiv = $('.testimonials');
    if ($testimonialsDiv.length && $.fn.owlCarousel) {
        $testimonialsDiv.owlCarousel({
            items: 1,
            nav: true,
            dots: false,
            navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>']
        });
    }

    var $galleryDiv = $('.img-gallery');
    if ($galleryDiv.length && $.fn.owlCarousel) {
        $galleryDiv.owlCarousel({
            nav: false,
            center: true,
            loop: true,
            autoplay: true,
            dots: true,
            navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 3
                }
            }
        });
    }

    // data source
    const mapnuUrl = 'http://map.nu.ac.th/geoserver-hgis/ows?';

    // --- map database
    var map = L.map('map', {
        center: [
            16.69, 100.09
        ],
        zoom: 8
    });
    var osm = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.{ext}', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">CartoDB</a> | Developed by GeoLab',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
    });
    const grod = L.tileLayer('http://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    const ghyb = L.tileLayer('http://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    const gter = L.tileLayer('http://{s}.google.com/vt/lyrs=t,m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    //overlay layers
    const pro = L.tileLayer.wms(mapnuUrl, {
        layers: 'hgis:dpc9_province_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 3
    });
    const amp = L.tileLayer.wms(mapnuUrl, {
        layers: 'hgis:dpc9_amphoe_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 3
    });
    const tam = L.tileLayer.wms(mapnuUrl, {
        layers: 'hgis:dpc9_tambon_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 3
    });

    var baseMaps = {
        "แผนที่ถนน OSM": osm,
        'แผนที่ถนน': grod,
        'แผนที่ผสม': ghyb,
        'แผนที่ภูมิประเทศ': gter.addTo(map)
    };

    var overlayMaps = {
        'ขอบเขตจังหวัด': pro.addTo(map),
        'ขอบเขตอำเภอ': amp.addTo(map),
        'ขอบเขตตำบล': tam.addTo(map),
        // 'แหล่งท่องเที่ยวเชิงสุขภาพ': tour.addTo(map),
    };

    // var tour = new L.GeoJSON.AJAX("json", { onEachFeature: popUp });
    var tour;
    var A = 'http://www.cgi.uru.ac.th/marker/marker2/aed-2.png';
    var B1 = 'http://www.cgi.uru.ac.th/marker/flowers_1.png';
    var B21 = 'http://www.cgi.uru.ac.th/marker/villa.png';
    var B22 = 'http://www.cgi.uru.ac.th/marker/festival.png';
    var C = 'http://www.cgi.uru.ac.th/marker/bouddha.png';
    var D = 'http://www.cgi.uru.ac.th/marker/award.png';

    const urlGeoserver = "http://cgi.uru.ac.th/geoserver/upn/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=upn:tour_4326&maxFeatures=50&outputFormat=application%2Fjson";
    const json = 'http://cgi.uru.ac.th/geoserver/upn/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=upn:tour_4326&outputFormat=application%2Fjson';
    const url = "http://map.nu.ac.th/service/tour_data.php";

    $.getJSON(urlGeoserver, {
        tags: "cat",
        tagmode: "any",
        format: "json"
    }, (data) => {
        loadItem(data);
        loadMap(data);
    });

    function loadData(urlGeoserver) {
        // console.log('load data')
        $.getJSON(urlGeoserver, {
            tags: "cat",
            tagmode: "any",
            format: "json"
        }, (data) => {
            loadItem(data);
            loadMap(data);
        });
    }

    function loadItem(dat) {
        $('#flowers').empty();
        $.each(dat.features, (i, item) => {
            // console.log(item.properties.t_name)
            var t_ac = null;
            var t_in = null;
            var t_cc = null;
            var t_sq = null;
            var t_la = null;
            var t_re = null;
            var t_etc = null;

            // console.log(item);
            if (item.properties.t_ac == 1) {
                t_ac = 't_ac';
            }
            if (item.properties.t_in == 1) {
                t_in = 't_in';
            }
            if (item.properties.t_cc == 1) {
                t_cc = 't_cc';
            }
            if (item.properties.t_sq == 1) {
                t_sq = 't_sq';
            }
            if (item.properties.t_la == 1) {
                t_la = 't_la';
            }
            if (item.properties.t_re == 1) {
                t_re = 't_re';
            }
            if (item.properties.t_etc == 1) {
                t_etc = 't_etc';
            }

            // console.log(i)
            $("#flowers").append('<div class="flower" data-category="' + t_ac + ' ' + t_in + ' ' + t_cc + ' ' + t_sq + ' ' + t_la + ' ' + t_re + ' ' + t_etc + '"><span class="tab">' + item.properties.t_name + '</span></div>');

        })



        var $filterCheckboxes = $('input[type="checkbox"]');

        $filterCheckboxes.on('change', function () {
            var selectedFilters = {};
            $filterCheckboxes.filter(':checked').each(function () {
                if (!selectedFilters.hasOwnProperty(this.name)) {
                    selectedFilters[this.name] = [];
                }
                selectedFilters[this.name].push(this.value);
            });

            var $filteredResults = $('.flower');
            $.each(selectedFilters, function (name, filterValues) {
                $filteredResults = $filteredResults.filter(function () {
                    var matched = false,
                        currentFilterValues = $(this).data('category').split(' ');
                    $.each(currentFilterValues, function (_, currentFilterValue) {
                        if ($.inArray(currentFilterValue, filterValues) != -1) {
                            matched = true;
                            return false;
                        }
                    });
                    return matched;
                });
            });
            console.log($filteredResults)
            $('.flower').hide().filter($filteredResults).show();
        });
    }

    function loadMap(data) {

        tour = L.geoJSON(data, {
            pointToLayer: (feature, latlng) => {
                if (feature.properties.t_type == 'A') {
                    var rp = L.icon({
                        iconUrl: A,
                    });
                } else if (feature.properties.t_type == 'B1') {
                    var rp = L.icon({
                        iconUrl: B1,
                    });
                } else if (feature.properties.t_type == 'B2.1') {
                    var rp = L.icon({
                        iconUrl: B21,
                    });
                } else if (feature.properties.t_type == 'B2.2') {
                    var rp = L.icon({
                        iconUrl: B22,
                    });
                } else if (feature.properties.t_type == 'C') {
                    var rp = L.icon({
                        iconUrl: C,
                    });
                } else {
                    var rp = L.icon({
                        iconUrl: D,
                    });
                }
                return L.marker(latlng, {
                    icon: rp,
                    title: 'da'
                })

                //     .on('click', (e) => {
                //     map.setView(e.latlng);
                // });
            },
            onEachFeature: (feature, layer) => {
                // layer.bindPopup(feature.properties.t_name)
                layer.bindPopup("<h6>" + feature.properties.t_name + "</h6>" +
                        "<br/><span id='kanit13'>จุดเด่น:</span> " + feature.properties.t_identity +
                        "<br/><span id='kanit13'>ประเภททัพยากร:</span> " + feature.properties.t_type +
                        "<br/><span id='kanit13'>ระดับศักยภาพ:</span> " + feature.properties.t_potent + ' ดาว' +
                        "<br/><span id='kanit13'>พิกัด:</span> " + feature.properties.lon + "," + feature.properties.lat +
                        "<br/><span id='kanit13'>การเข้าถึง:</span> " + feature.properties.t_ac +
                        "<br/><span id='kanit13'>ความน่าสนใจ:</span> " + feature.properties.t_in +
                        "<br/><span id='kanit13'>ความสามารถในการรองรับ:</span> " + feature.properties.t_cc +
                        "<br/><span id='kanit13'>ศักยภาพ:</span> " + feature.properties.t_sq +
                        "<br/><span id='kanit13'>คุณภาพบริการ:</span>" + feature.properties.t_la +
                        "<br/><span id='kanit13'>--:</span> " + feature.properties.t_re +
                        "<br/><span id='kanit13'>อื่นๆ:</span> " + feature.properties.t_etc
                    )
                    .openPopup();
            }
        });
        overlayMaps['แหล่งท่องเที่ยวเชิงสุขภาพ'] = tour.addTo(map);
    }

    L.control.layers(baseMaps, overlayMaps).addTo(map);



    // map contect   
    map.on('movestart', () => {

    })
    map.on('moveend', () => {
        var bbox = map.getBounds();
        var sw = bbox._southWest;
        var ne = bbox._northEast
        // console.log(sw.lng, sw.lat, ne.lng, ne.lat);
        // loadData()
        var json = 'http://cgi.uru.ac.th/geoserver/upn/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=upn:tour_4326&CQL_FILTER=BBOX(geom,' + sw.lng + ',' + sw.lat + ',' + ne.lng + ',' + ne.lat + ')&outputFormat=application%2Fjson';
        // console.log(json)
        map.eachLayer(function (lyr) {
            if (lyr.options.title == 'da') {
                // console.log(lyr.options.title)
                map.removeLayer(lyr)
            }
        });
        loadData(json)
    });




}); /* End Fn */