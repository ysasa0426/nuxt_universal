import dayjs from 'dayjs';
import { StringKeyObject } from '@/types';

/**
 * 各種文字列加工を行うユーティリティ郡
 * @module utils/filter
 */

export const now = (format: string): string => {
  const value = dayjs().format();

  if (typeof format !== 'string') {
    format = 'YYYY-MM-DD HH:mm';
  }
  return dayjs(value).format(format);
};

/**
 * 日付のフォーマット
 *
 * @param {(string | null)} value 対象の文字列
 * @param {string} [format] フォーマット指定
 * @returns {string} フォーマットされた文字列
 */
export const formatDate = (value: string | null, format?: string): string => {
  if (value == null || value === '') {
    return '';
  }
  if (typeof format !== 'string') {
    format = 'YYYY-MM-DD';
  }
  return dayjs(value).format(format);
};

/**
 * 日時のフォーマット
 *
 * @param {(string | null)} value 対象の文字列
 * @param {string} [format] フォーマット指定
 * @returns {string} フォーマットされた文字列
 */
export const formatDateTime = (
  value: string | null,
  format?: string
): string => {
  if (value == null || value === '') {
    return '';
  }
  if (typeof format !== 'string') {
    format = 'YYYY-MM-DD HH:mm';
  }
  return dayjs(value).format(format);
};

/**
 * 時間のフォーマット
 *
 * @param {(string | null)} value 対象の文字列
 * @param {string} [format] フォーマット指定
 * @returns {string} フォーマットされた文字列
 */
export const formatTime = (value: string | null, format?: string): string => {
  if (value == null || value === '') {
    return '';
  }
  if (typeof format !== 'string') {
    format = 'HH:mm';
  }
  return dayjs(value).format(format);
};

/**
 * 文字列の長さ加工
 *
 * @param {any} value 対象文字列
 * @param {number} [specified_length] 返却する文字数
 * @param {string} [specified_omission] Suffix文字列
 * @returns {string} フォーマットされた文字列
 */
export const truncate = (
  // eslint-disable-next-line
  value: any,
  // eslint-disable-next-line
  specified_length?: any,
  specified_omission?: string
): string => {
  const length = specified_length ? parseInt(specified_length, 10) : 20;
  const ommision = specified_omission ? specified_omission.toString() : '...';
  if (value === undefined || value === null) {
    value = '';
  }

  if (value.length <= length) {
    return value;
  }

  return value.substring(0, length) + ommision;
};

/**
 * 数値のフォーマット
 *
 * @param {(string | null)} value 対象の文字列
 * @returns {string} フォーマットされた文字列
 */
export const formatNumber = (value: string): string => {
  if (value === undefined || value === null) {
    value = '';
  }
  if (!value) {
    value = '0';
  }
  return Number(value).toLocaleString();
};

/**
 * 配列要素を文字列により連結した文字列を返す
 *
 * @param {*} value
 * @param {string} delimiter 結合する文字列
 * @return {*}  {string}
 */
export const implode = (value: string | null | []): any => {
  if (value === undefined || value === null) {
    return '';
  }

  let returnValue = value;

  if (Array.isArray(value)) {
    returnValue = value.join(', ');
  }

  return returnValue;
};

/**
 * 発言中の特殊記号をサニタイジングする
 *
 * @param {any | null | []} value 入力文字列
 * @return {*}  {string}
 */
export const formatChatRemark = (value: any | null | []): any => {
  if (value === undefined || value === null || value === '') {
    return '';
  }

  const entities: StringKeyObject = {
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
    '<': '&lt;',
    '>': '&gt;'
  };

  const regex = /((https?|ftp)(:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+))/g;
  const replacement = '<a target="_blank" class="replacement-link" href="$1">$1</a>';

  const quote_regex_start = /\[quote\]/g;
  const quote_regex_end = /\[\/quote\]/g;
  const quote_replacement_start = '<div class="quote">';
  const quote_replacement_end = '</div>';

  return (value || '')
    .replace(/[&'"<>]/g, (match: string) => entities[match])
    .replace(/\r?\n/g, '<br>')
    .replace(regex, replacement)
    .replace(/\[@[-a-z0-9]+\]/g, '<div style="display: inline-flex;"><span class="mention-badge">TO</span></div>')
    .replace(/\[RE:[-a-z0-9]+\]/g, '<div style="display: inline-flex;"><span class="reply-badge"><i class="fas fa-reply"></i>RE</span></div>')
    .replace(quote_regex_start, quote_replacement_start)
    .replace(quote_regex_end, quote_replacement_end);
};

/**
 * アイコン画像が指定されていない場合のアイコンのクラス名を指定して表示する
 * BA1.0では対応するクラスのスタイルがなさそう?
 *
 * @param {string} uniqueCode
 * @return {string}
 */
export const addClassRandomIcon = (uniqueCode: string, iconType: string): string => {
  if (uniqueCode || iconType || uniqueCode === '' || iconType === '') {
    return '';
  }

  const numUniqueCodeLength = uniqueCode.replace(/[^0-9]/g, '').length;
  const randomNum = numUniqueCodeLength % 3;

  switch (randomNum) {
    case 0:
      return 'random-' + iconType + '-icon-1';
    case 1:
      return 'random-' + iconType + '-icon-2';
    case 2:
      return 'random-' + iconType + '-icon-3';
    default:
      return '';
  }
};

/**
 * リンク文字列をhtmlリンクに変換
 *
 * @param {*} value 対象リンク文字列
 * @returns {string} 変換された文字列
 */
export const linkify = (value: string): string => {
  try {
    let replacedText;

    const replacePattern1 = /(\b(https?):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
    replacedText = value.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    const replacePattern2 = /(^|[^/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    const replacePattern3 = /(([a-zA-Z0-9\-_.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;
    return replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
  } catch (e) {
    return value;
  }
};
