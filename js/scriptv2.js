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
    };

    // var tour = new L.GeoJSON.AJAX("json", { onEachFeature: popUp });

    var A = 'http://www.cgi.uru.ac.th/marker/marker2/aed-2.png';
    var B1 = 'http://www.cgi.uru.ac.th/marker/flowers_1.png';
    var B21 = 'http://www.cgi.uru.ac.th/marker/villa.png';
    var B22 = 'http://www.cgi.uru.ac.th/marker/festival.png';
    var C = 'http://www.cgi.uru.ac.th/marker/bouddha.png';
    var D = 'http://www.cgi.uru.ac.th/marker/award.png';



    var urlGeoserver = "http://cgi.uru.ac.th/geoserver/upn/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=upn:tour_4326&outputFormat=application%2Fjson";
    const json = 'http://cgi.uru.ac.th/geoserver/upn/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=upn:tour_4326&outputFormat=application%2Fjson';
    // const url = "http://map.nu.ac.th/service/tour_data.php";


    var tour;
    var marker;

    refreshData(urlGeoserver)

    function refreshData(url) {
        $.getJSON(url, {
            tags: "cat",
            tagmode: "any",
            format: "json"
        }, (data) => {
            loadMap(data);
            loadItem(data);
        });
    }

    function assignVal(itms) {
        if (itms == 't_ac') {
            return '%20and%20t_ac=1';
        } else if (itms == 't_in') {
            return '%20and%20t_in=1';
        } else if (itms == 't_cc') {
            return '%20and%20t_cc=1';
        } else if (itms == 't_sq') {
            return '%20and%20t_sq=1';
        } else if (itms == 't_la') {
            return '%20and%20t_la=1';
        } else if (itms == 't_re') {
            return '%20and%20t_re=1';
        } else if (itms == 't_etc') {
            return '%20and%20t_etc=1';
        }
    }

    var cql;

    var tmp = [];
    $("input[name='fl-colour']").change(function () {
        var checked = $(this).val();
        cql = '';
        if ($(this).is(':checked')) {
            tmp.push(checked);
            $.each(tmp, (i, itms) => {
                cql += assignVal(itms)
            })
        } else {
            tmp.splice($.inArray(checked, tmp), 1);
            $.each(tmp, (i, itms) => {
                cql += assignVal(itms)
            })
        }
        callData();
        console.log()
    });

    function loadItem(data) {
        // console.log(data);
        $('#flowers').empty();
        $.each(data.features, (i, item) => {
            // console.log(item.properties.t_name)
            var t_ac = null;
            var t_in = null;
            var t_cc = null;
            var t_sq = null;
            var t_la = null;
            var t_re = null;
            var t_etc = null;

            var t_prov = null;
            var st = null;
            var pl = null;
            var ud = null;
            var pb = null;

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

            // if (item.properties.provcode == 63) {
            //     t_prov = 'ตาก';
            // } else if (item.properties.provcode == 64) {
            //     t_prov = 'สุโขทัย';
            // } else if (item.properties.provcode == 65) {
            //     t_prov = 'พิษณุโลก';
            // } else if (item.properties.provcode == 53) {
            //     t_prov = 'อุตรดิตถ์';
            // } else if (item.properties.provcode == 67) {
            //     t_prov = 'เพชรบูรณ์';
            // }


            // console.log(i)
            $(".flowers").append('<div class="flower" data-value="' +
                item.properties.lat +
                ',' +
                item.properties.lon +
                ',' +
                item.properties.t_name +
                ',' +
                item.properties.t_identity +
                '" data-category="' +
                t_ac +
                ' ' +
                t_in +
                ' ' +
                t_cc +
                ' ' +
                t_sq +
                ' ' +
                t_la +
                ' ' +
                t_re +
                ' ' +
                t_etc +
                '">' +
                item.properties.t_name +
                '</div>');
        })

        var star = [];
        // for (var i = item.properties.t_potent; i >= 1; i++) {
        //     star.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');

        // }

        // for (i = 0; i < item.properties.t_potent; i++) {
        //     star.push('<i id="star" class="fa fa-star" aria-hidden="true" style="color: gold;"></i>');
        // }



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
                    var matched = false;
                    var currentFilterValues = $(this).data('category').split(' ');
                    $.each(currentFilterValues, function (_, currentFilterValue) {
                        if ($.inArray(currentFilterValue, filterValues) != -1) {
                            matched = true;
                            return false;
                        }
                    });
                    return matched;
                });
            });
            $('.flower').hide().filter($filteredResults).show();
        });

        $('.flowers').on('click', '.flower', function () {
            var dat = $(this).attr('data-value').split(',');
            L.popup({
                    maxWidth: 200,
                    offset: [5, -25]
                })
                .setLatLng([dat[0], dat[1]])
                .setContent("<h6>" + dat[2] + "</h6>" +
                    "<br/><span id='kanit13'>จุดเด่น:</span>  <br/>" + dat[3])
                .openOn(map);
        })
    }

    function onEachFeature(feature, layer) {
        layer.bindPopup("<h6>" + feature.properties.t_name + "</h6>" +
                "<br/><span id='kanit13'>จุดเด่น:</span> " + feature.properties.t_identity, {
                    maxWidth: 200
                })
            .openPopup();
    };

    function loadMap(data) {
        map.eachLayer(function (lyr) {
            if (lyr.options.iconName == 'da') {
                map.removeLayer(lyr)
            }
        });
        tour = L.geoJSON(data, {
            pointToLayer: (feature, latlng) => {
                if (feature.properties.t_type == 'A') {
                    var rp = L.icon({
                        iconUrl: A,
                        iconSize: [32, 37],
                        iconAnchor: [12, 37],
                        popupAnchor: [5, -30]
                    });
                } else if (feature.properties.t_type == 'B1') {
                    var rp = L.icon({
                        iconUrl: B1,
                        iconSize: [32, 37],
                        iconAnchor: [12, 37],
                        popupAnchor: [5, -30]

                    });
                } else if (feature.properties.t_type == 'B2.1') {
                    var rp = L.icon({
                        iconUrl: B21,
                        iconSize: [32, 37],
                        iconAnchor: [12, 37],
                        popupAnchor: [5, -30]
                    });
                } else if (feature.properties.t_type == 'B2.2') {
                    var rp = L.icon({
                        iconUrl: B22,
                        iconSize: [32, 37],
                        iconAnchor: [12, 37],
                        popupAnchor: [5, -30]
                    });
                } else if (feature.properties.t_type == 'C') {
                    var rp = L.icon({
                        iconUrl: C,
                        iconSize: [32, 37],
                        iconAnchor: [12, 37],
                        popupAnchor: [5, -30]
                    });
                } else {
                    var rp = L.icon({
                        iconUrl: D,
                        iconSize: [32, 37],
                        iconAnchor: [12, 37],
                        popupAnchor: [5, -30]
                    });
                }
                return marker = new L.marker(latlng, {
                    icon: rp,
                    iconName: 'da'
                })
            },
            onEachFeature: onEachFeature
        });
        overlayMaps['แหล่งท่องเที่ยวเชิงสุขภาพ'] = tour.addTo(map);
        // L.control.layers(baseMaps, overlayMaps).addTo(map);
    }

    // map contect   
    map.on('moveend', () => {
        callData();
    });


    function callData() {

        var bbox = map.getBounds();
        var sw = bbox._southWest;
        var ne = bbox._northEast;

        if (cql == null) {
            console.log(cql)
            urlGeoserver = 'http://cgi.uru.ac.th/geoserver/upn/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=upn:tour_4326&CQL_FILTER=BBOX(geom,' +
                sw.lng + ',' + sw.lat + ',' + ne.lng + ',' + ne.lat + ')&outputFormat=application%2Fjson';
            refreshData(urlGeoserver)
        } else {
            urlGeoserver = 'http://cgi.uru.ac.th/geoserver/upn/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=upn:tour_4326&CQL_FILTER=BBOX(geom,' +
                sw.lng + ',' + sw.lat + ',' + ne.lng + ',' + ne.lat + ')' + cql + '&outputFormat=application%2Fjson';
            refreshData(urlGeoserver)
        }

    }
}); /* End Fn */