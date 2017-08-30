"use strict";$.i18n.debug=!0,$.extend($.i18n.parser.emitter,{link:function(t){return'<a target="_blank" href="'+t[1]+'">'+t[0]+"</a>"}});var MessiViz;!function(t,s,i,e){MessiViz=t.MessiViz=t.MessiViz||{},MessiViz.MATCHES,MessiViz.GOALS,MessiViz.team="ARG",MessiViz.SELECTED=null,MessiViz.selectedSlide="item-home",MessiViz.$loader=i("#loader-container"),MessiViz.isBreakpoint=function(t){return i(".device-"+t).is(":visible")},MessiViz.setLang=function(t){var s=i.i18n();s.locale=t,s.load("i18n/"+s.locale+".json",s.locale).done(function(){i("body").i18n(),i(".i18n-html").each(function(){var t=i(this);t.html(i.i18n(t.data("i18n-html")))}),MessiViz.init()})},MessiViz.competitions=["PRM","CUP","EUR","FRN","WCQ","WCP","SUP","IUP","CPA","WCT"],MessiViz.competitionName={PRM:"La Liga española",CUP:"Copa del Rey de España",EUR:"Champions League",FRN:"Amistoso internacional",WCQ:"Eliminatorias para la copa del mundo",WCP:"Copa del mundo",SUP:"Supercopa de España",IUP:"Supercopa de Europa UEFA",CPA:"Copa América",WCT:"Mundial de clubes"},MessiViz.hows=["Left foot","Right foot","Head","Hand","Chest"],MessiViz.teams=["FC Barcelona","Argentina"],MessiViz.color=e.scale.ordinal().domain(MessiViz.competitions).range(e.scale.category10().range()),MessiViz.colorHow=e.scale.ordinal().domain(MessiViz.hows).range(e.scale.category10().range()),MessiViz.colorTeam=e.scale.ordinal().domain(MessiViz.teams).range(e.scale.category10().range()),MessiViz.colorMinutes=e.scale.threshold().domain([0,1,3,5,7,9,11,15,40]).range(["#ffffff","#ffef9b","#ffdb6c","#ffc44b","#ffac31","#ff911b","#ff7408","#ff5000","#ff0000"]),MessiViz.svg,MessiViz.groups={},MessiViz.totals={$goals:i(".totals-goals"),$assists:i("#totals-assists"),$minutes:i("#totals-minutes"),$goalsPerMatch:i("#goals-per-match"),$assistsPerMatch:i("#assists-per-match"),$matches:i("#totals-matches"),$goalsLeft:i("#totals-goals-left"),$goalsRight:i("#totals-goals-right"),$goalsHead:i("#totals-goals-head"),$goalsHand:i("#totals-goals-hand"),$goalsChest:i("#totals-goals-chest"),$goalsArg:i("#totals-goals-argentina"),$goalsBar:i("#totals-goals-barcelona"),$activeFilter:i("#active-filter"),$iconFilter:i("#icon-filter"),$messiContainer:i("#messi-container"),$svgMinutes:i("#svg-minutes-container")},MessiViz.barGap={x:0,y:0},MessiViz.init=function(){e.csv("./data/messi-500-matches.csv",function(t){MessiViz.MATCHES=t,e.csv("./data/messi-500-goals.csv",function(t){MessiViz.GOALS=t,MessiViz.dataLoaded()})}),e.xml("./images/messi-01-01-01.svg","image/svg+xml",function(t,s){if(t)throw t;MessiViz.totals.$messiContainer.html(s.documentElement),i("#messi-container svg path").each(function(t,s){var e=i(s);"#49869D"==e.attr("fill")?e.addClass("color1"):"#FFFFFF"==e.attr("fill")&&e.addClass("color2")}),setInterval(function(){"ARG"==MessiViz.team?(MessiViz.team="BAR",e.selectAll("#messi-container svg path.color1").transition().duration(2e3).attr("fill","#00529F"),e.selectAll("#messi-container svg path.color2").transition().duration(2e3).attr("fill","#A2214B"),e.selectAll("#messi-container svg path.color3").transition().duration(2e3).attr("fill","#F2C114")):(MessiViz.team="ARG",e.selectAll("#messi-container svg path.color1").transition().duration(2e3).attr("fill","#75AADB"),e.selectAll("#messi-container svg path.color2").transition().duration(2e3).attr("fill","#FFFFFF"),e.selectAll("#messi-container svg path.color3").transition().duration(2e3).attr("fill","#232323"))},5e3)})},MessiViz.dataLoaded=function(){var t=e.nest().key(function(t){return t.date}).map(MessiViz.GOALS);_.forEach(MessiViz.MATCHES,function(s){t[s.date]?s.details=t[s.date]:s.details=[]}),MessiViz.renderD3Chart(MessiViz.MATCHES,2e3),MessiViz.initEvents(),MessiViz.hideTooltip()},MessiViz.renderD3Chart=function(t,s){if(MessiViz.SELECTED_MATCHES=t.map(function(t,s){t.index=s}),!MessiViz.svg){MessiViz.margin={top:0,right:0,bottom:0,left:0},MessiViz.width=i(window).width()-MessiViz.margin.left-MessiViz.margin.right,MessiViz.height=i(window).height()-MessiViz.margin.top-MessiViz.margin.bottom,MessiViz.chartSize=100;var a=MessiViz.height-i(".masthead").height();(MessiViz.isBreakpoint("md")||MessiViz.isBreakpoint("lg"))&&(a-=MessiViz.chartSize),i(".carousel-inner,.item").height(a),MessiViz.svg=e.select("#svg-container").append("svg").classed("main-svg",!0).attr("width",MessiViz.width+MessiViz.margin.left+MessiViz.margin.right).attr("height",MessiViz.height+MessiViz.margin.top+MessiViz.margin.bottom).append("g").attr("transform","translate("+MessiViz.margin.left+","+MessiViz.margin.top+")"),MessiViz.tooltip=e.select("body").append("div").classed("info-tooltip",!0).style("top",0).style("left",0).style("width",MessiViz.width/4+"px").style("height",MessiViz.height/4+"px").style("display","block"),MessiViz.$loader.removeClass("loading")}MessiViz.isBreakpoint("sm")||MessiViz.isBreakpoint("xs")||(MessiViz.tooltipx=e.scale.linear().domain([0,MessiViz.SELECTED_MATCHES.length]).range([MessiViz.chartSize,MessiViz.width-MessiViz.width/4-MessiViz.chartSize]),MessiViz.tooltipy=e.scale.linear().domain([0,MessiViz.SELECTED_MATCHES.length]).range([0,MessiViz.height-MessiViz.height/4-MessiViz.chartSize]),s=s?s:0,MessiViz.renderGoals(t,s),MessiViz.renderAssists(t,s),MessiViz.renderMinutes(t,s)),MessiViz.updateTotals(t),MessiViz.lineh||(MessiViz.lineh=MessiViz.svg.append("line").classed("lineh",!0).attr("x1",0).attr("y1",0).attr("x2",MessiViz.width).attr("y2",0),MessiViz.linev=MessiViz.svg.append("line").classed("linev",!0).attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",MessiViz.height))},MessiViz.renderGoals=function(t,s){MessiViz.groups.goals||(MessiViz.groups.goals=MessiViz.svg.append("g").classed("goals",!0),MessiViz.maxGoals=e.max(t,function(t){return t.goals}),MessiViz.totals.goals=MessiViz.groups.goals.append("text").text(function(t){return""}).classed("totals-number",!0).attr("id","totals-number-goals").attr("y",function(t,s){return MessiViz.height/2}).attr("x",function(t,s){return(MessiViz.width-2*MessiViz.chartSize)/4}).attr("text-anchor","middle"),MessiViz.groups.goals.append("text").text(function(t){return i.i18n("vis-goals")}).attr("data-i18n","vis-goals").classed("totals-label",!0).attr("y",function(t,s){return 0}).attr("x",function(t,s){return MessiViz.height/2-MessiViz.chartSize/2}).attr("text-anchor","middle").attr("transform","rotate(90)"));var a=e.scale.ordinal().domain([0,t.length]).rangeBands([0,MessiViz.height-MessiViz.chartSize]),n=e.scale.linear().domain(e.range(0,6,1)).range([0,MessiViz.chartSize]);a.domain(t.map(function(t,s){return s})),n.domain([0,MessiViz.maxGoals]),MessiViz.barGap.y=a.rangeBand();var r=MessiViz.groups.goals.selectAll(".bar.bar-goal").data(t);r.exit().remove(),r.enter().append("rect").attr("x",function(t,s){return 0}).attr("width",function(t){return 0}),r.attr("class",function(t,s){return"match"+t.id+" "+t.competition}).classed("bar",!0).classed("bar-unit",!0).classed("bar-goal",!0).transition().delay(function(t,i){return 5*i+s}).attr("fill","#ddd").attr("y",function(t,s){return a(s)}).attr("height",a.rangeBand()).attr("width",function(t){return 0==n(t.goals)?2:n(t.goals)});var r=MessiViz.groups.goals.selectAll(".bar.bar-goal-fill").data(t);r.exit().remove(),r.enter().append("rect").classed("bar",!0).classed("bar-goal-fill",!0).attr("fill","transparent").attr("x",function(t,s){return 0}).attr("width",function(t){return n(MessiViz.maxGoals)}),r.attr("y",function(t,s){return a(s)}).attr("height",a.rangeBand()).on("mouseover",function(t){MessiViz.hover(t)}).on("mouseout",function(t){MessiViz.unhover(t)})},MessiViz.renderAssists=function(t,s){MessiViz.groups.assists||(MessiViz.groups.assists=MessiViz.svg.append("g").classed("assists",!0),MessiViz.maxAssists=e.max(t,function(t){return t.assists}),MessiViz.totals.assists=MessiViz.groups.assists.append("text").text(function(t){return""}).classed("totals-number",!0).attr("id","totals-number-assists").attr("y",function(t,s){return MessiViz.height/2}).attr("x",function(t,s){return MessiViz.width-MessiViz.chartSize-(MessiViz.width-2*MessiViz.chartSize)/4}).attr("text-anchor","middle"),MessiViz.groups.assists.append("text").text(function(t){return i.i18n("vis-assists")}).attr("data-i18n","vis-assists").classed("totals-label-assists",!0).attr("y",function(t,s){return MessiViz.width}).attr("x",function(t,s){return-MessiViz.height/2+MessiViz.chartSize/2}).attr("text-anchor","middle").attr("transform","rotate(270)"));var a=e.scale.ordinal().domain([0,t.length]).rangeBands([0,MessiViz.height-MessiViz.chartSize]),n=e.scale.linear().domain(e.range(0,MessiViz.maxAssists,1)).range([0,MessiViz.chartSize]);a.domain(t.map(function(t,s){return s})),n.domain([0,MessiViz.maxAssists]);var r=MessiViz.groups.assists.selectAll(".bar.bar-assist").data(t);r.exit().remove(),r.enter().append("rect").attr("x",function(t,s){return MessiViz.width}).attr("width",function(t){return 0}),r.attr("class",function(t,s){return"match"+t.id+" "+t.competition}).classed("bar",!0).classed("bar-unit",!0).classed("bar-assist",!0).transition().delay(function(t,i){return 5*i+s}).attr("fill","#ddd").attr("y",function(t,s){return a(s)}).attr("height",a.rangeBand()).attr("width",function(t){return 0==n(t.assists)?2:n(t.assists)}).attr("x",function(t,s){var i=0==n(t.assists)?2:n(t.assists);return MessiViz.width-i});var r=MessiViz.groups.assists.selectAll(".bar.bar-assist-fill").data(t);r.exit().remove(),r.enter().append("rect").classed("bar",!0).classed("bar-assist-fill",!0).attr("fill","transparent").attr("x",function(t,s){return MessiViz.width-n(MessiViz.maxAssists)}).attr("width",function(t){return n(MessiViz.maxAssists)}),r.attr("y",function(t,s){return a(s)}).attr("height",a.rangeBand()).on("mouseover",function(t){MessiViz.hover(t)}).on("mouseout",function(t){MessiViz.unhover(t)})},MessiViz.renderMinutes=function(t,s){MessiViz.groups.minutes||(MessiViz.groups.minutes=MessiViz.svg.append("g").classed("minutes",!0),MessiViz.maxMinutes=e.max(t,function(t){return parseInt(t.minutes)}),MessiViz.totals.minutes=MessiViz.groups.minutes.append("text").text(function(t){return""}).classed("totals-number",!0).attr("id","totals-number-minutes").attr("y",function(t,s){return MessiViz.height/2}).attr("x",function(t,s){return MessiViz.width/2}).attr("text-anchor","middle"),MessiViz.totals.matches=MessiViz.groups.minutes.append("text").text(function(t){return""}).classed("totals-number",!0).attr("id","totals-number-matches").attr("y",function(t,s){return MessiViz.height/2+200}).attr("x",function(t,s){return MessiViz.width/2}).attr("text-anchor","middle"),MessiViz.groups.minutes.append("text").text(function(t){return i.i18n("vis-minutes")}).attr("data-i18n","vis-minutes").classed("totals-label",!0).attr("y",function(t,s){return MessiViz.height}).attr("x",function(t,s){return MessiViz.width/2}).attr("text-anchor","middle"));var a=e.scale.ordinal().domain([0,t.length]).rangeBands([MessiViz.chartSize,MessiViz.width-MessiViz.chartSize]),n=e.scale.linear().domain(e.range(0,MessiViz.maxMinutes,1)).range([0,MessiViz.chartSize]);a.domain(t.map(function(t,s){return s})),n.domain([0,MessiViz.maxMinutes]),MessiViz.barGap.x=a.rangeBand();var r=MessiViz.groups.minutes.selectAll(".bar.bar-minute").data(t);r.exit().remove(),r.enter().append("rect").attr("y",function(t,s){return MessiViz.height}).attr("height",function(t){return 0}),r.attr("class",function(t,s){return"match"+t.id+" "+t.competition}).classed("bar",!0).classed("bar-unit",!0).classed("bar-minute",!0).transition().delay(function(t,i){return 5*i+s}).attr("fill","#ddd").attr("x",function(t,s){return a(s)}).attr("width",a.rangeBand()).attr("y",function(t,s){return MessiViz.height-n(t.minutes)}).attr("height",function(t){return n(t.minutes)});var r=MessiViz.groups.minutes.selectAll(".bar.bar-minute-fill").data(t);r.exit().remove(),r.enter().append("rect").classed("bar",!0).classed("bar-minute-fill",!0).attr("fill","transparent").attr("y",function(t,s){return MessiViz.height-n(MessiViz.maxMinutes)}).attr("height",function(t){return n(MessiViz.maxMinutes)}),r.attr("width",a.rangeBand()).attr("x",function(t,s){return a(s)}).on("mouseover",function(t){MessiViz.hover(t)}).on("mouseout",function(t){MessiViz.unhover(t)})},MessiViz.renderMinutesMatrix=function(){var t=e.nest().key(function(t){var s=parseInt(t.minute);return t.minute>90?90:s}).entries(MessiViz.GOALS_SELECTED);e.range(1,91).forEach(function(s){_.find(t,{key:""+s})||t.push({key:s,values:[]})}),t.sort(function(t,s){return parseInt(t.key)>parseInt(s.key)});var s=MessiViz.totals.$svgMinutes.parent().innerHeight(),a=MessiViz.totals.$svgMinutes.parent().innerWidth();(MessiViz.isBreakpoint("sm")||MessiViz.isBreakpoint("xs"))&&(s-=i("#matrix-title-container").height()),MessiViz.groups.matrix||(MessiViz.matrixMargin={top:10,right:0,bottom:10,left:0},MessiViz.matrixSvg=e.select("#svg-minutes-container").append("svg").classed("matrix-svg",!0).attr("width",a).attr("height",s),MessiViz.groups.matrix=MessiViz.matrixSvg.append("g").classed("matrix-group",!0).attr("transform","translate("+MessiViz.matrixMargin.left+","+MessiViz.matrixMargin.top+")"));var n=e.scale.ordinal().domain(e.range(1,11)).rangeBands([0,a]),r=e.scale.ordinal().domain(e.range(1,10)).rangeBands([0,s-MessiViz.matrixMargin.top-MessiViz.matrixMargin.bottom]),o=MessiViz.groups.matrix.selectAll(".matrix-back").data(t);o.enter().append("rect").attr("x",function(t,s){return n(t.key%10==0?10:t.key%10)}).attr("y",function(t,s){return r(Math.ceil(t.key/10))}).attr("height",r.rangeBand()).attr("width",n.rangeBand()),o.attr("class",function(t,s){return"minute"+t.key}).classed("matrix-back",!0).transition().attr("fill",function(t){return MessiViz.colorMinutes(t.values.length)});var l=MessiViz.groups.matrix.selectAll(".matrix-goals").data(t);l.enter().append("text").attr("text-anchor","middle").attr("alignment-baseline","middle").attr("x",function(t,s){return n(t.key%10==0?10:t.key%10)+n.rangeBand()/2}).attr("y",function(t,s){return r(Math.ceil(t.key/10))+r.rangeBand()/2+r.rangeBand()/4}),l.attr("class",function(t,s){return"minute"+t.key}).text(function(t){return t.values.length}).classed("matrix-goals",!0).attr("fill","#000");var l=MessiViz.groups.matrix.selectAll(".matrix-minute").data(t);l.enter().append("text").attr("text-anchor","middle").attr("alignment-baseline","baseline").attr("x",function(t,s){return n(t.key%10==0?10:t.key%10)+n.rangeBand()/2}).attr("y",function(t,s){return r(Math.ceil(t.key/10))+r.rangeBand()/2-r.rangeBand()/4}),l.attr("class",function(t,s){return"minute"+t.key}).text(function(t){return 90==t.key||45==t.key?t.key+"'+":t.key+"'"}).classed("matrix-minute",!0).attr("fill","#333")},MessiViz.hover=function(t){MessiViz.SELECTED=t.id,e.selectAll("rect.match"+t.id).classed("selectedMatch",!0),e.selectAll("circle.match"+t.id).classed("selectedGoal",!0);var s=e.select("rect.bar-minute.match"+t.id).attr("x"),a=e.select("rect.bar-goal.match"+t.id).attr("y");MessiViz.linev.transition().style("opacity",1).attr("x1",Math.round(s)+Math.round(MessiViz.barGap.x/2)).attr("y1",Math.round(a)+Math.round(MessiViz.barGap.y/2)).attr("x2",Math.round(s)+Math.round(MessiViz.barGap.x/2)),MessiViz.lineh.transition().style("opacity",1).attr("y1",Math.round(a)+Math.round(MessiViz.barGap.y/2)).attr("y2",Math.round(a)+Math.round(MessiViz.barGap.y/2)),MessiViz.tooltip.html(function(){var s=t.home_goals>t.away_goals?"home":"away",e=t.home_goals<t.away_goals?"home":"away",a="<p>"+i.i18n("game-date",t.date,t.home,t.away,i.i18n(t.competition));return a+=s==e?i.i18n("game-tie"):"home"==e?i.i18n("game-away"):i.i18n("game-home"),a+=i.i18n("game-result",t.home_goals,t.away_goals),a+=0==t.goals?i.i18n("game-no-goals",MessiViz.color("GOAL")):1==t.goals?i.i18n("game-one-goals",MessiViz.color("GOAL"),t.details[0].minute):i.i18n("game-n-goals",MessiViz.color("GOAL"),t.goals),a+=0==t.assists?i.i18n("game-no-assists",MessiViz.color("ASSIST")):1==t.assists?i.i18n("game-one-assists",MessiViz.color("ASSIST")):i.i18n("game-n-assists",MessiViz.color("ASSIST"),t.assists),t.minutes>=90?(a+=i.i18n("game-90",MessiViz.color("MINUTE")),120==t.minutes&&(a+=i.i18n("game-120",MessiViz.color("MINUTE"))),a+="."):a+=t.minutes<45?i.i18n("game-less",MessiViz.color("MINUTE"),t.minutes):i.i18n("game-more",MessiViz.color("MINUTE"),t.minutes),a+"</p>"}).transition().style("opacity","1").style("left",MessiViz.tooltipx(t.index)+"px").style("top",MessiViz.tooltipy(t.index)+"px")},MessiViz.unhover=function(t,s){e.selectAll("rect.bar").classed("selectedMatch",!1),e.selectAll("circle.goal").classed("selectedGoal",!1)},MessiViz.hideTooltip=function(t,s){MessiViz.tooltip.transition().style("opacity","0"),MessiViz.linev.transition().attr("x1",0).attr("x2",MessiViz.width).style("opacity",0),MessiViz.lineh.transition().attr("y1",MessiViz.height).attr("y2",0).style("opacity",0)},MessiViz.initEvents=function(){i(s).keydown(function(t){switch(t.which){case 37:case 38:MessiViz.prev();break;case 39:case 40:MessiViz.next();break;case 27:MessiViz.hideTooltip();break;default:return}t.preventDefault()}),i(".btn-filter").on("click",function(){var t=i(this);MessiViz.totals.$activeFilter.html(t.html()),MessiViz.totals.$iconFilter.fadeOut(),t.parent().addClass("disabled").siblings().removeClass("disabled"),MessiViz.hideTooltip(),MessiViz.filter(t.data("field"),t.data("filter"))}),i("#clear-filter").on("click",function(){MessiViz.totals.$activeFilter.html("total"),MessiViz.totals.$iconFilter.fadeIn(),i(".btn-filter").parent().removeClass("disabled"),MessiViz.clear()}),i("#filtersModal").on("show.bs.modal",function(t){MessiViz.hideTooltip()}),i("#carousel-messi").carousel({interval:!1}).off("keydown.bs.carousel"),i(".container").mouseenter(function(){MessiViz.hideTooltip(),MessiViz.clearBars(),MessiViz.updateBySlide()}),i("svg.main-svg").mouseenter(function(){MessiViz.showBars(),MessiViz.hideTotals()}),i("#carousel-messi").on("slid.bs.carousel",function(t){var s=i(t.relatedTarget).attr("id");MessiViz.selectedSlide=s,MessiViz.updateBySlide()}),i("#enter").on("click",function(){window.scrollTo(0,0),i("body").removeClass("help"),MessiViz.$loader.fadeOut()}),i(".change-lang").on("click",function(){MessiViz.setLang(i(this).data("lang")),i(".change-lang").removeClass("hide"),i(this).addClass("hide")})},MessiViz.hideTotals=function(){i("h4.main-total").css("color","#ddd"),MessiViz.groups.forceLayout&&MessiViz.groups.forceLayout.selectAll("circle.goal").attr("fill","#111")},MessiViz.updateBySlide=function(){switch(MessiViz.selectedSlide){case"item-home":MessiViz.hideForceLayout();break;case"item-totals":MessiViz.renderForceLayout();break;case"item-goals":MessiViz.renderForceLayout(),MessiViz.goalsByHow();break;case"item-teams":MessiViz.renderForceLayout(),MessiViz.goalsByTeam();break;case"item-minutes":MessiViz.hideForceLayout(),MessiViz.renderMinutesMatrix()}},MessiViz.renderForceLayout=function(){function t(t){var s=t.radius+20,i=t.x-s,e=t.x+s,a=t.y-s,n=t.y+s;return function(s,r,o,l,c){if(s.point&&s.point!==t){var u=t.x-s.point.x,d=t.y-s.point.y,M=Math.sqrt(u*u+d*d),z=t.radius+s.point.radius;M<z&&(M=(M-z)/M*.5,t.x-=u*=M,t.y-=d*=M,s.point.x+=u,s.point.y+=d)}return r>e||l<i||o>n||c<a}}var s=MessiViz.GOALS_SELECTED.map(function(t){return t.radius=8,t});s.unshift({radius:0,fixed:!0});var i=e.layout.force().gravity(.08).charge(function(t,s){return t.fixed?0:-10}).nodes(s).size([MessiViz.width,MessiViz.height]);MessiViz.groups.forceLayout||(MessiViz.groups.forceLayout=MessiViz.svg.append("g").classed("force-layout",!0)),i.start();var a=MessiViz.groups.forceLayout.selectAll("circle.goal").data(s.slice(1));a.exit().remove(),a.enter().append("svg:circle").attr("r",function(t){return t.radius}).attr("cx",0).attr("cy",0),a.attr("fill","#111").attr("class",function(t){return"match"+t.match_id}).classed("goal",!0),i.on("tick",function(i){s[0].x=MessiViz.width/2,s[0].y=MessiViz.height/2;for(var a=e.geom.quadtree(s),n=0,r=s.length;++n<r;)a.visit(t(s[n]));MessiViz.groups.forceLayout.selectAll("circle.goal").attr("cx",function(t){return t.x}).attr("cy",function(t){return t.y})}),i.resume()},MessiViz.goalsByHow=function(){i("#item-goals h4").each(function(t){var s=i(this);s.css("color",MessiViz.colorHow(s.data("how")))}),MessiViz.groups.forceLayout.selectAll("circle.goal").attr("fill",function(t){return MessiViz.colorHow(t.how)})},MessiViz.goalsByTeam=function(){i("#item-teams h4").each(function(t){var s=i(this);s.css("color",MessiViz.colorTeam(s.data("team")))}),MessiViz.groups.forceLayout.selectAll("circle.goal").attr("fill",function(t){return MessiViz.colorTeam(t.team)})},MessiViz.hideForceLayout=function(){MessiViz.groups.forceLayout&&MessiViz.groups.forceLayout.selectAll("circle.goal").transition().attr("r",0).remove()},MessiViz.clearBars=function(){e.selectAll("rect.bar-unit").attr("fill","#ddd"),e.selectAll("text.totals-label,text.totals-label-assists").style("opacity",0)},MessiViz.showBars=function(){e.selectAll("rect.bar-goal").attr("fill",function(t,s){return MessiViz.color("GOAL")}),e.selectAll("rect.bar-assist").attr("fill",function(t,s){return MessiViz.color("ASSIST")}),e.selectAll("rect.bar-minute").attr("fill",function(t,s){return MessiViz.color("MINUTE")}),e.selectAll("text.totals-label,text.totals-label-assists").style("opacity",1)},MessiViz.updateTotals=function(t){var s=0,i=0,e=0,a=0,n=0,r=0,o=0,l=t.length;MessiViz.GOALS_SELECTED=[],t.forEach(function(t){s+=parseInt(t.goals),i+=parseInt(t.assists),e+=parseInt(t.minutes),"Argentina"==t.team?(a++,t.goals>0&&(r+=parseInt(t.goals))):(n++,t.goals>0&&(o+=parseInt(t.goals))),t.details.length&&(MessiViz.GOALS_SELECTED=_.concat(MessiViz.GOALS_SELECTED,t.details.map(function(s){return s.match_id=t.id,s.team=t.team,s})))}),MessiViz.updateGoals(),MessiViz.totals.$goals.countTo({from:parseInt(MessiViz.totals.$goals.html()),to:s,speed:1e3,formatter:function(t,s){return t.toFixed(s.decimals)}}),MessiViz.totals.$assists.countTo({from:parseInt(MessiViz.totals.$assists.html()),to:i,speed:1e3,formatter:function(t,s){return t.toFixed(s.decimals)}}),MessiViz.totals.$goalsPerMatch.countTo({from:parseInt(MessiViz.totals.$goalsPerMatch.html()),to:s/l,speed:1e3,formatter:function(t,s){return t.toFixed(2)}}),MessiViz.totals.$assistsPerMatch.countTo({from:parseInt(MessiViz.totals.$assistsPerMatch.html()),to:i/l,speed:1e3,formatter:function(t,s){return t.toFixed(2)}}),MessiViz.totals.$minutes.countTo({from:parseInt(MessiViz.totals.$minutes.html()),to:e,speed:1e3,formatter:function(t,s){return t.toFixed(s.decimals)}}),MessiViz.totals.$matches.countTo({from:parseInt(MessiViz.totals.$matches.html()),to:l,speed:1e3,formatter:function(t,s){return t.toFixed(s.decimals)}}),MessiViz.totals.$goalsArg.countTo({from:parseInt(MessiViz.totals.$goalsArg.html()),to:r,speed:1e3,formatter:function(t,s){return t.toFixed(s.decimals)}}),MessiViz.totals.$goalsBar.countTo({from:parseInt(MessiViz.totals.$goalsBar.html()),to:o,speed:1e3,formatter:function(t,s){return t.toFixed(s.decimals)}})},MessiViz.updateGoals=function(){var t=e.nest().key(function(t){return t.how}).map(MessiViz.GOALS_SELECTED);MessiViz.totals.$goalsLeft.countTo({from:parseInt(MessiViz.totals.$goalsLeft.html()),to:t["Left foot"]?t["Left foot"].length:0,speed:1e3,formatter:function(t,s){return t.toFixed(s.decimals)}}),MessiViz.totals.$goalsRight.countTo({from:parseInt(MessiViz.totals.$goalsRight.html()),to:t["Right foot"]?t["Right foot"].length:0,speed:1e3,formatter:function(t,s){return t.toFixed(s.decimals)}}),MessiViz.totals.$goalsHead.countTo({from:parseInt(MessiViz.totals.$goalsHead.html()),to:t.Head?t.Head.length:0,speed:1e3,formatter:function(t,s){return t.toFixed(s.decimals)}}),MessiViz.totals.$goalsChest.countTo({from:parseInt(MessiViz.totals.$goalsChest.html()),to:t.Chest?t.Chest.length:0,speed:1e3,formatter:function(t,s){return t.toFixed(s.decimals)}}),MessiViz.totals.$goalsHand.countTo({from:parseInt(MessiViz.totals.$goalsHand.html()),to:t.Hand?t.Hand.length:0,speed:1e3,formatter:function(t,s){return t.toFixed(s.decimals)}}),MessiViz.updateBySlide()},MessiViz.next=function(){MessiViz.unhover(null,MessiViz.SELECTED),MessiViz.SELECTED<MessiViz.MATCHES.length-1?MessiViz.SELECTED++:MessiViz.SELECTED=0,MessiViz.hover(e.select("rect.match"+MessiViz.SELECTED).datum(),MessiViz.SELECTED)},MessiViz.prev=function(){MessiViz.unhover(null,MessiViz.SELECTED),MessiViz.SELECTED>0?MessiViz.SELECTED--:MessiViz.SELECTED=MessiViz.MATCHES.length-1,MessiViz.hover(e.select("rect.match"+MessiViz.SELECTED).datum(),MessiViz.SELECTED)},MessiViz.filter=function(t,s){var i=MessiViz.MATCHES.filter(function(i){return i[t]==s});MessiViz.renderD3Chart(i)},MessiViz.clear=function(){MessiViz.renderD3Chart(MessiViz.MATCHES)}}(window,document,jQuery,d3);