import { Injectable } from '@nestjs/common';
import { ServiceProvidersCoreService } from '../../core/consumer-core/service-providers-core/service-providers-core.service';

@Injectable()
export class ServiceProvidersService {
    constructor(
        private readonly serviceProvidersCore: ServiceProvidersCoreService
    ) { }

    async searchProviders(params: {
        categoryId?: string;
        skillIds?: string[];
        query?: string;
        lat?: number;
        lng?: number;
        limit?: number;
        offset?: number;
    }) {
        return this.serviceProvidersCore.searchProviders(params);
    }
}
