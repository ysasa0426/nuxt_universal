import dayjs from 'dayjs';

import 'dayjs/locale/ja';

dayjs.locale('ja');

// eslint-disable-next-line
export default ({ app }, inject) => {
  inject('dayjs', string => dayjs(string));
};
