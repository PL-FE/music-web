declare type resourceType = 'PLAYLIST' | 'ALBUM' | 'SONG';

interface loginTypes {
  phone: string;
  password?: string;
  md5_password?: string;
  captcha?: string | number;
  countrycode?: string | number;
}

// 艺术家
declare type artistTypes = {
  name: string;
  id: number;
  img1v1Url: string;
  picUrl: string;
  briefDesc: string;
  cover: string;
};

// 歌曲详情
declare type songTypes = {
  album: albumTypes;
  artist: artistTypes;
  artists: artistTypes[];
  id: number;
  name: string;
  mp3Url: string; // mp3
  duration: number; // 时长
  resourceType: resourceType;
  resource: {
    albumId?: number;
    playListId?: number;
  };
};

// 歌单
declare type playListTypes = {
  picUrl?: string; // 小封面
  name: string;
  id: number;
  createTime: number;
  updateTime: number;
  creator: {
    nickname: string;
    userId: number;
  };
  songs?: songTypes[];
  // 详情
  coverImgUrl?: string;
  description?: string;
  trackIds?: object[];
  resourceType: resourceType;
};
// 专辑
declare type albumTypes = {
  artist: artistTypes;
  artists: artistTypes[];
  picUrl: string;
  blurPicUrl: string;
  name: string;
  id: number;
  description: string;
  publishTime: number;
  resourceType: resourceType;
};

// 最近播放
declare type recentType = {
  data: albumTypes | playListTypes | songTypes;
  playTime: number;
  resourceId: string;
  resourceType: resourceType;
};

declare module 'js-md5';
declare module '@element-plus/icons-vue';
