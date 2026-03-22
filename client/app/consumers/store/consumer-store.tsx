import { UserType } from '@/app/auth/dto/user';
import { create } from 'zustand';
import { JobRequestType } from '../my-jobs/dto';


interface ConsumerState {
    quickRequest: {
        category: string[];
        description: string;
        skills: string[];
        requestType: JobRequestType;
    };
    setQuickRequest: (quickRequest: {
        category: string[];
        description: string;
        skills: string[];
        requestType: JobRequestType;


    }) => void;
}

export const useConsumerStore = create<ConsumerState>()((set) => ({
    quickRequest: {
        category: [],
        description: "",
        skills: [],
        requestType: "instant"

    },
    setQuickRequest: (quickRequest) => set({ quickRequest }),
}))
