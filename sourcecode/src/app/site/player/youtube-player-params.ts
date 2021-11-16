export const YOUTUBE_PLAYER_PARAMS = {
    controls: 1,
    iv_load_policy: 3,
    modestbranding: 1,
    rel: 0,
    showinfo: 0,
};

export function youtubePlayerUrlParams(autoPlay = true) {
    let params = '?';
    Object.keys(YOUTUBE_PLAYER_PARAMS).forEach((key, index) => {
        params += key + '=' + YOUTUBE_PLAYER_PARAMS[key];
        if (Object.keys(YOUTUBE_PLAYER_PARAMS).length - 1 !== index) {
            params += '&';
        }
    });

    if (autoPlay) {
        params += '&autoplay=1';
    }

    return params;
}
