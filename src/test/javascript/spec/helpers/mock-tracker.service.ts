import { SpyObject } from './spyobject';
import { JhiTrackerService } from '../../../../main/webapp/app/core/tracker/tracker.service';

export class MockTrackerService extends SpyObject {

    constructor() {
        super(JhiTrackerService);
    }

    connect() {}
}
