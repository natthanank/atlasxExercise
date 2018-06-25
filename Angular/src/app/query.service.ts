import { Injectable } from '@angular/core';
import { GisService } from './gis/gis.service';
import { loadModules } from 'esri-loader';
import { dojoConfig } from './gis/config/dojo';


@Injectable()
export class QueryService {

  resultList = [];

  constructor(private gisService: GisService) { }

  query(): Array<Array<string>> {
    const options = {
      dojoConfig: dojoConfig
    };
    loadModules([
      'esri/tasks/query',
      'esri/tasks/QueryTask'
    ], options).then(([
      Query,
      QueryTask
    ]) => {
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
    return this.resultList;
  }

}
