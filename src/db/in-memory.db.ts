import {Resolutions, Video} from "../videos/types/video";


export const db = {
    videos: <Video[]> [
        {
            id: 1,
            title: 'BackEnd1',
            author: 'Dimych',
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: [Resolutions.P144]
        },
        {
            id: 2,
            title: 'BackEnd2',
            author: 'Dimych',
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(),
            availableResolutions: [Resolutions.P1080]
        },
        {
            id: 3,
            title: 'BackEnd3',
            author: 'Dimych',
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: [Resolutions.P1080]
        },
    ]
};