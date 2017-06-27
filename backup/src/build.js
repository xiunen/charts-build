(function(require,exports,module){
  var charts_container = $('#charts-container');
  var html = [];
  for(var i in DATA){
    html.push('<div class="chart-item clearfix"  id="chart-'+i+'" data-key="'+i+'"></div>');
  }
  charts_container.html(html.join(''));
  // seajs.use("echarts-all.js", function(){
  //   window.onscroll();
  // });
  var t = Date.now();
  var topElem=$('#fixed-top'),bottomElem = $('#fixed-bottom');
  var charts = {};
  window.onscroll = function(){
    var _t = Date.now();
    if(_t-t<30)return false;
    $('.chart-item').each(function(){
      var elem = $(this);
      var key = elem.data('key');
      var elemTop = elem.offset().top, elemBottom = elem.offset().top + elem.height();
      if(!(elemTop > bottomElem.offset().top || elemBottom < topElem.offset().top)){
        (elem.data('status') != "load") && renderChart(elem,key);
      }
    });
  }
  var func = {
    //饼图
    f_21:function(ctx,data){
      // if(data.multi_column)return func.f_21_multi(ctx,data);
      var series = [], category=[], _data = [], _datas = {};
      for(var i in data.data){
        category.push(i);
        _data.push(data.data[i].data);

        if(typeof data.data[i] == "object"){
          for(var j in data.data[i]){
            _datas[j] = _datas[j]||[];
            _datas[j].push(data.data[i][j].data);
          }
        }
        series.push({name:i, value:data.data[i].data});
      }
      var option = {
        title: {text:data.name,x:'center'},
        tooltip: {
              trigger: 'item'
          },
          series:[]
      };
      if(series.length == 0){
        ctx.html('暂无数据');
        return false;
      }
      if(series.length < 10 && !data.multi_column){
        option.tooltip.formatter = "{a} <br/>{b} : {c} ({d}%)";
        option.series.push({
            type:"pie",
            name:data.name,
            radius:"55%",
            center:['50%', '60%'],
            data:series,
            itemStyle: {
                  normal:{
                    label:{
                      formatter: "{b} : {c} ({d}%)"
                    }
                  }
                }
          });
      }else{
        option.xAxis = [
              {
                  type : 'category',
                  data : category,
                  axisLabel:{
                    rotate:-20
                  }
              }
          ];
          option.yAxis = [
              {
                  type : 'value'
              }
          ];
          if(data.multi_column){
            option.series.push({
              type:"bar",
              data:_data
            });
          }else{
            for(var i in _datas){
              option.series.push({
                type:"bar",
                name:i,
                data:_datas[i]
              });
            }
          }
      }
      var chart_ctx = document.getElementById(ctx.attr('id'));
      var key = ctx.data('key');
      if(chart_ctx){
        charts[key] = echarts.init(chart_ctx);
        charts[key].setOption(option);
      }
      // return option;
    },
    //多柱状图
    f_26:function(ctx,data){
      // if(data.multi_column)return func.f_21_multi(ctx,data);

      var ret = {}, category = [],_data = [], series = [],
        key = ctx.data('key'),_datas={};
      for(var i in data.data){
        category.push(i);
        var value = data.data[i].data;
        _data.push(value);
        series.push({name:i,value:value});
      }
      if(series.length == 0){
        ctx.html('暂无数据');
        return false;
      }
      ctx.html('<div class="main col-xs-6" id="main-'+key+'"></div><div class="sub col-xs-6" id="sub-'+key+'"></div>');

      var option = {
        title: {text:data.name,x:'center'},
        tooltip:{
          trigger: 'item'
        },
          series:[]
      };
      if(series.length < 10 && !data.multi_column){
        option.tooltip =  {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          };
        option.series.push({
            type:"pie",
            name:data.name,
            radius:"55%",
            center:['50%', '60%'],
            data:series,
            itemStyle: {
                  normal:{
                    label:{
                      formatter: "{b} : {c} ({d}%)"
                    }
                  }
                }
          });
      }else{
        option.xAxis = [
              {
                  type : 'category',
                  data : category,
                  axisLabel:{
                    rotate:-40
                  }
              }
          ];
          option.grid = {x:40,x2:10};
          option.yAxis = [
              {
                  type : 'value'
              }
          ];
          if(!data.multi_column){
            option.series.push({
              type:"bar",
              data:_data
            });
          }else{
            for(var i in _datas){
              option.series.push({
                type:"bar",
                name:i,
                data:_datas[i]
              });
            }
          }
      }
      var chart_ctx = document.getElementById('main-'+key);
      if(chart_ctx){
        charts[key] = echarts.init(chart_ctx);
        charts[key].setOption(option);
        charts[key].on(echarts.config.EVENT.CLICK, function(node){
          var subdata = data.data[node.name];
          func.f_26_sub($('#sub-'+key),subdata,node.name)
        });
      }

      var subdata = data.data[category[0]];
      func.f_26_sub($('#sub-'+key),subdata,category[0]);
    },
    //联动
    f_26_sub:function(ctx,data,title){
      var option = {
        title: {text:title,x:'center'},
        tooltip:{
          trigger: 'item'
        },
          series:[]
      },category=[],_data=[],series=[];
      for(var i in data){
        if(i != "data"){
          category.push(i);
          _data.push(data[i].data);
          series.push({name:i,value:data[i].data});
        }
      }
      if(series.length == 0){
        ctx.html('暂无数据');
        return false;
      }
      if(series.length < 10){
        option.tooltip =  {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          };
        option.series.push({
            type:"pie",
            name:data.name,
            radius:"55%",
            center:['50%', '60%'],
            data:series,
            itemStyle: {
                  normal:{
                    label:{
                      formatter: "{b} : {c} ({d}%)"
                    }
                  }
                }
          });
      }else{
        option.xAxis = [
              {
                  type : 'category',
                  data : category,
                  axisLabel:{
                    rotate:-40
                  }
              }
          ];
          option.grid = {x:40,x2:10};
          option.yAxis = [
              {
                  type : 'value'
              }
          ];
          option.series.push({
            type:"bar",
            data:_data
          });
      }
      var chart_ctx = document.getElementById(ctx.attr('id'));
      var key = ctx.data('key');
      if(chart_ctx){
        charts[key] = echarts.init(chart_ctx);
        charts[key].setOption(option);
      }
    },
    f_23:function(ctx,data){
      var series = [], category=[], _data = [];
      for(var i in data.data){
        category.push(data.data[i].name);
        _data.push(data.data[i].data);
        series.push({name:data.data[i].name||"其他", value:data.data[i].data});
      }
      var option = {
        title: {text:data.name,x:'center'},
        tooltip: {
              trigger: 'item'
          },
          series:[]
      };
      if(series.length == 0){
        ctx.html('暂无数据');
        return false;
      }
      if(series.length < 10){
        option.tooltip.formatter = "{a} <br/>{b} : {c} ({d}%)";
        option.series.push({
            type:"pie",
            name:data.name,
            radius:"55%",
            center:['50%', '60%'],
            data:series,
            itemStyle: {
                  normal:{
                    label:{
                      formatter: "{b} : {c} ({d}%)"
                    }
                  }
                }
          });
      }else{
        option.xAxis = [
              {
                  type : 'category',
                  data : category,
                  axisLabel:{
                    rotate:-20
                  }
              }
          ];
          option.yAxis = [
              {
                  type : 'value'
              }
          ];
          option.series.push({
            type:"bar",
            data:_data
          });
      }
      var chart_ctx = document.getElementById(ctx.attr('id'));
      var key = ctx.data('key');
      if(chart_ctx){
        charts[key] = echarts.init(chart_ctx);
        charts[key].setOption(option);
      }
    },
    f_24:function(ctx,data){
      var ret = {}, keys = [],category = [],_data = [], series = [], key = ctx.data('key');
      for(var i in data.data){
        keys.push(i);
        category.push(data.data[i].name||"其他");
        var value = data.data[i].data;
        _data.push(value);
        series.push({name:data.data[i].name||"其他",value:value,meta:i});
      }
      if(series.length == 0){
        ctx.html('暂无数据');
        return false;
      }
      ctx.html('<div class="main col-xs-6" id="main-'+key+'"></div><div class="sub col-xs-6" id="sub-'+key+'"></div>');

      var option = {
        title: {text:data.name,x:'center'},
        tooltip:{
          trigger: 'item'
        },
          series:[]
      };
      if(series.length < 10){
        option.tooltip =  {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          };
        option.series.push({
            type:"pie",
            name:data.name,
            radius:"55%",
            center:['50%', '60%'],
            data:series,
            itemStyle: {
                  normal:{
                    label:{
                      formatter: "{b} : {c} ({d}%)"
                    }
                  }
                }
          });
      }else{
        option.xAxis = [
              {
                  type : 'category',
                  data : category,
                  axisLabel:{
                    rotate:-40
                  }
              }
          ];
          option.grid = {x:40,x2:10};
          option.yAxis = [
              {
                  type : 'value'
              }
          ];
          option.series.push({
            type:"bar",
            data:_data
          });
      }
      var chart_ctx = document.getElementById('main-'+key);
      if(chart_ctx){
        charts[key] = echarts.init(chart_ctx);
        charts[key].setOption(option);
        charts[key].on(echarts.config.EVENT.CLICK, function(node){
          var subdata = data.data[node.data.meta];
          func.f_24_sub($('#sub-'+key),subdata,node.name)
        });
      }

      var subdata = data.data[keys[0]];
      func.f_24_sub($('#sub-'+key),subdata,category[0]);
    
    },
    f_24_sub:function(ctx,data,title){
      var option = {
        title: {text:title,x:'center'},
        tooltip:{
          trigger: 'item'
        },
          series:[]
      },category=[],_data=[],series=[];
      for(var i in data){
        if(i != "data"){
          category.push(data[i].name);
          _data.push(data[i].data);
          series.push({name:data[i].name||"其他",value:data[i].data});
        }
      }
      if(series.length == 0){
        ctx.html('暂无数据');
        return false;
      }
      if(series.length < 10){
        option.tooltip =  {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          };
        option.series.push({
            type:"pie",
            name:data.name,
            radius:"55%",
            center:['50%', '60%'],
            data:series,
            itemStyle: {
                  normal:{
                    label:{
                      formatter: "{b} : {c} ({d}%)"
                    }
                  }
                }
          });
      }else{
        option.xAxis = [
              {
                  type : 'category',
                  data : category,
                  axisLabel:{
                    rotate:-40
                  }
              }
          ];
          option.grid = {x:40,x2:10};
          option.yAxis = [
              {
                  type : 'value'
              }
          ];
          option.series.push({
            type:"bar",
            data:_data
          });
      }
      var chart_ctx = document.getElementById(ctx.attr('id'));
      var key = ctx.data('key');
      if(chart_ctx){
        charts[key] = echarts.init(chart_ctx);
        charts[key].setOption(option);
      }
    },
    //时间，年，月，日，星期，时
    f_31:function(ctx,data){
      $("#header_31").clone().show().appendTo(ctx);
      ctx.append('<div class="chart-item-container" id="'+ctx.attr('id')+'_chart"></div>');
      func.f_time(ctx,data);
    },
    f_32:function(ctx,data){
      $("#header_32").clone().show().appendTo(ctx);
      ctx.append('<div class="chart-item-container" id="'+ctx.attr('id')+'_chart"></div>');
      func.f_time(ctx,data);
    },
    //时间
    f_time:function(ctx,data){
      ctx.data('status','load');
      var cate_map = {
        month:[1,2,3,4,5,6,7,8,9,10,11,12],
        date:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        week:["周日","周一","周二","周三","周四","周五","周六"],
        hour:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      };
      var unit= {month:"月",date:"日",hour:'时'};
      var type = ctx.find('select').val();
      var seriesData = [];
      var option = {
        title: {text:data.name,x:'center'},
        tooltip:{
          trigger: 'item'
        },
        yAxis : [
              {
                  type : 'value'
              }
          ]
      };
      var series_type = "line";
      if(type != 'time'){
        series_type = 'bar';
        option.xAxis = option.xAxis || [{}];
        option.xAxis[0].type = 'category';
        var data_map = {year:{},month:{},date:{},week:{},hour:{}};
        for(var i in data.data){
          var cdate = new Date(i*1000);
          var _y = cdate.getFullYear();
          var _m = cdate.getMonth()+1;
          var _w = cdate.getDay();
          var _d = cdate.getDate();
          var _h = cdate.getHours();
          if(!data_map.year[_y])data_map.year[_y] = 0;
          data_map.year[_y] += data.data[i];

          if(!data_map.month[_m])data_map.month[_m] = 0;
          data_map.month[_m] += data.data[i];

          if(!data_map.date[_d])data_map.date[_d] = 0;
          data_map.date[_d] += data.data[i];

          if(!data_map.week[_w])data_map.week[_w] = 0;
          data_map.week[_w] += data.data[i];

          if(!data_map.hour[_h])data_map.hour[_h] = 0;
          data_map.hour[_h] += data.data[i];
        }
        var cate = [];
        if(type == "year"){
          for(var i in data_map.year){
            cate.push(i-0);
          }
          cate = cate.sort();
          seriesData = cate.map(function(item){
            return data_map.year[item];
          });
        }else{
          seriesData = cate_map[type].map(function(item,i){
            if(type == 'week'){
              cate.push(item);
              return data_map[type][i]||0;
            }else{
              cate.push(item+unit[type]);
              return data_map[type][item]||0;
            }
            return 0;
          });
        }
        option.xAxis[0].data = cate;
      }else{
        option.xAxis = option.xAxis || [{}];
        option.xAxis[0].type = 'time';
        option.xAxis[0].splitNumber = 10;
        for(var i in data.data){
          seriesData.push([i*1000,data.data[i]]);
        }
        var format = 'Y-M-D';
        if(data.type == 32){
          format = 'Y-M-D H:I:S';
        }
        option.tooltip.formatter = function(params){
          return (new Date(params.name)).format(format)+'<br>'+params.seriesName + ":" + params.value[1];
        }
      }
      var chart_ctx = ctx.find('.chart-item-container');
      option.series = [{
            name:"数量",
            type:series_type||"line",
            showAllSymbol: true,
            data:seriesData
          }];
      var key = ctx.data('key');
      var chart_ctx = document.getElementById(ctx.find('.chart-item-container').attr('id'));
      if(chart_ctx){
        charts[key] = echarts.init(chart_ctx);
        charts[key].setOption(option);
      }
    }
  };
  var type_map = {
    '4':21,
    '5':21,
    '22':26
  };
  function renderChart(ctx, key){
    if(ctx.data('status') == "load")return false;
    ctx.data('status','load');
    var data = DATA[key];
    console.log(data);
    if(func["f_"+data.type]){
      var option = func["f_"+(type_map[data.type]||data.type)](ctx,data);
    }
  }
  // var date = require('date');
  // date();

  charts_container.on('change','select', function(){
    var ctx = $(this).closest('.chart-item'), key = ctx.data('key');
    ctx.data('status','reload');
    func.f_time(ctx, DATA[key]);
    window.onscroll();
  });
  setTimeout(function(){window.onscroll();},50);
})();
