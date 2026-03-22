import { UserType } from '@/app/auth/dto/user';
import { create } from 'zustand';
import { JobRequestType } from '../my-jobs/dto';
import { CreateJobDto } from '../post-job/dto';


interface ConsumerState {
    quickRequest: CreateJobDto;
    setQuickRequest: (quickRequest: CreateJobDto) => void;
}

export const useConsumerStore = create<ConsumerState>()((set) => ({
    quickRequest: {
        jobRequestType: "instant",
        validOpenTill: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        location: {
            latitude: 0,
            longitude: 0,
            address: ""
        },
        jobDescription: "",
        priceType: "fixed",
        budgetMin: 0,
        budgetMax: 0,
        currency: "INR",
        skillIds: [],
        categoryIds: [],
        requiredAt: new Date(Date.now()).toISOString().split('T')[0],
    },
    setQuickRequest: (quickRequest) => set({ quickRequest }),
}))
