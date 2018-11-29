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

    /*-----------------------------------
     * Map
     *-----------------------------------*/

    // data source
    const mapnuUrl = 'http://map.nu.ac.th/geoserver-hgis/ows?';

    // --- map database
    var map = L.map('map', {
        center: [
            16.69, 99.70
        ],
        zoom: 7
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
    var OSM_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    var OSM_Hot = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
    });
    var OSM_De = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    var OSM_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    var Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    });
    var CartoDB_Voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    });
    //overlay layers
    var pro = L.tileLayer.wms(mapnuUrl, {
        layers: 'hgis:dpc9_province_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 3,
        lyrName: 'prov',
        // CQL_FILTER: 'prov_code=65 OR prov_code=53'
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

    const heatmap = L.nonTiledLayer.wms('http://cgi.uru.ac.th/geoserver/upn/wms?', {
        layers: 'upn:_tour_heat',
        format: 'image/png',
        transparent: true,
        zIndex: 3,
        CQL_FILTER: 't_id=st',
    });

    var baseMaps = {
        "แผนที่ถนน OSM": osm,
        'แผนที่ถนน': grod,
        'แผนที่ผสม': ghyb,
        'แผนที่ภูมิประเทศ': gter,
        'MapNik': OSM_De.addTo(map)
    };

    var overlayMaps = {
        'ขอบเขตจังหวัด': pro.addTo(map),
        'ขอบเขตอำเภอ': amp,
        'ขอบเขตตำบล': tam,
        // 'heatmap': CartoDB_Voyager.addTo(map)
    };
    // var tour = new L.GeoJSON.AJAX("json", { onEachFeature: popUp });
    var markers = new L.MarkerClusterGroup();
    var marker;
    var b_cql;
    var b_tmp = [];
    var t_cql;
    var t_tmp = [];
    var urlGeoserver;
    var l_cql;
    var box_cql;

    // init
    refreshData();
    getJSON();

    // event
    $("input[name='tour-prov']").change(function () {
        var checked = $(this).val();
        b_cql = '';
        l_cql = '';
        box_cql = '';
        if ($(this).is(':checked')) {
            b_tmp.push(checked);
            $.each(b_tmp, (i, itms) => {
                b_cql += placeCQL(i, itms);
                l_cql += lyrCQL(i, itms);
                box_cql += boxCQL(i, itms);
            })
        } else {
            b_tmp.splice($.inArray(checked, b_tmp), 1);
            $.each(b_tmp, (i, itms) => {
                b_cql += placeCQL(i, itms)
                l_cql += lyrCQL(i, itms);
                box_cql += boxCQL(i, itms);
            })
        }
        getJSON();
        zoomMap();
    });

    $("input[name='tour-type']").change(function () {
        var checked = $(this).val();
        t_cql = '';
        if ($(this).is(':checked')) {
            t_tmp.push(checked);
            $.each(t_tmp, (i, itms) => {
                t_cql += typeCQL(i, itms)
            })
        } else {
            t_tmp.splice($.inArray(checked, t_tmp), 1);
            $.each(t_tmp, (i, itms) => {
                t_cql += typeCQL(i, itms)
            })
        }
        getJSON();
    });

    markers.on('click', function (e) {
        L.popup({
                maxWidth: 200,
                offset: [5, -25]
            })
            .setLatLng(L.latLng(e.latlng))
            .setContent("<h6>" + e.layer.options.properties.t_name + "</h6>" +
                "<br/><span id='kanit13'>จุดเด่น:</span>  <br/>" + e.layer.options.properties.t_identity)
            .openOn(map);
    });

    function typeCQL(i, itms) {
        var a = '';
        a = (i > 0) ? ' or ' : '';
        if (itms == 'A') {
            return a + "t_type='A'";
        } else if (itms == 'B') {
            return a + "t_type='B'";
        } else if (itms == 'B1') {
            return a + "t_type='B1'";
        } else if (itms == 'B2.1') {
            return a + "t_type='B2.1'";
        } else if (itms == 'B2.2') {
            return a + "t_type='B2.2'";
        } else if (itms == 'C') {
            return a + "t_type='C'";
        }
    }

    function placeCQL(i, itms) {
        var a = '';
        a = (i > 0) ? ' or ' : '';
        if (itms == 'tk') {
            return a + "t_id='tk'";
        } else if (itms == 'st') {
            return a + "t_id='st'";
        } else if (itms == 'pl') {
            return a + "t_id='pl'";
        } else if (itms == 'ud') {
            return a + "t_id='ud'";
        } else if (itms == 'pb') {
            return a + "t_id='pb'";
        }
    }

    function lyrCQL(i, itms) {
        var a = '';
        a = (i > 0) ? ' OR ' : '';
        if (itms == 'tk') {
            return a + 'prov_code=63';
        } else if (itms == 'st') {
            return a + 'prov_code=64';
        } else if (itms == 'pl') {
            return a + 'prov_code=65';
        } else if (itms == 'ud') {
            return a + 'prov_code=53';
        } else if (itms == 'pb') {
            return a + 'prov_code=67';
        }
    }

    function boxCQL(i, itms) {
        var a = '';
        a = (i > 0) ? ' OR ' : '';
        if (itms == 'tk') {
            return a + "pro_code='63'";
        } else if (itms == 'st') {
            return a + "pro_code='64'";
        } else if (itms == 'pl') {
            return a + "pro_code='65'";
        } else if (itms == 'ud') {
            return a + "pro_code='53'";
        } else if (itms == 'pb') {
            return a + "pro_code='67'";
        }
    }

    function zoomMap() {
        map.eachLayer(function (lyr) {
            if (lyr.options.layers == 'hgis:dpc9_province_4326') {
                map.removeLayer(lyr);
            }
        })

        if (l_cql) {
            console.log(l_cql);
            pro = L.tileLayer.wms(mapnuUrl, {
                layers: 'hgis:dpc9_province_4326',
                format: 'image/png',
                transparent: true,
                zIndex: 3,
                lyrNmae: 'prov',
                CQL_FILTER: l_cql,
            }).addTo(map);
        } else {
            console.log(l_cql);
            pro = L.tileLayer.wms(mapnuUrl, {
                layers: 'hgis:dpc9_province_4326',
                format: 'image/png',
                transparent: true,
                zIndex: 3,
                lyrNmae: 'prov'
            }).addTo(map);
        }

        var cql = 'where ' + box_cql;
        var bboxurl = "http://cgi.uru.ac.th:3000/api/getProbbox";

        $.ajax({
            type: 'post',
            data: {
                cql: cql
            },
            url: bboxurl,
            success: (data) => {
                map.fitBounds([
                    [data.data[0].xmin, data.data[0].ymax],
                    [data.data[0].xmax, data.data[0].ymin]
                ]);
            }
        })
    }

    function getJSON() {
        if (b_cql && t_cql) {
            urlGeoserver = 'http://cgi.uru.ac.th/geoserver/upn/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=upn:tour_4326' +
                '&CQL_FILTER=' + '(' + b_cql + ') and (' + t_cql + ')' +
                '&outputFormat=application%2Fjson';
            refreshData(urlGeoserver)
        } else if (b_cql) {
            urlGeoserver = 'http://cgi.uru.ac.th/geoserver/upn/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=upn:tour_4326' +
                '&CQL_FILTER=' + b_cql +
                '&outputFormat=application%2Fjson';
            refreshData(urlGeoserver)
        } else if (t_cql) {
            urlGeoserver = 'http://cgi.uru.ac.th/geoserver/upn/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=upn:tour_4326' +
                '&CQL_FILTER=' + t_cql +
                '&outputFormat=application%2Fjson';
            refreshData(urlGeoserver)
        } else {
            urlGeoserver = 'http://cgi.uru.ac.th/geoserver/upn/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=upn:tour_4326&outputFormat=application%2Fjson';
            refreshData(urlGeoserver)
        }
    }

    // function zone
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

    function loadMap(data) {
        map.eachLayer(function (lyr) {
            if (lyr.options.markName == 'da') {
                markers.removeLayer(lyr);
            }
        });

        // marker
        var A = 'http://www.map.nu.ac.th/marker/health-education-2e8003/hospital-building.png';
        var B1 = 'http://www.map.nu.ac.th/marker/nature-7bf069/forest2.png';
        var B21 = 'http://www.map.nu.ac.th/marker/villa.png';
        var B22 = 'http://www.map.nu.ac.th/marker/festival.png';
        var C = 'http://www.map.nu.ac.th/marker/culture-entertainment-C259B5/museum_crafts.png';
        var D = 'http://www.cgi.uru.ac.th/marker/award.png';

        let tour = L.geoJSON(data, {
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
                // add marker
                marker = new L.marker(latlng, {
                    icon: rp,
                    properties: feature.properties,
                    iconName: 'da'
                })

                markers.addLayer(marker);
                markers.options.markName = 'da';
                markers.addTo(map)
                return false

            },
            // onEachFeature: onEachFeature
        });
        // overlayMaps['แหล่งท่องเที่ยวเชิงสุขภาพ'] = tour.addTo(map);
        // L.control.layers(baseMaps, overlayMaps).addTo(map); 
    }

    function star(s) {
        var star = '';
        for (var i = 0; i < s; i++) {
            star += '<i id="star" class="fa fa-star" aria-hidden="true" style="color: gold;"></i>';
        }
        return star;
    }

    function sortData(data) {
        $.each(data, (i, item) => {
            $(".flowers").append('<div class="flower" data-value="' +
                item.properties.lat + ',' +
                item.properties.lon + ',' +
                item.properties.t_name + ',' +
                item.properties.t_identity +
                '"><span id="kanit13-light">' +
                item.properties.t_name +
                '</span><br/>ระดับศักยภาพ:' + star(item.properties.t_potent) + '</div>');

            $("#count").html(i);
        })
    }

    function loadItem(obj) {
        $('#flowers').empty();
        var data = obj.features;
        $("input[name='tour-sort']").change(() => {
            var radio = $('input:checked').val();
            if (radio == 'p') {
                data.sort((a, b) => {
                    return b.properties.t_potent - a.properties.t_potent
                });
                $('#flowers').empty();
                sortData(data);
            } else {
                data.sort((a, b) => {
                    var nameA = a.properties.t_name.toLowerCase();
                    var nameB = b.properties.t_name.toLowerCase();
                    if (nameA < nameB) //sort string ascending
                        return -1
                    if (nameA > nameB)
                        return 1
                    return 0
                });
                $('#flowers').empty();
                sortData(data);
            }
        })
        sortData(data);

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
            map.setView([dat[0], dat[1]], 16);
        })
    }
    // print
    var printer = L.easyPrint({
        tileLayer: OSM_De,
        sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
        filename: 'myMap',
        exportOnly: true,
        hideControlContainer: true
    }).addTo(map);

    function manualPrint() {
        printer.printMap('CurrentSize', 'MyManualPrint')
    }


    // $(function () {
    $('#btn').click(function () {
        manualPrint();
    });
    // });


    // map contect
    const nu = [16.744567, 100.194991];
    const mapContact = L.map('mapContact', {
        center: nu,
        zoom: 15
    });
    const osmContact = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.{ext}', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">CartoDB</a> | Developed by GeoLab',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
    });
    osmContact.addTo(mapContact);
    L.marker(nu).addTo(mapContact);
});