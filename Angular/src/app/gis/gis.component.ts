import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { loadModules } from 'esri-loader';

import { GisService } from './gis.service';
import { dojoConfig } from './config/dojo';

import { AppService } from '../app-base/app.service';
import { STRING_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-gis',
  templateUrl: './gis.component.html',
  styleUrls: ['./gis.component.scss']
})
export class GisComponent implements OnInit {

  @ViewChild('eleMap') eleMap: ElementRef;
  latitude: number = 0;
  longitude: number = 0;
  markerSymbol;
  graphic;
  point;
  resultList;
  featureLayer;
  polygon;
  fillSymbol;

  constructor(private gisService: GisService) { }

  ngOnInit() {
    const options = {
      dojoConfig: dojoConfig
    };
    console.log("edited");
    loadModules(['esri/map', 'esri/layers/ArcGISDynamicMapServiceLayer',
                'esri/graphic', 'esri/symbols/SimpleMarkerSymbol',
                'esri/Color', 'esri/geometry/Point',
                'esri/layers/FeatureLayer', 'esri/tasks/query',
                'esri/tasks/QueryTask', 'esri/urlUtils', 'esri/config',
                'esri/geometry/Polygon', 'esri/symbols/SimpleFillSymbol'
              ], options)
      .then(([Map, ArcGISDynamicMapServiceLayer,
            Graphic, SimpleMarkerSymbol,
            Color, Point,
            FeatureLayer, Query,
            QueryTask, UrlUtils, esriConfig, Polygon,
            SimpleFillSymbol]) => {
              
              UrlUtils.addProxyRule({
                proxyUrl: esriConfig.defaults.io.proxyUrl,
                urlPrefix: 'https://sampleserver1.arcgisonline.com'
              });
        // you can now create a new FlareClusterLayer and add it to a new Map
        this.gisService.map = new Map(this.eleMap.nativeElement, {
          center: [-118, 34.5],
          zoom: 5,
          basemap: 'topo'
        });
        let dynamicLayerUrl = new ArcGISDynamicMapServiceLayer("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer", {
          "id": "censusLayer",
          "opacity": 0.75
        });
        this.featureLayer = new FeatureLayer("https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/5");
        this.gisService.map.addLayer(dynamicLayerUrl);
        this.gisService.map.addLayer(this.featureLayer);
        this.gisService.map.on('click', this.onMapClick);
        this.markerSymbol = new SimpleMarkerSymbol();
        this.markerSymbol.setColor(new Color("#00FFFF"));
        this.markerSymbol.setSize("10");
        this.graphic = new Graphic();
        this.point = new Point();
        this.resultList = [];
        this.polygon = new Polygon();
        this.fillSymbol = new SimpleFillSymbol();
        this.markerSymbol.setColor(new Color("#00FFFF"));


        // query
        let queryTask = new QueryTask("https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/5");

        let query = new Query();
        query.returnGeometry = true;
        query.outFields = [
          "SUB_REGION", "STATE_NAME", "STATE_ABBR",
        ];
        query.where = "1=1";
        queryTask.execute(query, (results) => {
          let resultCount = results.features.length;
          for (let i = 0; i < resultCount; i++) {
            let featureAttributes = results.features[i].attributes;
            const result = [];
            for (let attr in featureAttributes) {
              result.push(featureAttributes[attr]);
            }
            result.push(results.features[i].geometry);
            this.resultList.push(result);
        }});
      })
      .catch(err => {
        // handle any errors
        console.error(err);
      });
  }

  onMapLoad(map) {
    console.log(map);
  }

  onMapClick(event) {
    console.log(event.offsetX);
    console.log(event.offsetY);
  }

  getLaLong(latitude: number, longitude: number) {
    this.point.setLatitude(latitude);
    this.point.setLongitude(longitude);
    this.gisService.map.centerAndZoom(this.point, 12);
    this.graphic.setGeometry(this.point);
    this.graphic.setSymbol(this.markerSymbol);
    this.gisService.map.graphics.add(this.graphic);
  }

  onRowClick(index: number) {
    for (let i = 0; i < this.polygon.rings.length; i++) {
      console.log(i);
      this.polygon.removeRing(i);
    }
    this.resultList[index][3].rings.forEach(ring => {
      this.polygon.addRing(ring);
    });
    this.gisService.map.centerAndZoom(this.polygon.getCentroid(), 9);
    this.graphic.setGeometry(this.polygon);
    this.graphic.setSymbol(this.fillSymbol);
    this.gisService.map.graphics.add(this.graphic);
  }

  trackByFn(index, item) {
    return index;
  }

}
