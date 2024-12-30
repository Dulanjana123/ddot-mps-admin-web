import ActionButton from '@arcgis/core/support/actions/ActionButton';
import PopTemplate from '@arcgis/core/PopupTemplate';

export type MarkerInfo = {
  title: string
  content: string | Function | Promise<any> | __esri.ContentProperties[] | undefined
  actions?: ActionButton[]
}

const CommonMarkerPopupTemplate = ({ title, content, actions }: MarkerInfo): PopTemplate => {
  return new PopTemplate({
    title: title,
    content: content,
    actions: actions,
  });
}

export default CommonMarkerPopupTemplate;
