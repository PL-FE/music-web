import http from './index';

// 获取推荐新音乐
export function getNewsong(limit: number) {
  return http
    .get(`/personalized/newsong`, {
      params: {
        limit,
      },
    })
    .then((res: any) => {
      // 标准详细版
      return res.map((item: any) => {
        return {
          item,
          ...item.song,
        };
      });
    })
    .then((res: any) => {
      res.forEach((it: songTypes) => {
        it.resourceType = 'SONG';
      });
      return res;
    });
}

// 获取歌手热门50首
export function getArtistTopSong(id: number) {
  return http
    .get(`/artist/top/song`, {
      params: {
        id,
      },
    })
    .then((res: any) => {
      return formatSongData(res.songs);
    });
}

// 获取歌曲详情
export async function getSongDetail(ids: string) {
  return http
    .get(`song/detail`, {
      params: {
        ids,
      },
    })
    .then((res: any) => {
      return formatSongData(res.songs);
    });
}
//新歌速递,完整的返回，不需要格式化
export async function queryTopNewSong(type = 0) {
  return http
    .get(`/top/song`, {
      params: {
        type,
      },
    })
    .then((res: any) => {
      res.forEach((it: songTypes) => {
        it.resourceType = 'SONG';
      });
      return res;
    });
}

// 获取相似歌曲
export function getSimiSong(id: number) {
  return http
    .get(`/simi/song`, {
      params: {
        id,
      },
    })
    .then((res: any) => {
      res.songs.forEach((it: songTypes) => {
        it.resourceType = 'SONG';
      });
      return res;
    });
}

// 获取相似歌单根据歌曲ID
export function getSimiPlaylist(id: number) {
  return http.get(`/simi/playlist`, {
    params: {
      id,
    },
  });
}

// 获取用户歌单
export function queryUserPlaylist(uid: number) {
  return http.get(`/user/playlist`, {
    params: {
      uid,
    },
  });
}
// 喜欢的音乐列表
// TODO:TODO USE
export function queryLikelist(uid: number) {
  return http.get(`/likelist`, {
    params: {
      uid,
    },
  });
}
// 每日推荐的歌曲
export function recommendSongs() {
  return http.get(`/recommend/songs`).then((res: any) => {
    return formatSongData(res.dailySongs);
  });
}

// 获取最近播放歌曲 前100
export function queryRecordRecentSong(limit?: number) {
  return http
    .get(`/record/recent/song`, {
      params: {
        limit,
      },
    })
    .then((res: any) => {
      const list = res.list.map((it: any) => {
        it.data = formatSongData([it.data])[0];
        return it;
      });

      return list;
    });
}
// 获取最近播放歌单
export function queryRecordRecentPlaylist(limit?: number) {
  return http
    .get(`/record/recent/playlist`, {
      params: {
        limit,
      },
    })
    .then((res: any) => {
      res.list.forEach((it: any) => {
        it.data.resourceType = 'PLAYLIST';
      });
      return res.list;
    });
}
// 获取最近播放专辑
export function queryRecordRecentAlbum(limit?: number) {
  return http
    .get(`/record/recent/album`, {
      params: {
        limit,
      },
    })
    .then((res: any) => {
      res.list.forEach((it: any) => {
        it.data.resourceType = 'ALBUM';
      });
      return res.list;
    });
}
// 获取关注的歌手
export function queryArtistSublist() {
  return http.get(`/artist/sublist`).then((res: any) => {
    return res;
  });
}

// 热门歌单
export function getTopPlaylist({ index = 1, order = 'hot', cat = '全部' }) {
  const offset = (index - 1) * 30;
  const limit = 30;
  return http
    .get(`/top/playlist`, {
      params: {
        order,
        offset,
        limit,
        cat,
      },
    })
    .then((res: any) => {
      res.playlists.forEach((it: albumTypes) => {
        it.resourceType = 'PLAYLIST';
      });
      return res;
    });
}

// 每日推荐的歌单
export function recommendResource() {
  return http.get(`/recommend/resource`).then((res: any) => {
    res.recommend.forEach((it: albumTypes) => {
      it.resourceType = 'PLAYLIST';
    });
    return res;
  });
}

// 获取歌单详情
export function getPlaylistDetail(id: number) {
  return http
    .get(`/playlist/detail`, {
      params: {
        id,
      },
    })
    .then((res: any) => {
      const playlist: playListTypes = formatPlayListData(res.playlist);
      res.playlist = playlist;
      res.playlist.songs.forEach((it: songTypes) => {
        it.resourceType = 'SONG';
      });
      return res;
    });
}

// 专辑------------

// 获取专辑详情
export function getAlbum(id: number) {
  return http
    .get(`/album`, {
      params: {
        id,
      },
    })
    .then((res: any) => {
      const songs: songTypes[] = formatSongData(res.songs, { albumId: id });
      const album: albumTypes = res.album;
      album.resourceType = 'ALBUM';
      return {
        songs,
        album,
      };
    });
}

// 获取全部新专辑
export function getAlbumNew({ index = 1 }) {
  const offset = (index - 1) * 30;
  const limit = 30;
  // 标准版返回
  return http
    .get(`/album/new`, {
      params: {
        offset,
        limit,
      },
    })
    .then((res: any) => {
      res.albums.forEach((it: albumTypes) => {
        it.resourceType = 'ALBUM';
      });
      return res;
    });
}
// 获取所有榜单，不是专辑，是榜单列表
export function getToplist() {
  return http.get(`/toplist`);
}
// 获取最新专辑
export function getAlbumNewest() {
  // 标准版返回
  return http.get(`/album/newest`).then((res: any) => {
    res.albums.forEach((it: albumTypes) => {
      it.resourceType = 'ALBUM';
    });
    return res;
  });
}

// 获取歌手专辑
export function getartistAlbum(id: number) {
  // 标准版返回
  return http
    .get(`/artist/album`, {
      params: {
        id,
      },
    })
    .then((res: any) => {
      res.hotAlbums.forEach((it: albumTypes) => {
        it.resourceType = 'ALBUM';
      });
      return res;
    });
}
// 获取用户收藏的专辑
export function queryAlbumSublist() {
  // 标准版返回
  return http.get(`/album/sublist`).then((res: any) => {
    res.forEach((it: albumTypes) => {
      it.resourceType = 'ALBUM';
    });
    return res;
  });
}

// 获取相似歌手
export function getSimiArtist(id: number) {
  // 标准版返回
  return http.get(`/simi/artist`, {
    params: {
      id,
    },
  });
}
// 获取歌手详情
export function getArtistDetail(id: number) {
  return http
    .get(`/artist/detail`, {
      params: {
        id,
      },
    })
    .then((res: any) => {
      const artist: artistTypes = {
        ...res.artist,
        picUrl: res.cover,
      };
      res.artist = artist;
      return res;
    });
}
// 热门歌手
export function getTopArtists(params = {}) {
  return http.get(`/top/artists`, params);
}

// 获取歌曲标签心情与流派
export function getPlaylistCatlist() {
  return http.get(`/playlist/catlist`);
}

// 获取音乐URL
export function getSongUrl(id: string) {
  return http.get(`song/url`, {
    params: {
      id,
    },
  });
}
// 获取音乐url
export function getSongDounloadUrl(id: number) {
  return http.get(`/song/download/url`, {
    params: {
      id,
      br: 320000,
    },
  });
}

// 获取歌词
export function getLyric(id: number) {
  return http.get(`/lyric`, {
    params: {
      id,
    },
  });
}

function formatPlayListData(playList: any) {
  const _playList: playListTypes = {
    ...playList,
    picUrl: playList.coverImgUrl,
    name: playList.name,
    id: playList.id,
    description: playList.description,
    createTime: playList.createTime,
    updateTime: playList.updateTime,
    creator: {
      ...playList.creator,
      nickname: playList.creator.nickname,
      userId: playList.creator.userId,
    },
    songs: formatSongData(playList.tracks, { playListId: playList.id }),
    resourceType: 'PLAYLIST',
  };
  return _playList;
}
function formatSongData(songs: any, resource = {}) {
  const list = songs.map((song: any) => {
    const data: songTypes = {
      album: song.al,
      artist: song.ar && song.ar[0],
      artists: song.ar,
      id: song.id,
      name: song.name,
      mp3Url: '', // mp3
      duration: song.dt, // 时长
      resourceType: 'SONG',
      resource,
    };
    return data;
  });
  return list;
}

// 搜索建议
export function searchSuggest(keywords: string) {
  return http.get(`/search/suggest`, {
    params: {
      keywords,
    },
  });
}
