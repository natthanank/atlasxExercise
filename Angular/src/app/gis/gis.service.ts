import { Injectable } from '@angular/core';

import { EsriConfigService } from './services/esri-config.service';
import { GeometryUtilService } from './services/geometry-util.service';
import { ProjectionUtilService } from './services/projection-util.service';

@Injectable()
export class GisService {

  /**
   * Provide global map object(version 3).
   * @returns `esri/map`
   */
  public map: any;

  constructor(
    protected readonly esriConfig: EsriConfigService,

    /**
     * Tool for converting between STGeometry and Geometry.
     */
    public geometryUtil: GeometryUtilService,

    /**
     * Tool for converting the coordinate system.
     */
    public projectionUtil: ProjectionUtilService
  ) { }

}
