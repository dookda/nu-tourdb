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
    const urlGeoserver = "http://cgi.uru.ac.th/geoserver/upn/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=upn:tour_4326&maxFeatures=50&outputFormat=application%2Fjson";
    const json = 'http://cgi.uru.ac.th/geoserver/upn/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=upn:tour_4326&outputFormat=application%2Fjson';
    const url = "http://map.nu.ac.th/service/tour_data.php";
    const mapnuUrl = 'http://map.nu.ac.th/geoserver-hgis/ows?';

    // ---map
    // first-search map
    var fmap = L.map('fmap', {
        center: [
            16.69, 100.09
        ],
        zoom: 8
    });
    const fgrod = L.tileLayer('http://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    const fghyb = L.tileLayer('http://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    const fgter = L.tileLayer('http://{s}.google.com/vt/lyrs=t,m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    const fpro = L.tileLayer.wms(mapnuUrl, {
        layers: 'hgis:dpc9_province_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 3
    });
    const famp = L.tileLayer.wms(mapnuUrl, {
        layers: 'hgis:dpc9_amphoe_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 3
    });
    const ftam = L.tileLayer.wms(mapnuUrl, {
        layers: 'hgis:dpc9_tambon_4326',
        format: 'image/png',
        transparent: true,
        zIndex: 3
    });
    var fmapBaseMaps = {
        'แผนที่ถนน': fgrod.addTo(fmap),
        'แผนที่ผสม': fghyb,
        'แผนที่ภูมิประเทศ': fgter
    };
    var fmapOverlayMaps = {
        'ขอบเขตจังหวัด': fpro.addTo(fmap),
        'ขอบเขตอำเภอ': famp.addTo(fmap),
        'ขอบเขตตำบล': ftam.addTo(fmap),
    };
    L.control.layers(fmapBaseMaps, fmapOverlayMaps).addTo(fmap);

    var marker;

    function setCurrentView(dat) {
        if (marker !== undefined) {
            fmap.removeLayer(marker);
            addMarker(dat);
        } else {
            addMarker(dat);
        }
    }

    function addMarker(dat) {
        marker = L.marker([dat.lat, dat.lon], {
                draggable: false
            })
            .addTo(fmap)
            .bindPopup("<h6>" + dat.t_name + "</h6>" +
                "<br/><span id='kanit13'>จุดเด่น:</span> " + dat.t_identity +
                "<br/><span id='kanit13'>ประเภททัพยากร:</span> " + dat.t_type +
                "<br/><span id='kanit13'>ระดับศักยภาพ:</span> " + dat.t_potent + ' ดาว' +
                "<br/><span id='kanit13'>พิกัด:</span> " + dat.lon + "," + dat.lat +
                "<br/><span id='kanit13'>การเข้าถึง:</span> " + dat.t_ac +
                "<br/><span id='kanit13'>ความน่าสนใจ:</span> " + dat.t_in +
                "<br/><span id='kanit13'>ความสามารถในการรองรับ:</span> " + dat.t_cc +
                "<br/><span id='kanit13'>ศักยภาพ:</span> " + dat.t_sq +
                "<br/><span id='kanit13'>คุณภาพบริการ:</span>" + dat.t_la +
                "<br/><span id='kanit13'>--:</span> " + dat.t_re +
                "<br/><span id='kanit13'>อื่นๆ:</span> " + dat.t_etc
            )
            .openPopup();
        fmap.setView(L.latLng(dat.lat, dat.lon), 18);
    }

    function setDefaultView() {
        if (marker !== undefined) {
            fmap.removeLayer(marker);
        }
        fmap.setView(L.latLng(16.69, 100.09), 8);
    }

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

    // var tour = new L.GeoJSON.AJAX("json", { onEachFeature: popUp });
    var tour;
    var A = 'http://www.cgi.uru.ac.th/marker/marker2/aed-2.png';
    var B1 = 'http://www.cgi.uru.ac.th/marker/flowers_1.png';
    var B21 = 'http://www.cgi.uru.ac.th/marker/villa.png';
    var B22 = 'http://www.cgi.uru.ac.th/marker/festival.png';
    var C = 'http://www.cgi.uru.ac.th/marker/bouddha.png';
    var D = 'http://www.cgi.uru.ac.th/marker/award.png';

    $.getJSON(json, (data) => {
        console.log(data);
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
                    icon: rp
                }).on('click', (e) => {
                    map.setView(e.latlng);
                });
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
            "แหล่งท่องเที่ยวเชิงสุขภาพ": tour.addTo(map),
        };

        L.control.layers(baseMaps, overlayMaps).addTo(map);
    });

    // map contect
    const mapContact = L.map('mapContact', {
        center: [
            16.744567, 100.194991
        ],
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

    // ---table section
    //serch page 
    let fistSearch = $('#fistSearch').DataTable({
        "processing": true,
        "ajax": {
            "url": url,
            dataSrc: ''
        },
        "columns": [{
            "data": "t_name",
        }, {
            "className": 'goto-map',
            "orderable": false,
            "data": null,
            "defaultContent": ''
        }],
        "scrollY": 400,
        "scrollCollapse": true,
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": false,
        "bAutoWidth": true,
        "dom": '<"top">rt<"bottom"><"clear">',
        "fnInitComplete": function (oSettings, json) {
            $('#fistSearch').parents('.dataTables_wrapper').first().find('thead').hide();
        }
    });

    $('#fistSearch').on('click', 'td.goto-map', function (e) {
        var dat = fistSearch.row(this).data();
        setCurrentView(dat);
        $('html, body').animate({
            scrollTop: $("#firstSearchMap").offset().top
        }, 1000);
    });

    $('#searchData').hide();
    $('#firstSearch_box').on('keyup', function () {
        fistSearch.search(this.value).draw();
        var searchStr = $(this).val();
        if ((searchStr).length == 0) {
            $('#searchData').hide();
            setDefaultView();
        } else {
            $('#searchData').show();
        }
    });

    // database page
    let table = $('#table').DataTable({
        "processing": true,
        "ajax": {
            "url": url,
            dataSrc: ''
        },
        "columns": [{
            "className": 'details-control',
            "orderable": false,
            "data": null,
            "defaultContent": ''
        }, {
            "data": "gid"
        }, {
            "data": "t_name"
        }, {
            "data": "t_type"
        }, {
            "data": "t_potent"
        }, {
            "data": "t_prov"
        }],
        "scrollY": 680,
        "scrollCollapse": true,
        "language": {
            "lengthMenu": "แสดงผล _MENU_ records",
            "zeroRecords": "Nothing found - sorry",
            "info": "หน้า _PAGE_ จาก _PAGES_ หน้า",
            "infoEmpty": "No records available",
            "infoFiltered": "(filtered from _MAX_ total records)",
            "search": "ค้นหาข้อมูลทรัพยากรการท่องเที่ยว:",
        },
        "dom": '<"top"l>rt<"bottom"ip><"clear">',
        "order": [
            [1, 'asc']
        ]
    });

    $('#table').on('click', 'td.details-control', function () {
        var dat = table.row(this).data();
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        } else {
            row.child(format(row.data())).show();
            tr.addClass('shown');
            map.setView(L.latLng(dat.lat, dat.lon), 18);
        }
    });

    function format(d) {
        return '<span><h5>เอกลักษณ์หรือจุดเด่นของสถานที่/กิจกรรม:</h5> ' + d.t_identity + '</span>';
    }

    $('#myInput').on('keyup', function () {
        table.search(this.value).draw();
    });






}); /* End Fn */