import type { Plugin } from '@nuxt/types';
import {
  now,
  formatDate,
  formatDateTime,
  formatTime,
  truncate,
  formatNumber,
  implode,
  linkify
} from '@/utils/filter';
import { DATA_ENABLE } from '@/configs';
import { IIdToken } from '@/types';

type decodeJwt = () => IIdToken | null;
type formatDate = (value: string | null, format: string) => string;
type formatDateTime = (value: string | null, format: string) => string;
type formatTime = (value: string | null, format: string) => string;
type truncate = (
  value: string | null,
  specified_length?: any,
  specified_omission?: string
) => string;
type formatNumber = (value: string | null) => string;
type implode = (value: string | null) => string;
type DATA_ENABLE = { value: number; text: string }[];

type fileBaseUrl = string;
type environment = string;

// javascript内で使うときは定義する
declare module '@nuxt/types' {
  interface Context {
    $decodeJwt: decodeJwt;
    $formatDate: formatDate;
    $formatDateTime: formatDateTime;
    $formatTime: formatTime;
    $truncate: truncate;
    $formatNumber: formatNumber;
    $implode: implode;
    $DATA_ENABLE: DATA_ENABLE;
    $fileBaseUrl: fileBaseUrl;
    $environment: environment;
  }
}

const fillterPlugin: Plugin = (_context, inject) => {
  inject('now', now);
  inject('formatDateTime', formatDateTime);
  inject('formatDate', formatDate);
  inject('formatTime', formatTime);
  inject('truncate', truncate);
  inject('formatNumber', formatNumber);
  inject('implode', implode);
  inject('linkify', linkify);
  inject('DATA_ENABLE', DATA_ENABLE);
  inject('fileBaseUrl', process.env.BAM_BASE_URL);
  inject('environment', process.env.NAME);
};

export default fillterPlugin;
