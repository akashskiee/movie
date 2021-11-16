import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {Router} from '@angular/router';
import {finalize, tap} from 'rxjs/operators';
import {TitlesService} from '../../../titles.service';
import {
    AddCredit,
    AddImage,
    AddVideo,
    AttachTags,
    ChangeCreditOrder,
    ChangeImageOrder,
    ChangeVideosOrder,
    CreateEpisode,
    CreateSeason,
    DeleteEpisode,
    DeleteImage,
    DeleteSeason,
    DeleteVideo,
    DetachTag,
    HydrateTitle,
    LoadEpisodeCredits,
    LoadSelectOptions,
    RemoveCredit,
    ResetState, ToggleLoading,
    UpdateCredit,
    UpdateEpisode,
    UpdateVideo
} from './crupdate-title-actions';
import {Title, TitleCredit} from '../../../../../models/title';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import {VideoService} from '../../../../videos/video.service';
import {SeasonService} from '../panels/seasons-panel/season.service';
import {MEDIA_TYPE} from '../../../../media-type';
import {Episode} from '../../../../../models/episode';
import {ImagesService} from '../../../../shared/images.service';
import {Injectable} from '@angular/core';
import {LanguageListItem, ValueLists} from '../../../../../../common/core/services/value-lists.service';
import {Tag} from '../../../../../../common/core/types/models/Tag';
import {Toast} from '../../../../../../common/core/ui/toast.service';
import {ucFirst} from '../../../../../../common/core/utils/uc-first';

interface CrupdateTitleStateModel {
    title: Title;
    loading: boolean;
    selectOptions: {
        languages: LanguageListItem[],
    };
}

@State<CrupdateTitleStateModel>({
    name: 'crupdateTitle',
    defaults: {
        title: new Title(),
        loading: true,
        selectOptions: {
            languages: [],
        }
    },
})
@Injectable()
export class CrupdateTitleState {
    @Selector()
    static title(state: CrupdateTitleStateModel) {
        return state.title;
    }

    @Selector()
    static loading(state: CrupdateTitleStateModel) {
        return state.loading;
    }

    @Selector()
    static keywords(state: CrupdateTitleStateModel) {
        return state.title.keywords;
    }

    @Selector()
    static genres(state: CrupdateTitleStateModel) {
        return state.title.genres;
    }

    @Selector()
    static countries(state: CrupdateTitleStateModel) {
        return state.title.countries;
    }

    @Selector()
    static images(state: CrupdateTitleStateModel) {
        return state.title.images;
    }

    @Selector()
    static seasons(state: CrupdateTitleStateModel) {
        return state.title.seasons;
    }

    @Selector()
    static videos(state: CrupdateTitleStateModel) {
        return state.title.videos;
    }

    @Selector()
    static languageOptions(state: CrupdateTitleStateModel) {
        return state.selectOptions.languages;
    }

    constructor(
        private router: Router,
        private store: Store,
        private titles: TitlesService,
        private toast: Toast,
        private videos: VideoService,
        private images: ImagesService,
        private valueLists: ValueLists,
        private seasons: SeasonService,
    ) {}

    @Action(HydrateTitle)
    hydrateTitle(ctx: StateContext<CrupdateTitleStateModel>, action: HydrateTitle) {
        ctx.patchState({loading: false, title: action.title || new Title()});
    }

    @Action(LoadSelectOptions)
    loadSelectOptions(ctx: StateContext<CrupdateTitleStateModel>) {
        this.valueLists.get(['tmdb-languages']).subscribe(response => {
            ctx.patchState({
                selectOptions: {
                    languages: response['tmdb-languages'],
                }
            });
        });
    }

    @Action(CreateSeason)
    createSeason(ctx: StateContext<CrupdateTitleStateModel>) {
        ctx.patchState({loading: true});
        return this.seasons.create(ctx.getState().title.id).pipe(tap(response => {
            const title = {
                ...ctx.getState().title,
                seasons: [...ctx.getState().title.seasons, response.season]
            };
            ctx.patchState({title});
        }), finalize(() => ctx.patchState({loading: false})));
    }

    @Action(DeleteSeason)
    deleteSeason(ctx: StateContext<CrupdateTitleStateModel>, action: DeleteSeason) {
        ctx.patchState({loading: true});
        return this.seasons.delete(action.season.id).pipe(tap(() => {
            const newSeasons = ctx.getState().title.seasons.filter(s => {
                return s.id !== action.season.id;
            });
            const title = {
                ...ctx.getState().title,
                seasons: newSeasons
            };
            ctx.patchState({title});
        }), finalize(() => ctx.patchState({loading: false})));
    }

    @Action(ToggleLoading)
    toggleLoading(ctx: StateContext<CrupdateTitleStateModel>, action: ToggleLoading) {
        ctx.patchState({loading: action.state});
    }

    @Action(UpdateCredit)
    updateCredit(ctx: StateContext<CrupdateTitleStateModel>, action: UpdateCredit) {
        ctx.patchState({loading: true});
        return this.titles.updateCredit(action.id, action.credit).pipe(
            tap(response => {
                // update matching credit on the state
                const newCredits = ctx.getState().title.credits.map(credit => {
                    if (credit.pivot.id === response.credit.id) {
                        credit.pivot = response.credit;
                    }
                    return credit;
                });

                ctx.patchState({title: {...ctx.getState().title, credits: newCredits}});
            }),
            finalize(() => ctx.patchState({loading: false}))
        );
    }

    @Action(AddCredit)
    addCredit(ctx: StateContext<CrupdateTitleStateModel>, action: AddCredit) {
        ctx.patchState({loading: true});
        const creditablePayload = {type: action.creditable.model_type, id: action.creditable.id};
        return this.titles.addCredit(action.personId, creditablePayload, action.pivot).pipe(
            tap(response => {
                if (action.creditable.model_type === MEDIA_TYPE.TITLE) {
                    const newCredits = [...ctx.getState().title.credits, response.credit];
                    ctx.patchState({title: {...ctx.getState().title, credits: newCredits}});
                } else if (action.creditable.model_type === MEDIA_TYPE.SEASON) {
                    const seasons = ctx.getState().title.seasons.map(season => {
                        const newSeason = {...season};
                        if (newSeason.id === action.creditable.id) {
                            newSeason.credits = [...newSeason.credits, response.credit];
                        }
                        return newSeason;
                    });
                    ctx.patchState({title: {...ctx.getState().title, seasons}});
                } else if (action.creditable.model_type === MEDIA_TYPE.EPISODE) {
                    const creditable = action.creditable as Episode;
                    const seasons = ctx.getState().title.seasons.map(season => {
                        if (season.number === creditable.season_number) {
                           season.episodes.map(episode => {
                               const newEpisode = {...episode};
                               if (newEpisode.id === action.creditable.id) {
                                   newEpisode.credits = [...newEpisode.credits, response.credit];
                               }
                               return newEpisode;
                           });
                        }
                        return {...season};
                    });
                    ctx.patchState({title: {...ctx.getState().title, seasons}});
                }
            }),
            finalize(() => ctx.patchState({loading: false}))
        );
    }

    @Action(RemoveCredit)
    removeCredit(ctx: StateContext<CrupdateTitleStateModel>, action: RemoveCredit) {
        ctx.patchState({loading: true});
        return this.titles.removeCredit(action.credit.pivot.id).pipe(
            tap(() => {
                if (action.creditable.model_type === MEDIA_TYPE.TITLE) {
                    const newCredits = ctx.getState().title.credits.filter(credit => {
                        return credit.pivot.id !== action.credit.pivot.id;
                    });
                    ctx.patchState({title: {...ctx.getState().title, credits: newCredits}});
                } else if (action.creditable.model_type === MEDIA_TYPE.SEASON) {
                    const seasons = ctx.getState().title.seasons.map(season => {
                        if (season.id === action.creditable.id) {
                            season.credits = season.credits.filter(c => c.id !== action.credit.id);
                        }
                        return {...season};
                    });
                    ctx.patchState({title: {...ctx.getState().title, seasons}});
                } else if (action.creditable.model_type === MEDIA_TYPE.EPISODE) {
                    const creditable = action.creditable as Episode;
                    const seasons = ctx.getState().title.seasons.map(season => {
                        if (season.number === creditable.season_number) {
                            season.episodes.map(episode => {
                                if (episode.id === action.creditable.id) {
                                    episode.credits = episode.credits.filter(c => c.id !== action.credit.id);
                                }
                                return {...episode};
                            });
                        }
                        return {...season};
                    });
                    ctx.patchState({title: {...ctx.getState().title, seasons}});
                }
            }),
            finalize(() => ctx.patchState({loading: false}))
        );
    }

    @Action(ChangeCreditOrder)
    changeCreditOrder(ctx: StateContext<CrupdateTitleStateModel>, action: ChangeCreditOrder) {
        let credits: TitleCredit[] = [];

        if (action.creditable.model_type === MEDIA_TYPE.TITLE) {
            credits = ctx.getState().title.credits.filter(credit => {
                if (action.creditType === 'cast') {
                    return credit.pivot.department === 'cast';
                } else {
                    return credit.pivot.department !== 'cast';
                }
            });
            moveItemInArray(credits, action.currentIndex, action.newIndex);
            ctx.patchState({title: {...ctx.getState().title, credits}});
        } else if (action.creditable.model_type === MEDIA_TYPE.SEASON) {
            const seasons = ctx.getState().title.seasons.map(season => {
                if (season.id === action.creditable.id) {
                    credits = season.credits;
                    moveItemInArray(credits, action.currentIndex, action.newIndex);
                }
                return {...season};
            });
            ctx.patchState({title: {...ctx.getState().title, seasons}});
        } else if (action.creditable.model_type === MEDIA_TYPE.EPISODE) {
            const creditable = action.creditable as Episode;
            const seasons = ctx.getState().title.seasons.map(season => {
                if (season.number === creditable.season_number) {
                    season.episodes.map(episode => {
                        if (episode.id === action.creditable.id) {
                            credits = episode.credits;
                            moveItemInArray(credits, action.currentIndex, action.newIndex);
                        }
                        return {...episode};
                    });
                }
                return {...season};
            });
            ctx.patchState({title: {...ctx.getState().title, seasons}});
        }

        const order = {};
        credits
            .filter(c => c.pivot.department === 'cast')
            .forEach((credit, index) => {
                order[index] = credit.pivot.id;
            });

        ctx.patchState({loading: true});
        return this.titles.changeCreditsOrder(order).pipe(
            finalize(() => ctx.patchState({loading: false}))
        );
    }

    @Action(ChangeVideosOrder)
    changeVideosOrder(ctx: StateContext<CrupdateTitleStateModel>, action: ChangeVideosOrder) {
        const videos = ctx.getState().title.all_videos.slice();
        moveItemInArray(videos, action.currentIndex, action.newIndex);
        ctx.patchState({title: {...ctx.getState().title, all_videos: videos}});

        const order = {};
        videos.forEach((video, i) => order[i] = video.id);

        ctx.patchState({loading: true});
        return this.titles.changeVideosOrder(ctx.getState().title.id, order).pipe(
            finalize(() => ctx.patchState({loading: false}))
        );
    }

    @Action(ChangeImageOrder)
    changeImageOrder(ctx: StateContext<CrupdateTitleStateModel>, action: ChangeImageOrder) {
        const images = [...ctx.getState().title.images];
        moveItemInArray(images, action.currentIndex, action.newIndex);
        ctx.patchState({title: {...ctx.getState().title, images: images}});

        const order = {};
        images.forEach((video, i) => order[i] = video.id);

        ctx.patchState({loading: true});
        return this.titles.changeImageOrder(ctx.getState().title.id, order).pipe(
            finalize(() => ctx.patchState({loading: false}))
        );
    }

    @Action(LoadEpisodeCredits)
    loadEpisodeCredits(ctx: StateContext<CrupdateTitleStateModel>, action: LoadEpisodeCredits) {
        ctx.patchState({loading: true});
        return this.titles.getEpisode(action.episode.id).pipe(
            tap(response => {
                const seasons = ctx.getState().title.seasons.map(season => {
                    if (season.number === action.episode.season_number) {
                        const episodes = season.episodes.map(episode => {
                            return episode.id === action.episode.id ? response.episode : episode;
                        });
                        return {...season, episodes};
                    }
                    return season;
                });
                ctx.patchState({title: {...ctx.getState().title, seasons}});
            }),
            finalize(() => ctx.patchState({loading: false}))
        );
    }

    @Action(DeleteEpisode)
    deleteEpisode(ctx: StateContext<CrupdateTitleStateModel>, action: DeleteEpisode) {
        ctx.patchState({loading: true});
        return this.titles.deleteEpisode(action.episode.id).pipe(
            tap(() => {
                const seasons = ctx.getState().title.seasons.map(season => {
                    const newSeason = {...season};
                    if (newSeason.number === action.episode.season_number) {
                        newSeason.episodes = newSeason.episodes.filter(episode => {
                            return episode.id !== action.episode.id;
                        });
                    }
                    return newSeason;
                });

                ctx.patchState({title: {...ctx.getState().title, seasons}});
            }),
            finalize(() => ctx.patchState({loading: false}))
        );
    }

    @Action(UpdateEpisode)
    updateEpisode(ctx: StateContext<CrupdateTitleStateModel>, action: UpdateEpisode) {
        ctx.patchState({loading: true});
        return this.titles.updateEpisode(action.episode.id, action.payload).pipe(
            tap(response => {
                const seasons = ctx.getState().title.seasons.map(season => {
                    if (season.number === action.episode.season_number) {
                        const episodes = season.episodes.map(episode => {
                            return episode.id === action.episode.id ? response.episode : episode;
                        });
                        return {...season, episodes};
                    }
                    return season;
                });

                ctx.patchState({title: {...ctx.getState().title, seasons}});
            }),
            finalize(() => ctx.patchState({loading: false}))
        );
    }

    @Action(CreateEpisode)
    createEpisode(ctx: StateContext<CrupdateTitleStateModel>, action: CreateEpisode) {
        ctx.patchState({loading: true});
        return this.titles.createEpisode(action.season.id, action.payload).pipe(
            tap(response => {
                const seasons = ctx.getState().title.seasons.map(season => {
                    const newSeason = {...season};
                    if (newSeason.number === response.episode.season_number) {
                        newSeason.episodes = [...newSeason.episodes, response.episode];
                    }
                    return newSeason;
                });
                ctx.patchState({title: {...ctx.getState().title, seasons}});
            }),
            finalize(() => ctx.patchState({loading: false}))
        );
    }

    @Action(AddVideo)
    addVideo(ctx: StateContext<CrupdateTitleStateModel>, action: AddVideo) {
        const title = {
            ...ctx.getState().title,
            all_videos: [...ctx.getState().title.all_videos, action.video]
        };
        ctx.patchState({title});
    }

    @Action(UpdateVideo)
    updateVideo(ctx: StateContext<CrupdateTitleStateModel>, action: UpdateVideo) {
        const videos = ctx.getState().title.all_videos.slice();
        const i = videos.findIndex(v => v.id === action.video.id);
        videos[i] = action.video;
        const title = {
            ...ctx.getState().title,
            all_videos: videos
        };
        ctx.patchState({title});
    }

    @Action(DeleteVideo)
    deleteVideo(ctx: StateContext<CrupdateTitleStateModel>, action: DeleteVideo) {
        ctx.patchState({loading: true});
        return this.videos.delete([action.video.id]).pipe(
            tap(() => {
                const videos = ctx.getState().title.all_videos.slice();
                const i = videos.findIndex(v => v.id === action.video.id);
                videos.splice(i, 1);
                const title = {
                    ...ctx.getState().title,
                    all_videos: videos
                };
                ctx.patchState({title});
            }),
            finalize(() => ctx.patchState({loading: false}))
        );
    }

    @Action(AddImage)
    addImage(ctx: StateContext<CrupdateTitleStateModel>, action: AddImage) {
        const title = {
            ...ctx.getState().title,
            images: [...ctx.getState().title.images, action.image]
        };
        ctx.patchState({title});
    }

    @Action(DeleteImage)
    deleteImage(ctx: StateContext<CrupdateTitleStateModel>, action: DeleteImage) {
        ctx.patchState({loading: true});
        return this.images.delete(action.image.id).pipe(
            tap(() => {
                const images = ctx.getState().title.images.slice();
                const i = images.findIndex(v => v.id === action.image.id);
                images.splice(i, 1);
                const title = {
                    ...ctx.getState().title,
                    images
                };
                ctx.patchState({title});
            }),
            finalize(() => ctx.patchState({loading: false}))
        );
    }

    @Action(AttachTags)
    attachTags(ctx: StateContext<CrupdateTitleStateModel>, action: AttachTags) {
        const type = this.tagTypeToRelation(action.tagType),
            oldTags = ctx.getState().title[type],
            newTags = action.tags.filter(nt => oldTags.findIndex(ot => ot.name === nt) === -1);

        if (newTags.length) {
            ctx.patchState({loading: true});
            return this.titles.attachTags(ctx.getState().title.id, {tags: newTags, tagType: action.tagType}).pipe(
                tap(response => {
                    this.toast.open(ucFirst(`${type} added.`));
                    ctx.patchState({
                        title: {
                            ...ctx.getState().title,
                            [type]: [...oldTags, ...response.tags]
                        }
                    });
                }),
                finalize(() => ctx.patchState({loading: false}))
            );
        }
    }

    @Action(DetachTag)
    detachTag(ctx: StateContext<CrupdateTitleStateModel>, action: DetachTag) {
        ctx.patchState({loading: true});
        return this.titles.detachTag(ctx.getState().title.id, action.tag).pipe(
            tap(() => {
                const type = this.tagTypeToRelation(action.tag.type);
                const oldTags = ctx.getState().title[type];
                const i = (oldTags as Tag[]).findIndex(tag => tag.id === action.tag.id);
                if (i > -1) oldTags.splice(i, 1);
                ctx.patchState({
                    title: {
                        ...ctx.getState().title,
                        [type]: oldTags.slice()
                    }
                });
            }),
            finalize(() => ctx.patchState({loading: false}))
        );
    }

    @Action(ResetState)
    resetState(ctx: StateContext<CrupdateTitleStateModel>) {
        ctx.patchState({
            title: new Title(),
            loading: true,
        });
    }

    private tagTypeToRelation(type: string) {
        if (type === 'keyword') {
            return 'keywords';
        } else if (type === 'genre') {
            return 'genres';
        } else if (type === 'production_country') {
            return 'countries';
        }
    }
}
