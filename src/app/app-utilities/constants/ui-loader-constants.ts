import { NgxUiLoaderModule,
    NgxUiLoaderConfig,
    SPINNER,
    POSITION,
    PB_DIRECTION } from 'ngx-ui-loader';

export const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    fgsColor: 'red',
    fgsPosition: POSITION.centerCenter,
    fgsSize: 40,
    fgsType: SPINNER.chasingDots, 
    pbDirection: PB_DIRECTION.leftToRight, 
    pbThickness: 5 
  }