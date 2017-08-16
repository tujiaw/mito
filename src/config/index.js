export const ANTI_LEECH = ''//'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='
export const DOWNLOAD_URL = 'http://api.3inns.cn/api/download_images'
export const NEW_IMAGE_HOST = 'http://api.3inns.cn/mito'

const dirname = 'uploadImages'
export function getNewImageUrl(url) {
  const pos = url.indexOf(dirname)
  if (pos > 0) {
    return NEW_IMAGE_HOST + '/' + url.substr(pos)
  }
  return url
}