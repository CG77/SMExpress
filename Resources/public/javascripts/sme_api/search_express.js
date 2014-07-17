/**
 * Created by o.benyoussef on 04/04/14.
 */

$(document).ready(function () {

    /* Onglet 1 : Consulter des horaires */
    // GLOBALS

    var URLAPI = $("#urlAPI").val();
    var CLOSE_MINUTES_LIMIT = 20;
    var MARGIN_CSS = 420;
    var now = new Date();

    var hours = $('select[name=timetableTimeHours]');
    var minutes = $('select[name=timetableTimeHoursMins]');

    $('option[value=' + (now.getHours()) + ']', hours).attr('selected', 'selected');
    $("#uniform-timetableTimeHours span").empty();
    $("#uniform-timetableTimeHours span").append(now.getHours());
    $('option[value=' + (now.getMinutes()) + ']', minutes).attr('selected', 'selected');
    $("#uniform-timetableTimeHoursMins span").empty();
    $("#uniform-timetableTimeHoursMins span").append(now.getMinutes());

    // jQuery.support.cors = true;

    if (window.XDomainRequest) {
        // Use Microsoft XDR
        var xdr = new XDomainRequest();
        xdr.open("get", URLAPI + '/API/lines');
        xdr.onload = function () {
            var JSON = $.parseJSON(xdr.responseText);
            if (JSON == null || typeof (JSON) == 'undefined') {
                JSON = $.parseJSON(data.firstChild.textContent);
            }


            $("#uniform-lines span").append('Lignes');
            $("#uniform-routes span").append('Parcours');
            $("#uniform-timetables span").append('Fiche horaire');

            $("#lines").empty().append('<option value="">Lignes</option>');

            for (var l in JSON) {
                var line = JSON[l];
                var name = line.name;
                if (line.commercialName)
                    name += " - " + line.commercialName;
                $("#lines").append('<option value="' + line.lineId + '">' + name + '</option>');
            }
            ;
            $('#lines').focus();

        };
        xdr.send();
    } else {

        $.ajax({
            // crossDomain: true,
            url: URLAPI + '/API/lines',
            dataType: "json",
            success: function (data) {
                $("#uniform-lines span").append('Lignes');
                $("#uniform-routes span").append('Parcours');
                $("#uniform-timetables span").append('Fiche horaire');

                $("#lines").empty().append('<option value="">Lignes</option>');

                for (var l in data) {
                    var line = data[l];
                    var name = line.name;
                    if (line.commercialName)
                        name += " - " + line.commercialName;
                    $("#lines").append('<option value="' + line.lineId + '">' + name + '</option>');
                }
                ;
                $('#lines').focus();

            }, error: function (s, r, e) {
                // console.log(e);

            }
        });

    }
    $('.routes').hide();
    $('#timetable').hide();
    $('.timetables').hide();
    $('#timetableTime').hide();

    $('#timetableSearch .tableResults').hide();

    //Change line
    $("#lines").bind('change', function (event) {
        $("#downloadTimeTablePDFTime").hide();
        var id = event.target.value;
        $('#timetableSearch .tableResults').hide();
        $('#timetableSearch .tableResults').hide();
        if (id) {

            if (window.XDomainRequest) {

                // Use Microsoft XDR
                var xdr = new XDomainRequest();
                xdr.open("get", URLAPI + '/API/lines/' + id);
                xdr.onload = function () {
                    var JSON = $.parseJSON(xdr.responseText);
                    if (JSON == null || typeof (JSON) == 'undefined') {
                        JSON = $.parseJSON(data.firstChild.textContent);
                    }


                    $("#routes").empty().append('<option value="">Parcours</option>');
                    $("#uniform-routes span").empty();
                    $("#uniform-routes span").append('Parcours');

                    for (var r in JSON.routes) {
                        var element = JSON.routes[r];
                        $("#routes").append('<option value="' + element.routeId + '">' + element.name + '</option>');
                    }
                    ;
                    $(".routes").show();
                    $('.timetables').hide();
                    $('#timetableTime').hide();
                    $(".routes select").focus();


                };
                xdr.send();


            } else {

                $.ajax({
                    url: URLAPI + '/API/lines/' + id,
                    dataType: "json",
                    //async: true,
                    success: function (data) {
                        // $("#uniform-routes span").append('Parcours');
                        $("#routes").empty().append('<option value="">Parcours</option>');
                        $("#uniform-routes span").empty();
                        $("#uniform-routes span").append('Parcours');

                        for (var r in data.routes) {
                            var element = data.routes[r];
                            $("#routes").append('<option value="' + element.routeId + '">' + element.name + '</option>');
                        }
                        ;
                        $(".routes").show();
                        $('.timetables').hide();
                        $('#timetableTime').hide();
                        $(".routes select").focus();


                    }
                });
            }

        } else {
            $('.routes').hide();
            $('.timetables').hide();
            $('#timetableTime').hide();

        }
    });
    // Change route
    $("#routes").bind('change', function (event) {
        $("#downloadTimeTablePDFTime").hide();
        var id = event.target.value;
        $('#timetableSearch .tableResults').hide();
        if (id) {

            if (window.XDomainRequest) {


                // Use Microsoft XDR
                var xdr = new XDomainRequest();
                xdr.open("get", URLAPI + '/API/routes/' + id);
                xdr.onload = function () {
                    var JSON = $.parseJSON(xdr.responseText);
                    if (JSON == null || typeof (JSON) == 'undefined') {
                        JSON = $.parseJSON(data.firstChild.textContent);
                    }


                    $("#timetables").empty().append('<option value="">Fiche horaire</option>');
                    $("#uniform-timetables span").empty();
                    $("#uniform-timetables span").append('Fiche horaire');
                    for (var t in JSON.timetables) {
                        var element = JSON.timetables[t];
                        $("#timetables").append('<option value="' + element.timetableId + '">' + element.name + '</option>');
                    }
                    ;
                    $('.timetables').show();
                    $('.timetables select').focus();
                    $('#timetableTime').show();


                };
                xdr.send();


            } else {


                $.ajax({
                    url: URLAPI + '/API/routes/' + id,
                    dataType: "json",
                    //async: false,
                    success: function (data) {
                        // $("#uniform-timetables span").append('Fiche horaire');
                        $("#timetables").empty().append('<option value="">Fiche horaire</option>');
                        $("#uniform-timetables span").empty();
                        $("#uniform-timetables span").append('Fiche horaire');
                        for (var t in data.timetables) {
                            var element = data.timetables[t];
                            $("#timetables").append('<option value="' + element.timetableId + '">' + element.name + '</option>');
                        }
                        ;
                        $('.timetables').show();
                        $('.timetables select').focus();
                        $('#timetableTime').show();

                    }
                });


            }

        }
        else {
            $('.timetables').hide();
            $('#timetableTime').hide();
            $('#timetableSearch .tableResults').hide();
        }
    });


    function pdfUrl(lineId) {
        var service = URLAPI + '/lines/LINE_ID.pdf';
        return service.replace("LINE_ID", lineId);
    }

    // Change timetables
    $("#timetables").bind('change', function (event) {
        var id = event.target.value;
        $('.timetable').hide();
        $('#timetableSearch .tableResults').hide();
        if (id) {

            if (window.XDomainRequest) {


                // Use Microsoft XDR
                var xdr = new XDomainRequest();
                xdr.open("get", URLAPI + '/API/timetables/' + id);
                xdr.onload = function () {
                    var JSON = $.parseJSON(xdr.responseText);
                    if (JSON == null || typeof (JSON) == 'undefined') {
                        JSON = $.parseJSON(JSON.firstChild.textContent);
                    }


                    // clean datas : remove empty journeys
                    for (var j = 0; j < JSON.journeys.length;) {
                        var journey = JSON.journeys[j];
                        if (journey.passages.length == 0)
                            JSON.journeys.splice(j, 1);
                        else
                            ++j;
                    }

                    // clean datas : remove unused stations
                    for (var s = 0; s < JSON.stations.length;) {
                        var station = JSON.stations[s];
                        var stationFound = false;
                        for (var j = 0; j < JSON.journeys.length && !stationFound; ++j) {
                            if (getPassageByStationRouteId(JSON.journeys[j].passages, station.stationRouteId) != null)
                                stationFound = true;
                        }
                        if (!stationFound)
                            JSON.stations.splice(s, 1);
                        else
                            ++s;
                    }

                    /* compute datas :
                     * - Record all exceptions
                     * - for j in journeys, add j.exception field if
                     all passages of j has the same exception
                     */
                    var allExceptions = [];
                    var allExceptionsIds = [];
                    var addExceptions = function (e) {
                        if ($.inArray(e.id, allExceptionsIds) == -1) {
                            allExceptions.push(e);
                            allExceptionsIds.push(e.id);
                        }
                    }
                    for (var j in JSON.journeys) {
                        var journey = JSON.journeys[j];
                        var commonException = null;
                        for (var p in journey.passages) {
                            var passage = journey.passages[p];
                            if (passage.exception) {
                                addExceptions(passage.exception);
                                if (p == 0)
                                    commonException = passage.exception;
                                else if (commonException && commonException.id != passage.exception.id)
                                    commonException = null;
                            }
                            else
                                commonException = null;
                        }
                        if (commonException)
                            journey.exception = commonException;
                    }
                    JSON.exceptions = allExceptions;

                    // Fill the timetable
                    fillTimetable(JSON);
                    // TODO : use Page property to get SME Base URL
                    // $("#downloadTimeTablePDFTime").attr("href", "*BASE*/lines/*LINEID*.pdf").show();
                    var lineId = $("#lines option:selected").val();
                    $("#downloadTimeTablePDFTime").attr("href", pdfUrl(lineId)).show().css({
                        marginTop: "10px",
                        display: "block",
                        textAlign: "right"
                    });


                };
                xdr.send();

            } else {


                $.ajax({
                    url: URLAPI + '/API/timetables/' + id,
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        // clean datas : remove empty journeys
                        for (var j = 0; j < data.journeys.length;) {
                            var journey = data.journeys[j];
                            if (journey.passages.length == 0)
                                data.journeys.splice(j, 1);
                            else
                                ++j;
                        }

                        // clean datas : remove unused stations
                        for (var s = 0; s < data.stations.length;) {
                            var station = data.stations[s];
                            var stationFound = false;
                            for (var j = 0; j < data.journeys.length && !stationFound; ++j) {
                                if (getPassageByStationRouteId(data.journeys[j].passages, station.stationRouteId) != null)
                                    stationFound = true;
                            }
                            if (!stationFound)
                                data.stations.splice(s, 1);
                            else
                                ++s;
                        }

                        /* compute datas :
                         * - Record all exceptions
                         * - for j in journeys, add j.exception field if
                         all passages of j has the same exception
                         */
                        var allExceptions = [];
                        var allExceptionsIds = [];
                        var addExceptions = function (e) {
                            if ($.inArray(e.id, allExceptionsIds) == -1) {
                                allExceptions.push(e);
                                allExceptionsIds.push(e.id);
                            }
                        }
                        for (var j in data.journeys) {
                            var journey = data.journeys[j];
                            var commonException = null;
                            for (var p in journey.passages) {
                                var passage = journey.passages[p];
                                if (passage.exception) {
                                    addExceptions(passage.exception);
                                    if (p == 0)
                                        commonException = passage.exception;
                                    else if (commonException && commonException.id != passage.exception.id)
                                        commonException = null;
                                }
                                else
                                    commonException = null;
                            }
                            if (commonException)
                                journey.exception = commonException;
                        }
                        data.exceptions = allExceptions;

                        // Fill the timetable
                        fillTimetable(data);
                        // TODO : use Page property to get SME Base URL
                        // $("#downloadTimeTablePDFTime").attr("href", "*BASE*/lines/*LINEID*.pdf").show();
                        var lineId = $("#lines option:selected").val();
                        $("#downloadTimeTablePDFTime").attr("href", pdfUrl(lineId)).show().css({
                            marginTop: "10px",
                            display: "block",
                            textAlign: "right"
                        });
                    }

                });


            }


        }
    });


    // utils
    var getPassageByStationRouteId = function (passages, stationRouteId) {
        for (var p in passages) {
            var passage = passages[p];
            if (passage.stationRouteId == stationRouteId)
                return passage;
        }
        return null;
    };
    var indexOfException = function (exceptions, exceptionId) {
        for (var e = 0; e < exceptions.length; ++e)
            if (exceptions[e].id == exceptionId)
                return e;
        return -1;
    }

    var formatWith2digits = function (str) {
        str += '';
        if (str.length == 0)
            return '00';
        else if (str.length == 1)
            return '0' + str;
        return str.substring(0, 2);
    };

    var formatDate = function (ms) {
        var d = new Date(ms);
        return formatWith2digits(d.getDate()) + '/' + formatWith2digits(d.getMonth() + 1) + '/' + d.getFullYear();
    };

    var applyTimeToTimetable = function (time) {
        $('#timetableSearch .tableResults .passage[time]').each(function () {
            var passage = $(this);
            var passageTime = parseInt(passage.attr('time'));
            if (passageTime < time)
                passage.addClass('outdated-time').removeClass('close-time');
            else {
                if (passageTime < time + CLOSE_MINUTES_LIMIT)
                    passage.removeClass('outdated-time').addClass('close-time');
                else
                    passage.removeClass('outdated-time').removeClass('close-time');
            }
        });

        /// TODO : scrollLeft
        var colSize = $('#timetableSearch .tableResults .journeys tr.station:first .passage').size();
        var colOfFirst = 0;
        for (var i = 1; i <= colSize && !colOfFirst; ++i) {
            if ($('#timetableSearch .tableResults .passage[time]:nth-child(' + i + '):not(.outdated-time)').size() > 0)
                colOfFirst = i;
        }

        if (colOfFirst) {
            var left = $('#timetableSearch .tableResults .passage:nth-child(' + colOfFirst + '):first').position().left + $('#timetableSearch .tableResults .journeysUnit').scrollLeft();

            left = left - MARGIN_CSS;

            $('#timetableSearch .tableResults .journeysUnit').scrollLeft(left)

        }
    };

    var fillTimetable = function (data) {
        // fill tables
        $('.timetable').show();
        $('#timetableSearch .tableResults').show();
        var tableStations = $('#timetableSearch .tableResults table.stations').empty();
        var table = $('#timetableSearch .tableResults table.journeys').empty();

        if (data.dateFrom || data.dateTo) {
            var text = 'Horaires valables ';
            if (data.dateFrom)
                text += ' à compter du ' + formatDate(data.dateFrom);
            if (data.dateTo)
                text += ' jusqu\'au ' + formatDate(data.dateTo);
            $('.validityDate').text(text);
        }

        var lastTown = null;
        tableStations.append('<tr><td colspan="2"></td></tr>');
        for (var s in data.stations) {
            var station = data.stations[s];
            var tr = $('<tr />').addClass('station').addClass(s % 2 == 0 ? 'odd' : 'even');
            if (s == 0)
                tr.addClass('first');
            else if (s == data.stations.length - 1)
                tr.addClass('last');
            if (station.town) {
                var townNode = $('<td class="name town" />')
                if (lastTown != station.town.id) {
                    lastTown = station.town.id;
                    townNode.text(station.town.name);
                }
                tr.append(townNode);
                tr.append($('<td class="name station" />').text(station.name));
            }
            else {
                tr.addClass('connection');
                tr.append($('<td colspan="2" class="name connection" />').text(station.name))
            }
            tableStations.append(tr);
        }

        var exceptionsRow = $('<tr class="journeyExceptions"></tr>');
        for (var j in data.journeys) {
            var journey = data.journeys[j];
            var commonExceptionNode = $('<td/>');
            if (journey.exception) {
                commonExceptionNode.addClass('exception')
                    .attr('title', journey.exception.name)
                    .text((1 + indexOfException(data.exceptions, journey.exception.id)) || "");
            }
            exceptionsRow.append(commonExceptionNode);
        }
        table.append(exceptionsRow);
        for (var s in data.stations) {
            var station = data.stations[s];
            var tr = $('<tr />').addClass('station').addClass(s % 2 == 0 ? 'odd' : 'even');
            if (s == 0)
                tr.addClass('first');
            else if (s == data.stations.length - 1)
                tr.addClass('last');
            if (!station.town)
                tr.addClass('connection');

            for (var j in data.journeys) {
                var journey = data.journeys[j];
                var passage = getPassageByStationRouteId(journey.passages, station.stationRouteId);
                var td = $('<td class="passage" />');
                if (passage) {
                    td.attr('time', 60 * passage.time.hours + passage.time.minutes)
                        .html((passage.time.hours > 9 ? passage.time.hours : '&nbsp;' + passage.time.hours) + ':' + formatWith2digits('' + passage.time.minutes));
                    if (passage.exception && !journey.exception) {
                        td.append($('<span class="exception" />').attr('title', passage.exception.name).text((1 + indexOfException(data.exceptions, passage.exception.id)) || ""))
                    }
                }
                tr.append(td);
            }
            table.append(tr);
        }

        var ol = $('.exceptions').empty();
        for (var e = 0; e < data.exceptions.length; ++e) {
            var exception = data.exceptions[e];
            ol.append($('<li/>').text(exception.name).prepend('<span class="number">' + (e + 1) + '. </span>'));
        }

        var ajustWidth = function () {
            var maxWidth = Math.floor($('#timetableSearch .tableResults').width() - $('.tableResults .stationsUnit').width());
            var width = $('#timetableSearch .tableResults .journeysUnit').width();
            if (width > maxWidth) {
                $('#timetableSearch .tableResults .journeysUnit').width(maxWidth);
            }

        }
        ajustWidth();
        setTimeout(ajustWidth, 500);


    };

    /* Onglet 2 : Trouver un Trajet */


    var WINDOW_HOURS = 2;

    var fromStationNode = $("#fromStationSelectHidden");
    var toStationNode = $("#toStationSelectHidden");
    var atDateNode = $('#smeDepartureTime');
    var resultsNode = $('#journeySearch .tableResults');


    if (window.XDomainRequest) {


        $("#smeToStation").hide();

        // Use Microsoft XDR
        var xdr2 = new XDomainRequest();
        xdr2.open("get", URLAPI + '/API/stations');
        xdr2.onload = function () {
            var JSON = $.parseJSON(xdr2.responseText);
            if (JSON == null || typeof (JSON) == 'undefined') {
                JSON = $.parseJSON(data.firstChild.textContent);
            }

            var aStation = $.map(JSON, function (item) {
                return {
                    label: item.town + ' - ' + item.name,
                    value: item.town + ' - ' + item.name,
                    id: item.id
                };
            })

            $("#fromStationSelect").autocomplete({
                source: aStation,
                select: function (event, ui) {
                    //alert(ui.item.id);
                    toStationNode.show();


                    var xdr3 = new XDomainRequest();
                    xdr3.open("get", URLAPI + '/API/stations/from/' + ui.item.id);
                    xdr3.onload = function () {
                        var JSON = $.parseJSON(xdr3.responseText);
                        if (JSON == null || typeof (JSON) == 'undefined') {
                            JSON = $.parseJSON(data.firstChild.textContent);
                        }


                        var aFrom = $.map(JSON, function (item) {
                            return {
                                label: item.town + ' - ' + item.name,
                                value: item.town + ' - ' + item.name,
                                id: item.id
                            };
                        })
                        $("#fromStationSelectHidden").val(ui.item.id);
                        $("#smeToStation").show();
                        $("#toStationSelect").autocomplete({
                            source: aFrom,
                            select: function (event, ui) {

                                $("#toStationSelectHidden").val(ui.item.id);

                                getJourneys(
                                    fromStationNode.val(),
                                    toStationNode.val(),
                                    $('input[name=smeDepartureDay]', atDateNode).val(),
                                    $('select[name=smeDepartureHours]', atDateNode).val(),
                                    $('select[name=smeDepartureMins]', atDateNode).val());

                                $("#showReverse").show();
                            }

                        });


                    };
                    xdr3.send();


                }
            });


        };
        xdr2.send();


    } else {


        var loadStations = function () {
            $("#smeToStation").hide();


            $.getJSON(URLAPI + '/API/stations', function (data) {

                var aStation = $.map(data, function (item) {
                    return {
                        label: item.town + ' - ' + item.name,
                        value: item.town + ' - ' + item.name,
                        id: item.id
                    };
                })
                //console.log(result);
                $("#fromStationSelect").autocomplete({
                    source: aStation,
                    select: function (event, ui) {
                        //alert(ui.item.id);

                        toStationNode.show();
                        $.getJSON(URLAPI + '/API/stations/from/' + ui.item.id, function (data) {
                            var aFrom = $.map(data, function (item) {
                                return {
                                    label: item.town + ' - ' + item.name,
                                    value: item.town + ' - ' + item.name,
                                    id: item.id
                                };
                            })
                            $("#fromStationSelectHidden").val(ui.item.id);
                            $("#smeToStation").show();
                            $("#toStationSelect").autocomplete({
                                source: aFrom,
                                select: function (event, ui) {

                                    $("#toStationSelectHidden").val(ui.item.id);

                                    getJourneys(
                                        fromStationNode.val(),
                                        toStationNode.val(),
                                        $('input[name=smeDepartureDay]', atDateNode).val(),
                                        $('select[name=smeDepartureHours]', atDateNode).val(),
                                        $('select[name=smeDepartureMins]', atDateNode).val());

                                    $("#showReverse").show();
                                }

                            });

                        });

                    }
                });

            });


        }


    }


    var infoShow = function (journey, td) {
        var popin = $('#infoPopin');
        $('.route', popin).text(journey.routeName);
        var offset = td.position();
        popin.css({ top: offset.top - 4, left: offset.left + td.width() + 10 }).removeClass('hidden');
    }
    var infoHide = function () {
        $('#infoPopin').addClass('hidden');
    }
    $(document).click(function (e) {
        if (!$('#infoPopin').is('.hidden')) {
            var target = $(e.target);
            if (!target.is('#journeySearch a.info') && !target.is('#infoPopin') && target.parents('#infoPopin').size() == 0)
                infoHide();
        }
    });
    var getInfoTd = function (journey) {
        var td = $('<td/>');
        var lineTxt = $('<span class="line" />').text(journey.lineName);
        td.append(lineTxt);
        var a = $('<button type="button" class="btn btnInfo" data-toggle="tooltip" data-original-title="' + journey.routeName + '">').text('info');
        a.click(function () {
            infoShow(journey, td);
        });
        td.append(a);
        return td;
    }

    var formatWith2digits = function (str) {
        str += '';
        if (str.length == 0)
            return '00';
        else if (str.length == 1)
            return '0' + str;
        return str.substring(0, 2);
    };
    var getTimeTd = function (passage) {
        return $('<td/>').html((passage.time.hours > 9 ? passage.time.hours : '&nbsp;' + passage.time.hours) + ':' + formatWith2digits('' + passage.time.minutes))
    };

    function pdfUrl(lineId) {
        var service = URLAPI + '/lines/LINE_ID.pdf';
        return service.replace("LINE_ID", lineId);
    }

    var getJourneys = function (stationFromId, stationToId, date, hours, minutes) {
        if (window.XDomainRequest) {

            // Use Microsoft XDR
            var xdr = new XDomainRequest();
            var param = "?date=" + date.split('/').join('%2F') + "&hours=" + hours + "&minutes=" + minutes + "&windowMinutes=" + (60 * WINDOW_HOURS);
            xdr.open("get", URLAPI + '/API/journeys/' + stationFromId + '/' + stationToId + param);
            xdr.onload = function () {
                var JSON = $.parseJSON(xdr.responseText);
                if (JSON == null || typeof (JSON) == 'undefined') {
                    JSON = $.parseJSON(data.firstChild.textContent);
                }


                var table = $('table.journeys', resultsNode).empty();
                var thead = $('<thead />');
                var tbody = $('<tbody />');
                table.append(thead);
                table.append(tbody);
                thead.append('<tr class="townName"><th class="fromStation">' + JSON.fromStation.townName + '</th>' +
                    '<th class="toStation">' + JSON.toStation.townName + '</th></tr>');
                thead.append('<tr class="stationName"><th class="fromStation">' + JSON.fromStation.name + '</th>' +
                    '<th class="toStation">' + JSON.toStation.name + '</th></tr>');
                if (JSON.journeys.length != 0) {
                    var hourPairs = [];
                    for (var j in JSON.journeys) {
                        var journey = JSON.journeys[j];
                        var from = null;
                        var to = null;
                        for (var p = 0; p < journey.passages.length && !(from && to); ++p) {
                            var passage = journey.passages[p];
                            if (passage.stationId == stationFromId) from = passage;
                            else if (from && passage.stationId == stationToId) to = passage;
                        }
                        if (from && to)
                            hourPairs.push({ from: from, to: to, journey: journey });
                    }
                    hourPairs.sort(function (a, b) {
                        return a.from.time.hours * 60 + a.from.time.minutes > b.from.time.hours * 60 + b.from.time.minutes;
                    });
                    for (var h = 0; h < hourPairs.length; ++h) {
                        var hourPair = hourPairs[h];
                        var tr = $('<tr/>').addClass('journey').addClass(h % 2 ? 'odd' : 'even');
                        tr.append(getTimeTd(hourPair.from).attr('class', 'passage fromStation')).append(getTimeTd(hourPair.to).attr('class', 'passage toStation'));
                        tr.append(getInfoTd(journey));
                        tbody.append(tr);
                    }
                }
                if ($('tr.journey', table).size() == 0) {
                    tbody.append('<tr><td colspan="2" class="noItems">Aucun résultat pour cette configuration</td></tr>');
                }
                step(5);
                // $('.loading', atDateNode).addClass('hidden');
                //$('.api-loader').hide();

                $(".btnInfo").tooltip({
                    placement: 'top'
                });

                if (JSON.lineId) {
                    $("#downloadTimeTablePDFJourney").attr("href", pdfUrl(JSON.lineId)).show().css({
                        marginTop: "10px",
                        display: "block",
                        textAlign: "right"
                    });
                }
            };
            xdr.send();
        } else {
            $.ajax({
                dataType: 'json',
                url: URLAPI + '/API/journeys/' + stationFromId + '/' + stationToId,
                async: false,
                type: 'GET',
                data: { date: date, hours: hours, minutes: minutes, windowMinutes: 60 * WINDOW_HOURS },
                success: function (data) {
                    var table = $('table.journeys', resultsNode).empty();
                    var thead = $('<thead />');
                    var tbody = $('<tbody />');
                    table.append(thead);
                    table.append(tbody);
                    thead.append('<tr class="townName"><th class="fromStation">' + data.fromStation.townName + '</th>' +
                        '<th class="toStation">' + data.toStation.townName + '</th></tr>');
                    thead.append('<tr class="stationName"><th class="fromStation">' + data.fromStation.name + '</th>' +
                        '<th class="toStation">' + data.toStation.name + '</th></tr>');
                    if (data.journeys.length != 0) {
                        var hourPairs = [];
                        for (var j in data.journeys) {
                            var journey = data.journeys[j];
                            var from = null;
                            var to = null;
                            for (var p = 0; p < journey.passages.length && !(from && to); ++p) {
                                var passage = journey.passages[p];
                                if (passage.stationId == stationFromId) from = passage;
                                else if (from && passage.stationId == stationToId) to = passage;
                            }
                            if (from && to)
                                hourPairs.push({ from: from, to: to, journey: journey });
                        }
                        hourPairs.sort(function (a, b) {
                            return a.from.time.hours * 60 + a.from.time.minutes > b.from.time.hours * 60 + b.from.time.minutes;
                        });
                        for (var h = 0; h < hourPairs.length; ++h) {
                            var hourPair = hourPairs[h];
                            var tr = $('<tr/>').addClass('journey').addClass(h % 2 ? 'odd' : 'even');
                            tr.append(getTimeTd(hourPair.from).attr('class', 'passage fromStation')).append(getTimeTd(hourPair.to).attr('class', 'passage toStation'));
                            tr.append(getInfoTd(journey));
                            tbody.append(tr);
                        }
                    }
                    if ($('tr.journey', table).size() == 0) {
                        tbody.append('<tr><td colspan="2" class="noItems">Aucun résultat pour cette configuration</td></tr>');
                    }
                    step(5);
                    //$('.loading', atDateNode).addClass('hidden');
                    // $('.api-loader').hide();
                    if (data.lineId) {
                        $("#downloadTimeTablePDFJourney").attr("href", pdfUrl(data.lineId)).show().css({
                            marginTop: "10px",
                            display: "block",
                            textAlign: "right"
                        });
                    }
                }

            });

            $(".btnInfo").tooltip({
                placement: 'top'
            });

        }

    }

    /**
     * set the display to a specific step (by hidding/showing steps)
     * @arg lvl : 0 to 3
     */
    var step = function (lvl) {
        var steps = [fromStationNode, toStationNode, atDateNode, resultsNode];
        var tab = steps.slice(lvl);
        for (var s in tab) {
            tab[s].hide();
            //console.log(tab[s]);
        }

        tab = steps.slice(0, lvl);
        for (var s in tab) {
            tab[s].show();
        }

    }

    // bootstrap atDate datas
    var bootstrapAtDate = function () {
        var date = $('input[name=smeDepartureDay]', atDateNode);
        var hours = $('select[name=smeDepartureHours]', atDateNode);
        var minutes = $('select[name=smeDepartureMins]', atDateNode);
        var days = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
        for (var h = 0; h < 24; ++h)
            hours.append('<option value="' + h + '">' + (h < 10 ? '0' : '') + h + '</option>');
        for (var m = 0; m < 60; ++m)
            minutes.append('<option value="' + m + '">' + (m < 10 ? '0' : '') + m + '</option>');
        var now = new Date();
        $('option[value=' + (now.getHours()) + ']', hours).attr('selected', 'selected');
        $("#uniform-smeDepartureHours span").empty();
        $("#uniform-smeDepartureHours span").append(now.getHours());
        $('option[value=' + (now.getMinutes()) + ']', minutes).attr('selected', 'selected');
        $("#uniform-smeDepartureMins span").empty();
        $("#uniform-smeDepartureMins span").append(now.getMinutes());
        if ($.datepicker)
            date.datepicker().datepicker('setDate', new Date());
        else
            date.val(formatWith2digits(now.getDate() + '') + '/' + formatWith2digits('' + (now.getMonth() + 1)) + '/' + now.getFullYear());
    }

    $('#smeDepartureDay, #smeDepartureHours, #smeDepartureMins ').change(function () {
        refreshJourneys();
    });


    $('#fromStationSelect').focus(function () {
        $(this).val('');
        $('#toStationSelect').val('');
        $("#smeToStation").hide();
        atDateNode.hide();
        resultsNode.hide();
        $("#showReverse").hide();

    });

    $('#toStationSelect').focus(function () {
        $(this).val('');
        atDateNode.hide();
        resultsNode.hide();

    });

    /*Initier tous les deux onglets*/

    $('.expressFormUnit ul#myTab.tabNav li.active').click(function () {
        $('#fromStationSelect').val('');
        $('#toStationSelect').val('');
        $("#smeToStation").hide();
        atDateNode.hide();
        resultsNode.hide();
        $("#downloadTimeTablePDFTime").hide();
        $('#timetableSearch .tableResults').hide();
        $('#timetableSearch .tableResults').hide();
        $('.routes').hide();
        $('.timetables').hide();
        $('#timetableTime').hide();
        $("#uniform-lines span").empty();
        $("#uniform-lines span").append('Lignes');
        $('#lines option:eq(0)').prop('selected', true)

    });

    var refreshJourneys = function () {
        // $('.api-loader').show();
        getJourneys(
            fromStationNode.val(),
            toStationNode.val(),
            $('input[name=smeDepartureDay]', atDateNode).val(),
            $('select[name=smeDepartureHours]', atDateNode).val(),
            $('select[name=smeDepartureMins]', atDateNode).val());
    };

    var refreshWindowInfo = function () {
        $('.hours').text(WINDOW_HOURS + 1);
    };

    $('.more').click(function () {
        WINDOW_HOURS++;
        refreshWindowInfo();
        refreshJourneys();
    });

    // init
    bootstrapAtDate();
    step(0);
    if (!window.XDomainRequest) {
        loadStations();
    }
    refreshWindowInfo();

    // Changer horaire du resultat

    $('#timetableTimeHours , #timetableTimeHoursMins ').change(function (event) {

        // var id = event.target.value;
        var time = "";

        var hour = parseInt($("#timetableTimeHours").val());
        var min = parseInt($("#timetableTimeHoursMins").val());

        time = (( hour * 60 ) + min);

        applyTimeToTimetable(time);
    });

//Inverse Station
    var flag = true;


    $("#showReverse").click(function () {

        if (flag) {

            var text_fromStation_select = $('#fromStationSelect').val();
            var text_toStation_select = $('#toStationSelect').val();

            $('#fromStationSelect').val(text_toStation_select);
            $('#toStationSelect').val(text_fromStation_select);


            var valFromStationNode = fromStationNode.val();
            var valToStationNode = toStationNode.val();

            fromStationNode.val(valToStationNode);
            toStationNode.val(valFromStationNode);

            getJourneys(
                fromStationNode.val(),
                toStationNode.val(),
                $('input[name=smeDepartureDay]', atDateNode).val(),
                $('select[name=smeDepartureHours]', atDateNode).val(),
                $('select[name=smeDepartureMins]', atDateNode).val()
            );

            flag = false;

        } else {

            var text_fromStation_select = $('#fromStationSelect').val();
            var text_toStation_select = $('#toStationSelect').val();

            $('#fromStationSelect').val(text_toStation_select);
            $('#toStationSelect').val(text_fromStation_select);

            var valFromStationNode = fromStationNode.val();
            var valToStationNode = toStationNode.val();

            fromStationNode.val(valToStationNode);
            toStationNode.val(valFromStationNode);

            getJourneys(
                fromStationNode.val(),
                toStationNode.val(),
                $('input[name=smeDepartureDay]', atDateNode).val(),
                $('select[name=smeDepartureHours]', atDateNode).val(),
                $('select[name=smeDepartureMins]', atDateNode).val()
            );

            flag = true;

        }

    });

})