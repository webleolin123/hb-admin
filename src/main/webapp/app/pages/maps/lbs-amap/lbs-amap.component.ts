import { Component,OnInit,OnDestroy} from '@angular/core';
// 测试1
// import {MyHttpService} from "../../../common/http/myHttp.service";
// import {ApproverCommonInfo} from "../../../common/http/approve-common.model";
// import {HttpResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import * as $ from 'jquery';
declare var  AMap: any; // 一定要声明AMap，要不然报错找不到AMap
declare var  AMapUI: any; // 一定要声明AMapUI，要不然报错找不到AMapUI
@Component({
  selector: 'ngx-lbs-amap',
  styleUrls: ['./lbs-amap.component.scss'],
  templateUrl: './lbs-amap.component.html',
})
export class LbsAmapComponent implements OnInit,OnDestroy{
    map:any;//创建的实例图
    markerList:any;//标注列表
    data:any=[];//返回数据 对象数组
    $:any;//JQ使用
    template:any;//AMapUI中要渲染的模板
    subs:Subscription;//广播使用
    // 测试1
    dataArr:any = [
        {
            id: 'A',
            position: "116.020764, 39.904989",
            label: 'label_1'
        },
        {
            id: 'B',
            position: "116.405285, 39.904989",
            label: 'label_2'
        },
        {
            id: 'C',
            position: "116.789806, 39.904989",
            label: 'label_3'
        }
    ];
  constructor(
      private eventManager: JhiEventManager,
      private alertService: JhiAlertService,
  // 测试1
      // private lbsMapService: MyHttpService,
      )
  {
  // 测试1
      // this.lbsMapService.resourceUrl_getMapData='http://127.0.0.1/testMap.php';
  // 本地数据 测试所用
  }
  ngOnInit() {
      // 测试1
      this.eventManager.broadcast({
          name: 'getMapData',
          content:this.dataArr,
      });
      this.loadData();
  }
  ngOnDestroy(){
      // this.subs.unsubscribe();
  }
  loadData(){
  //以下放在调用中使用
// 测试1
      // 获取当前请求页面所有数据
      // this.lbsMapService.getMapData().subscribe(
      //     (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
      //     (res: Response) => this.onError(res.json())
      // )
      this.subs=this.eventManager.subscribe('getMapData', response => {
          console.log('response',response);
          if(response.name=='getMapData'){
              this.onSuccess(response.content);
              console.log('response.content',response.content);
          }
          else{
              alert('something went wrong!');
          }
          this.subs.unsubscribe();
      } );
  }
  private onSuccess(data) {
    console.log('data',data);
    if(data){
        this.data=data;
        this.data.forEach((item,i)=>{
            this.data[i].position=this.data[i].position.split(',');
        });
        console.log('this.data',this.data);
        this.getMap();
    }
}
  private onError(error) {//没用到
        this.alertService.error(error.error, error.message, null);
    }
  useAMapUI(){  //所有使用AMapUI的内容
        AMapUI.loadUI(['misc/MarkerList', 'overlay/SvgMarker', 'overlay/SimpleInfoWindow'],
            (MarkerList, SvgMarker, SimpleInfoWindow)=>{
                if (!SvgMarker.supportSvg) {
                    //当前环境并不支持SVG，此时SvgMarker会回退到父类，即SimpleMarker
                    alert('当前环境不支持SVG');
                }
                this.markerList = new MarkerList({
                    //关联的map对象
                    map: this.map,
                    //列表的dom容器的id
                    listContainer: 'panel',
                    //需要监听的列表节点事件
                    listElementEvents: ['click', 'mouseenter', 'mouseleave'],
                    //需要监听的marker事件
                    markerEvents: ['click', 'mouseover', 'mouseout'],
                    //需要监听的infoWindow事件
                    infoWindowEvents: ['click', 'mouseover', 'mouseout'],
                    //返回数据项的Id
                    getDataId(dataItem, index) {
                        //index表示该数据项在数组中的索引位置，从0开始，如果确实没有id，可以返回index代替
                        // return index;
                        return dataItem.id;
                    },
                    //返回数据项的位置信息，需要是AMap.LngLat实例，或者是经纬度数组，比如[116.789806, 39.904989]
                    getPosition(dataItem){
                        return dataItem.position;
                    },
                    //返回数据项对应的Marker
                    getMarker(dataItem, context, recycledMarker){
                        const label = dataItem.id;
                        //存在可回收利用的marker
                        if (recycledMarker) {
                            //直接更新内容返回
                            recycledMarker.setIconLabel(label);
                            return recycledMarker;
                        }
                        //返回一个新的Marker
                        return new SvgMarker(
                            new SvgMarker.Shape.SquarePin({
                                height: 60,
                                strokeWidth: 1,
                                strokeColor: '#ccc',
                                fillColor:'#3296fa'
                            }), {
                                iconLabel: label,
                                containerClassNames: 'my-svg-marker',
                                showPositionPoint: true
                            })
                    },
                    //返回数据项对应的列表节点
                    getListElement(dataItem, context, recycledListElement){
                        const tpl = '<p><%- dataItem.id %>：<%- dataItem.label %>';
                        const content = MarkerList.utils.template(tpl, {
                            dataItem: dataItem,
                            dataIndex: context.index
                        });
                        if (recycledListElement) {
                            //存在可回收利用的listElement, 直接更新内容返回
                            recycledListElement.innerHTML = content;
                            return recycledListElement;
                        }
                        //返回一段html，MarkerList将利用此html构建一个新的dom节点
                        return '<li style=" border-bottom: 1px solid #dadada;padding: 10px;">' + content + '</li>';
                    },
                    getInfoWindow(dataItem, context, recycledInfoWindow) {
                        if (recycledInfoWindow) {
                            //存在可回收利用的infoWindow, 直接更新内容返回
                            recycledInfoWindow.setInfoTitle(dataItem.title);
                            recycledInfoWindow.setInfoBody(dataItem.label);
                            return recycledInfoWindow;
                        }
                        //返回一个新的InfoWindow
                        return new SimpleInfoWindow({
                            offset: new AMap.Pixel(0, -57),
                            infoTitle: dataItem.id,
                            infoBody: dataItem.label
                        });
                    }
                });
                this.markerList.on('listElementClick listElementMouseenter listElementMouseleave ' +
                    'markerClick markerMouseover markerMouseout ' +
                    'infoWindowClick infoWindowMouseover infoWindowMouseout',
                    (event, record)=>{
                        this.$ = MarkerList.utils.$,
                            this.template = MarkerList.utils.template;
                        $('#eventInfo').html(this.template('<%- record.id%>: <%- record.data.label %>',{
                            event: event,
                            record: record
                        }));
                    });
                //监听选中改变
                this.markerList.on('selectedChanged', (event, info)=>{
                    console.log(event, info);
                });
                //展示该数据
                this.markerList.render(this.data);
            });
    }
  useAMap(){ //所有使用AMap的内容
      //创建地图
      this.map = new AMap.Map('container', {
          resizeEnable:true,
          zoom: 4,
          center:[119.296389,26.074268],
      });
      //添加工具条等地图控件
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView', 'AMap.MapType', 'AMap.Geolocation'],
      ()=> {
              // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
              this.map.addControl(new AMap.ToolBar());
              // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
              this.map.addControl(new AMap.Scale());
              // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
              this.map.addControl(new AMap.OverView({isOpen:true}));
              // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
              this.map.addControl(new AMap.MapType());
              // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
              this.map.addControl(new AMap.Geolocation({buttonOffset:new AMap.Pixel(10, 80)}));
              // map.removeControl(toolBar);//删除控件
          });
      //判断AMapUI并引入
      if (typeof(AMapUI) == "undefined") {
          $.getScript("https://webapi.amap.com/ui/1.0/main.js?v=1.0.11").done((script, textstatus)=>{
              console.log('script',script);
              console.log('textstatus',textstatus);
              if (textstatus == "success" && typeof (AMap) != undefined) {
                  this.useAMapUI();
              }
              else {
                  alert("网络超时，请重试");
              }
          });
      }
      else {
          //所有使用AMapUI的内容
          this.useAMapUI();
      }
 }
  getMap(){
      //判断AMap并引入
      if (typeof(AMap) == "undefined") {
          $.getScript("https://webapi.amap.com/maps?v=1.4.12" +
              "&key=0865ac92769573a25a285f6354a5c28b" +
              "&plugin=AMap.Geolocation,AMap.MapType,AMap.Scale,AMap.OverView,AMap.ToolBar,AMap.Autocomplete,AMap.PlaceSearch").done((script, textstatus)=>{
              if (textstatus == "success" && typeof (AMap) != undefined) {
                  this.useAMap();
              } else {
                  alert("网络超时，请重试");
              }
          });
      }else {
          this.useAMap();
      }
  }
}

