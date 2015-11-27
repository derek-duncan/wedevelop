import path from 'path';
import views from 'co-views';

export default function render(path) {
  return views(path, {
    map: {
      jade: 'jade'
    },
    default: 'jade'
  });
}
